import React, {
  useCallback,
  ReactElement,
  useState,
  useEffect,
  useMemo
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _uniq from 'lodash/uniq';

import { prefixCls } from '../constants';
import { baseProps } from '../types';
import { toPlainArray, deepFirstTraverse } from '../utils/js';
import { IconArrowSingle } from '../icon';

import './style.less';

/* TODO:

1.展开、不展开
2.激活、不激活效果
3.展开形式，悬浮、内嵌
4.点击展开和hover展开
5.高度不够时给滚动
6.默认展开项
7.只展开某一级的内容，其他的关闭只显示最顶层
8.点击后展开当前项下面的全部子级

*/

export interface IMenuItemValue extends baseProps {
  text: string;
  value?: any;
}

export interface IMenuItemOption extends IMenuItemValue {
  disabled?: boolean;
}

export interface MenuProps extends baseProps {
  className?: string;
  datasets: IMenuItemOption[];
  onChange?: ({ meta }: { meta: IMenuItemValue }) => void;
  expandActiveOnly?: boolean;
}

const Menu = (props: MenuProps): ReactElement => {
  const { className, datasets = [], onChange, ...restProps } = props;

  const [activeItem, setActiveItem] = useState<baseProps>({});
  // openId代表点击过的菜单项，showId代表展示的菜单项，展示的菜单项比点击的要多一级
  const [openId, setOpenId] = useState<number[]>([]);
  const [showId, setShowId] = useState<number[]>([]);

  const menuData = useMemo(() => toPlainArray(datasets), [datasets]);

  const renderItem = useCallback(() => {
    return menuData.map(val => (
      <span
        key={val.__id__}
        className={cls(
          `${prefixCls}-menu-item`,
          `${prefixCls}-menu-item-indent-${val.__depth__}`,
          {
            [`${prefixCls}-menu-active-item`]: val.__id__ === activeItem.__id__,
            [`${prefixCls}-menu-item-hidden`]:
              val.__depth__ !== 0 &&
              !showId.includes(val.__id__) &&
              !val.__parentId__.includes(val.__id__)
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
            } else {
              const arr = openId.concat(val.__id__);
              setOpenId(arr);
              const arr2 = showId.concat(
                val.children.map((v: baseProps) => v.__id__)
              );
              setShowId(arr2);
            }
          } else {
            setActiveItem(val);
          }
        }}
      >
        <span className={`${prefixCls}-menu-item-text`}>{val.text}</span>
        {val.children && (
          <svg
            className={`${prefixCls}-menu-arrow-icon`}
            viewBox="0 0 1024 1024"
          >
            <path transform="rotate(90,512,512)" d={IconArrowSingle} />
          </svg>
        )}
      </span>
    ));
  }, [activeItem, openId, showId, menuData]);

  console.log(showId, openId);

  return (
    <span className={cls(`${prefixCls}-menu`, className)} {...restProps}>
      {renderItem()}
    </span>
  );
};

const { shape, string, bool, arrayOf, func, any } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string.isRequired,
  value: any
});

Menu.propTypes = {
  className: string,
  datasets: arrayOf(optionShape).isRequired
};

Menu.defaultProps = {
  datasets: []
};

export default Menu;
