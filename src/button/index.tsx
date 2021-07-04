import React, { ReactNode, ReactElement, MouseEvent, useCallback } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { baseProps } from '../types';
import { prefixCls } from '../constants';
import Group from './group';

import '../styles/common.less';
import './style.less';

export interface ButtonProps extends baseProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  type?: 'default' | 'primary' | 'success' | 'danger';
  disabled?: boolean;
}

const Button = (props: ButtonProps): ReactElement => {
  const {
    className,
    bordered,
    type,
    disabled,
    onClick,
    children,
    ...restProps
  } = props;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (disabled) {
        return;
      }
      onClick?.(e);
    },
    [disabled, onClick]
  );

  return (
    <button
      className={cls(
        `${prefixCls}-button`,
        `${prefixCls}-button-${bordered ? 'bordered-' : ''}${type}`,
        { [`${prefixCls}-button-disabled`]: disabled },
        className
      )}
      {...restProps}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

const { node, string, bool, oneOf } = PropTypes;

Button.propTypes = {
  children: node.isRequired,
  className: string,
  bordered: bool,
  type: oneOf(['default', 'primary', 'success', 'danger']),
  disabled: bool
};

Button.defaultProps = {
  disabled: false,
  type: 'primary',
  bordered: false
};

Button.Group = Group;

export default Button;
