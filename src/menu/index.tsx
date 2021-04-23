import React, { useCallback, ReactElement, useState } from 'react';
import cls from 'classnames';
import PropTypes, { array } from 'prop-types';

import { prefixCls } from '../constants';
import { baseProps } from '../types';

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
  value: string;
}

export interface IMenuItemOption extends IMenuItemValue {
  disabled?: boolean;
}

export interface MenuProps extends baseProps {
  className?: string;
  datasets: IMenuItemOption[];
  onChange?: ({ value, meta }: { value: string; meta: IMenuItemValue }) => void;
}

const Menu = (props: MenuProps): ReactElement => {
  const { className, datasets = [], onChange, ...restProps } = props;

  const [activeItem, setActiveItem] = useState('');

  const renderItem = useCallback(
    (val, key) => {
      return (
        <span
          key={key}
          className={cls(`${prefixCls}-menu-item`, {
            [`${prefixCls}-menu-active-item`]: val.value === activeItem,
          })}
          onClick={() => {
            setActiveItem(val.value);
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
      {datasets.map((v, k) => renderItem(v, k))}
    </span>
  );
};

const { shape, string, bool, oneOf, number, arrayOf, func } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string.isRequired,
  value: string.isRequired,
});

Menu.propTypes = {
  className: PropTypes.string,
  datasets: PropTypes.array.isRequired,
};

Menu.defaultProps = {
  datasets: [],
};

export default Menu;
