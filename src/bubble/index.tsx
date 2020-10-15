import React, { ReactNode, useMemo, ReactElement } from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";
import { canbePositiveNumber, dealWithPercentOrPx } from "../utils";
import "../styles/common.css";
import "./style.css";

export interface BubbleProps extends baseProps {
  className?: string;
  triClassName?: string;
  contentClassName?: string;
  children: ReactNode;
  position?:
    | "topCenter"
    | "leftCenter"
    | "rightCenter"
    | "bottomCenter"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom";
  triangleSize?: string | number;
  leftOffset?: string | number;
  topOffset?: string | number;
}

const Bubble = (props: BubbleProps): ReactElement => {
  const {
    triClassName,
    contentClassName,
    className,
    children,
    position = "bottomCenter",
    triangleSize = 8,
    leftOffset = "0px",
    topOffset = "0px",
    ...restProps
  } = props;

  const triangleStyle = useMemo(() => {
    const borderWidth = `${
      canbePositiveNumber(triangleSize) ? triangleSize : 8
    }px`;
    const top = dealWithPercentOrPx(topOffset);
    const left = dealWithPercentOrPx(leftOffset);

    return getPositionStyle(position, borderWidth, top, left);
  }, [position, triangleSize, topOffset, leftOffset]);

  return (
    <span
      className={cls(`${prefixCls}-bubble-container`, className)}
      {...restProps}
    >
      <span className={cls(`${prefixCls}-bubble-content`, contentClassName)}>
        {children}
      </span>
      <span
        className={cls(
          `${prefixCls}-bubble-triangle`,
          `${prefixCls}-bubble-triangle-${position}`,
          triClassName
        )}
        style={triangleStyle}
      />
    </span>
  );
};

Bubble.propTypes = {
  children: PropTypes.node.isRequired,
  triClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.oneOf([
    "topCenter",
    "leftCenter",
    "rightCenter",
    "bottomCenter",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "leftTop",
    "leftBottom",
    "rightTop",
    "rightBottom",
  ]),
  triangleSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  leftOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Bubble.defaultProps = {
  position: "bottomCenter",
  triangleSize: 8,
  leftOffset: "0px",
  topOffset: "0px",
};

export default Bubble;

function getPositionStyle(
  position: string,
  borderWidth: string,
  top: string,
  left: string
) {
  switch (position) {
    case "leftCenter":
      return {
        top: `calc(50% + ${top})`,
        left: `calc(0px + ${left})`,
        borderWidth,
      };
    case "rightCenter":
      return {
        top: `calc(50% + ${top})`,
        right: `calc(0px - ${left})`,
        borderWidth,
      };
    case "topCenter":
      return {
        top: `calc(0px + ${top})`,
        left: `calc(50% + ${left})`,
        borderWidth,
      };
    case "bottomCenter":
      return {
        bottom: `calc(0px - ${top})`,
        left: `calc(50% + ${left})`,
        borderWidth,
      };
    case "topLeft":
      return {
        top: `calc(0px + ${top})`,
        left: `calc(0px + ${borderWidth} + ${left})`,
        borderWidth,
      };
    case "topRight":
      return {
        top: `calc(0px + ${top})`,
        right: `calc(0px + ${borderWidth} - ${left})`,
        borderWidth,
      };
    case "bottomLeft":
      return {
        bottom: `calc(0px - ${top})`,
        left: `calc(0px + ${borderWidth} + ${left})`,
        borderWidth,
      };
    case "bottomRight":
      return {
        bottom: `calc(0px - ${top})`,
        right: `calc(0px + ${borderWidth} - ${left})`,
        borderWidth,
      };
    case "leftTop":
      return {
        top: `calc(0px + ${borderWidth} + ${top})`,
        left: `calc(0px + ${left})`,
        borderWidth,
      };
    case "leftBottom":
      return {
        bottom: `calc(0px + ${borderWidth} - ${top})`,
        left: `calc(0px + ${left})`,
        borderWidth,
      };
    case "rightTop":
      return {
        top: `calc(0px + ${borderWidth} + ${top})`,
        right: `calc(0px - ${left})`,
        borderWidth,
      };
    case "rightBottom":
      return {
        bottom: `calc(0px + ${borderWidth} - ${top})`,
        right: `calc(0px - ${left})`,
        borderWidth,
      };
    default:
      return {
        bottom: `calc(0px + ${top})`,
        left: `calc(50% + ${left})`,
        borderWidth,
      };
  }
}
