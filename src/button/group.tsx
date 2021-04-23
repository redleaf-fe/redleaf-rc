import React, { ReactNode, ReactElement } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { baseProps } from '../types';
import { prefixCls } from '../constants';

export interface ButtonGroupProps extends baseProps {
  children: ReactNode;
  className?: string;
}

const Group = (props: ButtonGroupProps): ReactElement => {
  const { className, children, ...restProps } = props;

  return (
    <span
      className={cls(`${prefixCls}-button-group`, className)}
      {...restProps}
    >
      {children}
    </span>
  );
};

Group.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Group.defaultProps = {};

export default Group;
