import React, {
  useCallback,
  ReactElement,
  ReactNode,
  useState,
  useEffect,
  useMemo
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { prefixCls } from '../constants';
import { baseProps } from '../types';
import { toPlainArray, deepFirstTraverse } from '../utils/js';
import { IconArrowSingle } from '../icon';

import './style.less';

/* TODO:

只展开某一级的内容，其他的关闭只显示最顶层

*/

export interface IMenuItemOption extends baseProps {
  text?: string;
  render?: () => ReactNode;
  value: string;
  disabled?: boolean;
}

export type MenuItemChangeType = 'open' | 'close' | 'active';

export interface MenuProps extends baseProps {
  className?: string;
  datasets: IMenuItemOption[];
  onChange?: ({
    meta,
    type
  }: {
    meta: IMenuItemOption;
    type: MenuItemChangeType;
  }) => void;
  defaultValue?: string;
}

const Menu = (props: MenuProps): ReactElement => {
  const {
    className,
    datasets = [],
    onChange,
    defaultValue,
    ...restProps
  } = props;

  const [activeItem, setActiveItem] = useState<baseProps>({});
  // openId代表点击过的菜单项，showId代表展示的菜单项，展示的菜单项比点击的要多一级
  // openId包含一级（带子级）的项，showId不包含一级项
  const [openId, setOpenId] = useState<number[]>([]);
  const [showId, setShowId] = useState<number[]>([]);

  const menuData = useMemo(() => toPlainArray(datasets), [datasets]);

  useEffect(() => {
    function getChildrenArr(ids: number[]) {
      let ret: number[] = [];
      ids.forEach(v => {
        const item = menuData.find(vv => vv.__id__ === v) || {};
        ret = ret.concat((item.children || []).map((v: baseProps) => v.__id__));
      });
      return ret;
    }

    if (defaultValue) {
      const item = menuData.find(v => v.value === defaultValue) || {};
      const arr = getChildrenArr(item.__parentId__);

      if (item.children) {
        setOpenId(item.__parentId__.concat(item.__id__));
        const arr2 = arr.concat(item.children.map((v: baseProps) => v.__id__));
        setShowId(arr2);
      } else {
        setOpenId(item.__parentId__);
        setShowId(arr);
        setActiveItem(item);
      }
    }
    // WARN: 初始化，不需要添加依赖
  }, []);

  const renderItem = useCallback(() => {
    return menuData.map(val => (
      <span
        key={val.__id__}
        className={cls(
          `${prefixCls}-menu-item`,
          `${prefixCls}-menu-item-indent-${val.__depth__}`,
          {
            // 激活项的父级呈hover态展示
            [`${prefixCls}-menu-item-hover`]: activeItem.__parentId__?.includes(
              val.__id__
            ),
            [`${prefixCls}-menu-item-active`]: val.__id__ === activeItem.__id__,
            [`${prefixCls}-menu-item-hidden`]:
              val.__depth__ !== 0 && !showId.includes(val.__id__)
          }
        )}
        onClick={() => {
          if (val.children) {
            // 点击已展开的项，openId中要去除，showId中要保留
            if (openId.includes(val.__id__)) {
              // 当前点击项的所有后代项
              const childrenId: number[] = [];
              deepFirstTraverse(val.children, v => {
                childrenId.push(v.__id__);
              });
              const arr = openId.filter(v => !childrenId.includes(v));
              setOpenId(arr.filter(v => v !== val.__id__));
              const arr2 = showId.filter(v => !childrenId.includes(v));
              setShowId(arr2);
              onChange?.({ meta: val as IMenuItemOption, type: 'close' });
            } else {
              const arr = openId.concat(val.__id__);
              setOpenId(arr);
              const arr2 = showId.concat(
                val.children.map((v: baseProps) => v.__id__)
              );
              setShowId(arr2);
              onChange?.({ meta: val as IMenuItemOption, type: 'open' });
            }
          } else {
            setActiveItem(val);
            onChange?.({ meta: val as IMenuItemOption, type: 'active' });
          }
        }}
      >
        <span className={`${prefixCls}-menu-item-text`}>{val.text}</span>
        {val.children && (
          <svg
            className={cls(`${prefixCls}-menu-arrow-icon`, {
              [`${prefixCls}-menu-arrow-icon-up`]: openId.includes(val.__id__)
            })}
            viewBox="0 0 1024 1024"
          >
            <path transform="rotate(90,512,512)" d={IconArrowSingle} />
          </svg>
        )}
      </span>
    ));
  }, [activeItem, openId, showId, menuData, onChange]);

  return (
    <span className={cls(`${prefixCls}-menu`, className)} {...restProps}>
      {renderItem()}
    </span>
  );
};

const { shape, string, bool, arrayOf, func, any } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string,
  value: string.isRequired,
  render: func
});

Menu.propTypes = {
  className: string,
  datasets: arrayOf(optionShape).isRequired,
  onChange: func,
  defaultValue: string
};

Menu.defaultProps = {
  datasets: []
};

export default Menu;
