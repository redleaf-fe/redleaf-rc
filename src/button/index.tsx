import React, {
  ReactNode,
  ReactElement,
  MouseEvent,
  useCallback,
  forwardRef
} from 'react';
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

const Button = (props: ButtonProps, ref: any): ReactElement => {
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
        `${prefixCls}-${bordered ? 'bordered-' : ''}${type}-button`,
        { [`${prefixCls}-disabled-button`]: disabled },
        className
      )}
      {...restProps}
      onClick={handleClick}
      ref={ref}
    >
      {children}
    </button>
  );
};

const RefButton = forwardRef(Button);

RefButton.displayName = 'Button';

RefButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'primary', 'success', 'danger']),
  disabled: PropTypes.bool
};

RefButton.defaultProps = {
  disabled: false,
  type: 'primary',
  bordered: false
};

(RefButton as any).Group = Group;

export default RefButton;
