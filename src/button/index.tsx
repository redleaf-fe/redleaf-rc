import React, { ReactNode, CSSProperties, MouseEvent } from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";
import "../styles/common.css";
import "./style.css";
import Group from "./group";

export interface IProps extends baseProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  bordered?: boolean;
  type?: "default" | "primary" | "success" | "danger";
  disabled?: boolean;
  loading?: boolean;
}

const Button = (props: IProps) => {
  const handleClick = (e: MouseEvent) => {
    if (props.disabled || props.loading) {
      return;
    }
    props.onClick && props.onClick(e);
  };

  const {
    className,
    style,
    bordered,
    type,
    loading,
    disabled,
    children,
    ...restProps
  } = props;

  return (
    <span
      className={cls(
        `${prefixCls}-button`,
        `${bordered ? "bordered-" : ""}${type}-button`,
        {
          "disabled-button": disabled || loading,
        },
        className
      )}
      style={style}
      {...restProps}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  bordered: PropTypes.bool,
  type: PropTypes.oneOf(["default", "primary", "success", "danger"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  type: "primary",
  bordered: false,
  loading: false,
};

Button.Group = Group;

export default Button;
