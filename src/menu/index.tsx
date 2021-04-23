import React, {
  useCallback,
  ReactElement,
  useState,
  useEffect,
  useMemo,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { prefixCls } from '../constants';
import { baseProps } from '../types';
import { toPlainArray } from '../utils/js';

import './style.less';

/* TODO:

1.展开、不展开
2.激活、不激活效果
3.展开形式，悬浮、内嵌
4.点击展开和hover展开
5.高度不够时给滚动

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
}

const Menu = (props: MenuProps): ReactElement => {
  const { className, datasets = [], onChange, ...restProps } = props;

  const [activeItem, setActiveItem] = useState('');

  const menuData = useMemo(() => toPlainArray(datasets), [datasets]);

  const renderItem = useCallback(
    (val, key) => {
      return (
        <span
          key={key}
          className={cls(
            `${prefixCls}-menu-item`,
            `${prefixCls}-menu-item-indent-${val.__depth__}`,
            {
              [`${prefixCls}-menu-active-item`]: val.__id__ === activeItem,
            },
          )}
          onClick={() => {
            setActiveItem(val.__id__);
          }}
        >
          {val.text}
        </span>
      );
    },
    [activeItem],
  );

  return (
    <span className={cls(`${prefixCls}-menu`, className)} {...restProps}>
      {menuData.map((v, k) => renderItem(v, k))}
    </span>
  );
};

const { shape, string, bool, arrayOf, func, any } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string.isRequired,
  value: any,
});

Menu.propTypes = {
  className: string,
  datasets: arrayOf(optionShape).isRequired,
};

Menu.defaultProps = {
  datasets: [],
};

export default Menu;
