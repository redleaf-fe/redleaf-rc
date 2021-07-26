import React, {
  useCallback,
  ReactElement,
  ReactNode,
  useState,
  useMemo
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { prefixCls } from '../constants';
import { baseProps } from '../types';
import { toPlainArray, deepFirstTraverse } from '../utils/js';
import { useMount } from '../utils/hooks';
import { IconArrowSingle } from '../icon';

import '../styles/common.less';
import './style.less';

/* TODO:

只展开某一级的内容，其他的关闭只显示最顶层

*/

export interface IMenuItemOption extends baseProps {
  text?: string;
  render?: ({ meta }: { meta: baseProps }) => ReactNode;
  value: string;
  disabled?: boolean;
}

export type MenuItemChangeType = 'open' | 'close' | 'active';

export interface MenuProps extends baseProps {
  className?: string;
  options: IMenuItemOption[];
  onChange?: ({ meta }: { meta: IMenuItemOption }) => void;
  onOpen?: ({ meta }: { meta: IMenuItemOption }) => void;
  onClose?: ({ meta }: { meta: IMenuItemOption }) => void;
  defaultValue?: string;
}

const Menu = (props: MenuProps): ReactElement => {
  const {
    className,
    options = [],
    onChange,
    onOpen,
    onClose,
    defaultValue,
    ...restProps
  } = props;

  // openId代表点击过的菜单项，showId代表展示的菜单项，展示的菜单项比点击的要多一级
  // openId包含一级（带子级）的项，showId不包含一级项
  const [state, setState] = useState<{
    openId: number[];
    showId: number[];
    activeItem: baseProps;
  }>({
    openId: [],
    showId: [],
    activeItem: {}
  });

  const menuData = useMemo(() => toPlainArray(options), [options]);

  useMount(() => {
    function getChildrenArr(ids: number[] = []) {
      let ret: number[] = [];
      ids.forEach(v => {
        const item = menuData.find(vv => vv.__id__ === v) || {
          __parentId__: []
        };
        ret = ret.concat((item.children || []).map((v: baseProps) => v.__id__));
      });
      return ret;
    }

    if (defaultValue) {
      const item = menuData.find(v => v.value === defaultValue) || {
        __parentId__: []
      };
      const arr = getChildrenArr(item.__parentId__);

      if (item.children) {
        const showId = arr.concat(
          item.children.map((v: baseProps) => v.__id__)
        );
        setState(t => ({
          ...t,
          openId: item.__parentId__.concat(item.__id__),
          showId
        }));
        onOpen?.({ meta: item as IMenuItemOption });
      } else {
        setState(t => ({
          ...t,
          openId: item.__parentId__,
          showId: arr,
          activeItem: item
        }));
        onChange?.({ meta: item as IMenuItemOption });
      }
    }
  });

  const renderItem = useCallback(() => {
    const { openId, showId, activeItem } = state;
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
            [`${prefixCls}-menu-item-disabled`]: val.disabled,
            [`${prefixCls}-menu-item-hidden`]:
              val.__depth__ !== 0 && !showId.includes(val.__id__)
          }
        )}
        onClick={() => {
          if (val.disabled) {
            return;
          }
          if (val.children) {
            // 点击已展开的项，openId中要去除，showId中要保留
            if (openId.includes(val.__id__)) {
              // 当前点击项的所有后代项
              const childrenId: number[] = [];
              deepFirstTraverse(val.children, v => {
                childrenId.push(v.__id__);
              });
              const arr = openId.filter(v => !childrenId.includes(v));
              const arr2 = showId.filter(v => !childrenId.includes(v));
              setState(t => ({
                ...t,
                openId: arr.filter(v => v !== val.__id__),
                showId: arr2
              }));
              onClose?.({ meta: val as IMenuItemOption });
            } else {
              const arr = openId.concat(val.__id__);
              const arr2 = showId.concat(
                val.children.map((v: baseProps) => v.__id__)
              );
              setState(t => ({
                ...t,
                openId: arr,
                showId: arr2
              }));
              onOpen?.({ meta: val as IMenuItemOption });
            }
          } else {
            setState(t => ({
              ...t,
              activeItem: val
            }));
            onChange?.({ meta: val as IMenuItemOption });
          }
        }}
      >
        <span className={`${prefixCls}-menu-item-text`}>
          {typeof val.render === 'function'
            ? val.render({ meta: val })
            : val.text}
        </span>
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
  }, [state, menuData, onChange, onOpen, onClose]);

  return (
    <span className={cls(`${prefixCls}-menu`, className)} {...restProps}>
      {renderItem()}
    </span>
  );
};

const { shape, string, bool, arrayOf, func } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string,
  value: string.isRequired,
  render: func
});

Menu.propTypes = {
  className: string,
  options: arrayOf(optionShape).isRequired,
  onOpen: func,
  onClose: func,
  onChange: func,
  defaultValue: string
};

Menu.defaultProps = {
  options: []
};

export default Menu;
