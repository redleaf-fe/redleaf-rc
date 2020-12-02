import React, { ReactNode, useMemo, ReactElement } from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";
import { dealWithPercentOrPx } from "../utils";
import "../styles/common.css";
import "./style.css";

export interface BubbleProps extends baseProps {
  className?: string;
  triClassName?: string;
  contentClassName?: string;
  children: ReactNode;
  position?: popPosition;
  triangleSize?: number;
  leftOffset?: string | number;
  topOffset?: string | number;
}

const Bubble = (props: BubbleProps): ReactElement => {
  const {
    triClassName,
    contentClassName,
    className,
    children,
    position,
    triangleSize,
    leftOffset,
    topOffset,
    ...restProps
  } = props;

  const triangleStyle = useMemo(() => {
    const borderWidth = `${Number(triangleSize) > 0 ? triangleSize : 8}px`;
    const top = dealWithPercentOrPx(topOffset);
    const left = dealWithPercentOrPx(leftOffset);

    return getPositionStyle(String(position), borderWidth, top, left);
  }, [position, triangleSize, topOffset, leftOffset]);

  return (
    <span
      className={cls(`${prefixCls}-bubble-container`, className)}
      {...restProps}
    >
      <span className={cls("bubble-content", contentClassName)}>
        {children}
      </span>
      <span
        className={cls(
          "bubble-triangle",
          `bubble-triangle-${position}`,
          triClassName
        )}
        style={triangleStyle}
      />
    </span>
  );
};

const { node, string, oneOf, number, oneOfType } = PropTypes;

Bubble.propTypes = {
  children: node.isRequired,
  triClassName: string,
  contentClassName: string,
  className: string,
  position: oneOf([
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
  triangleSize: number,
  leftOffset: oneOfType([string, number]),
  topOffset: oneOfType([string, number]),
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
