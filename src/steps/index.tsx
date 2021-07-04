import React, { ReactNode, ReactElement, useCallback } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { useMount, useSafeState } from '../utils/hooks';
import { baseProps } from '../types';
import { prefixCls } from '../constants';

import '../styles/common.less';
import './style.less';

/**
 * TODO
 *
 * 受控、默认值
 * 自定义渲染内容
 * 方向、横向、竖向
 * 是否带数字标识
 */

export interface IStepOption {
  text: string;
  value: string;
  render?: ({ meta, index }: { meta: baseProps; index: number }) => ReactNode;
}

export interface StepsProps extends baseProps {
  className?: string;
  datasets: IStepOption[];
  layout?: 'horizontal' | 'vertical';
}

const Steps = (props: StepsProps): ReactElement => {
  const { className, datasets = [], layout, ...restProps } = props;

  return (
    <span
      className={cls(
        `${prefixCls}-steps`,
        `${prefixCls}-${layout}-steps`,
        className
      )}
      {...restProps}
    >
      {datasets.map(v => {
        return (
          <>
            <span className={`${prefixCls}-steps-joint`}></span>
            <span key={v.value} className={`${prefixCls}-steps-content`}>
              {v.text}
            </span>
          </>
        );
      })}
    </span>
  );
};

Steps.propTypes = {
  // className: PropTypes.string,
};

Steps.defaultProps = {};

export default Steps;
