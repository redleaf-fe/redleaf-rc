import React, { ReactNode, ReactElement, useMemo } from 'react';
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
  dotted?: boolean;
  maxNum?: number;
}

const Badge = (props: BadgeProps): ReactElement => {
  const {
    className,
    bordered,
    type,
    disabled,
    num,
    dotted,
    maxNum,
    ...restProps
  } = props;

  const content = useMemo(() => {
    if (!maxNum || !num) {
      return num;
    }
    if (maxNum < num) {
      return `${maxNum}+`;
    }
    return num;
  }, [num, maxNum]);

  return (
    <span
      className={cls(
        `${prefixCls}-badge`,
        `${prefixCls}-badge-${bordered ? 'bordered-' : ''}${type}`,
        {
          [`${prefixCls}-badge-disabled`]: disabled,
          [`${prefixCls}-badge-dotted`]: dotted
        },
        className
      )}
      {...restProps}
    >
      {!dotted && content}
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
  dotted: bool,
  maxNum: number
};

Badge.defaultProps = {
  disabled: false,
  type: 'primary',
  bordered: false,
  dotted: false
};

export default Badge;
