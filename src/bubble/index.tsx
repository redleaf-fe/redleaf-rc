import React, { ReactNode, useMemo, ReactElement } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { prefixCls } from '../constants';
import { dealWithPercentOrPx } from '../utils';

import '../styles/common.less';
import './style.less';

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

  const borderWidth = useMemo(
    () => `${Number(triangleSize) > 0 ? triangleSize : 8}px`,
    [triangleSize],
  );

  const triangleStyle = useMemo(() => {
    const top = dealWithPercentOrPx(topOffset);
    const left = dealWithPercentOrPx(leftOffset);

    return getPositionStyle(String(position), top, left);
  }, [position, topOffset, leftOffset]);

  return (
    <span
      className={cls(`${prefixCls}-bubble-container`, className)}
      {...restProps}
    >
      <span className={cls('bubble-content', contentClassName)}>
        {children}
      </span>
      <span
        className={cls(
          'bubble-triangle',
          `bubble-triangle-${position}`,
          triClassName,
        )}
        style={{ ...triangleStyle, borderWidth }}
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
    'topCenter',
    'leftCenter',
    'rightCenter',
    'bottomCenter',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom',
  ]),
  triangleSize: number,
  leftOffset: oneOfType([string, number]),
  topOffset: oneOfType([string, number]),
};

Bubble.defaultProps = {
  position: 'bottomCenter',
  triangleSize: 8,
  leftOffset: '0px',
  topOffset: '0px',
};

export default Bubble;

// 全部按照top、left来定位，避免参考坐标不一致，逻辑混乱
function getPositionStyle(position: string, top: string, left: string) {
  switch (position) {
    case 'leftCenter':
      return {
        top: `calc(50% + ${top})`,
        left: `calc(0px + ${left})`,
        transform: 'translate(-100%, -50%)',
      };
    case 'rightCenter':
      return {
        top: `calc(50% + ${top})`,
        left: `calc(100% + ${left})`,
        transform: 'translate(0, -50%)',
      };
    case 'topCenter':
      return {
        top: `calc(0px + ${top})`,
        left: `calc(50% + ${left})`,
        transform: `translate(-50%, -100%)`,
      };
    case 'bottomCenter':
      return {
        top: `calc(100% + ${top})`,
        left: `calc(50% + ${left})`,
        transform: `translate(-50%, 0)`,
      };
    case 'topLeft':
      return {
        top: `calc(0px + ${top})`,
        left: `calc(0px + ${left})`,
        transform: 'translate(50%, -100%)',
      };
    case 'topRight':
      return {
        top: `calc(0px + ${top})`,
        left: `calc(100% + ${left})`,
        transform: 'translate(-150%, -100%)',
      };
    case 'bottomLeft':
      return {
        top: `calc(100% + ${top})`,
        left: `calc(0px + ${left})`,
        transform: 'translate(50%, 0)',
      };
    case 'bottomRight':
      return {
        top: `calc(100% + ${top})`,
        left: `calc(100% + ${left})`,
        transform: 'translate(-150%, 0)',
      };
    case 'leftTop':
      return {
        top: `calc(0px + ${top})`,
        left: `calc(0px + ${left})`,
        transform: 'translate(-100%, 50%)',
      };
    case 'leftBottom':
      return {
        top: `calc(100% + ${top})`,
        left: `calc(0px + ${left})`,
        transform: 'translate(-100%, -150%)',
      };
    case 'rightTop':
      return {
        top: `calc(0px + ${top})`,
        left: `calc(100% + ${left})`,
        transform: 'translate(0, 50%)',
      };
    case 'rightBottom':
      return {
        top: `calc(100% + ${top})`,
        left: `calc(100% + ${left})`,
        transform: 'translate(0, -150%)',
      };
    default:
      // 默认三角在底部
      return {
        top: `calc(100% + ${top})`,
        left: `calc(50% + ${left})`,
        transform: `translate(-50%, 0)`,
      };
  }
}
