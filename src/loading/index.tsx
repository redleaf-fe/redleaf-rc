import React, { CSSProperties } from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";
import { IconLoading } from "../icon";
import { canbePositiveNumber } from "../utils";
import "./style.css";

export interface IProps extends baseProps {
  className?: string;
  style?: CSSProperties;
  size?: string | number;
  color?: string;
}

const Loading = (props: IProps) => {
  const { className, style, size, color, ...restProps } = props;
  const _size = canbePositiveNumber(size) ? Math.min(Number(size), 1024) : 20;

  return (
    <svg
      className={cls(`${prefixCls}-loading`, className)}
      style={style}
      viewBox="0 0 1024 1024"
      width={_size}
      height={_size}
      {...restProps}
    >
      <path
        fill={color}
        d={IconLoading}
      />
    </svg>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 20,
  color: "#333",
};

export default Loading;
