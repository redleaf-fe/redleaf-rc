import React, { ReactNode, CSSProperties, MouseEvent, useCallback } from "react";
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
}

const Button = (props: IProps) => {
  const handleClick = useCallback((e: MouseEvent) => {
    if (props.disabled) {
      return;
    }
    props.onClick && props.onClick(e);
  }, [props.disabled, props.onClick]);

  const {
    className,
    style,
    bordered,
    type,
    disabled,
    children,
    ...restProps
  } = props;

  return (
    <span
      className={cls(
        `${prefixCls}-button`,
        `${bordered ? "bordered-" : ""}${type}-button`,
        { "disabled-button": disabled },
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
};

Button.defaultProps = {
  disabled: false,
  type: "primary",
  bordered: false,
};

Button.Group = Group;

export default Button;
