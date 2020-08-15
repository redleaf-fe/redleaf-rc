import React, { ReactNode, CSSProperties, MouseEvent } from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";

export interface IProps extends baseProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Group = (props: IProps) => {
  const { className, style, children, ...restProps } = props;

  return (
    <span
      className={cls(`${prefixCls}-button-group`, className)}
      style={style}
      {...restProps}
    >
      {children}
    </span>
  );
};

Group.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Group.defaultProps = {};

export default Group;
