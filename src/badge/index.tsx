import React, { ReactNode, ReactElement } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { baseProps } from '../types';
import { prefixCls } from '../constants';

import '../styles/common.less';
import './style.less';

/**
 *
 * 是否显示0
 * 是否显示小点点
 * 上限数字
 *
 */

export interface BadgeProps extends baseProps {
  num: ReactNode;
  className?: string;
  bordered?: boolean;
  type?: 'default' | 'primary' | 'success' | 'danger';
  disabled?: boolean;
  showZero?: boolean;
  showDot?: boolean;
  maxNum?: number;
}

const Badge = (props: BadgeProps): ReactElement => {
  const { className, bordered, type, disabled, num, ...restProps } = props;

  return (
    <span
      className={cls(
        `${prefixCls}-badge`,
        `${prefixCls}-${bordered ? 'bordered-' : ''}${type}-badge`,
        { [`${prefixCls}-disabled-button`]: disabled },
        className
      )}
      {...restProps}
    >
      {num}
    </span>
  );
};

const { node, string, bool, oneOf, number } = PropTypes;

Badge.propTypes = {
  num: node.isRequired,
  className: string,
  bordered: bool,
  type: oneOf(['default', 'primary', 'success', 'danger']),
  disabled: bool,
  showZero: bool,
  showDot: bool,
  maxNum: number
};

Badge.defaultProps = {
  disabled: false,
  type: 'primary',
  bordered: false,
  showZero: false,
  showDot: false
};

export default Badge;
