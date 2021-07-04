import React, { ReactNode, ReactElement, useCallback } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { baseProps } from '../types';
import { prefixCls } from '../constants';

import '../styles/common.less';
import './style.less';

/**
 * TODO
 *
 * 受控、默认值
 * 自定义渲染title
 * 位置，上下左右
 * destroyOnHide，隐藏时是否卸载
 */

export interface ITabOption {
  text: string;
  value: string;
  renderTitle?: ({
    meta,
    index
  }: {
    meta: baseProps;
    index: number;
  }) => ReactNode;
  disabled?: boolean;
  content?: ReactNode;
}

export interface TabsProps extends baseProps {
  className?: string;
  contentsClassName?: string;
  titlesClassName?: string;
  datasets: ITabOption[];
  destroyOnHide?: boolean;
}

const Tabs = (props: TabsProps): ReactElement => {
  const {
    className,
    titlesClassName,
    contentsClassName,
    datasets = [],
    ...restProps
  } = props;

  return (
    <span className={cls(`${prefixCls}-tabs`, className)} {...restProps}>
      <span className={cls(`${prefixCls}-tabs-titles`, titlesClassName)}>
        {datasets.map(v => {
          return (
            <span key={v.value} className={`${prefixCls}-tabs-title`}>
              {v.text}
            </span>
          );
        })}
      </span>
      <span className={cls(`${prefixCls}-tabs-contents`, contentsClassName)}>
        {datasets.map(v => {
          return (
            <span key={v.value} className={`${prefixCls}-tabs-content`}>
              {v.content}
            </span>
          );
        })}
      </span>
    </span>
  );
};

Tabs.propTypes = {
  // className: PropTypes.string,
};

Tabs.defaultProps = {
  // disabled: false,
  // type: 'primary',
};

export default Tabs;
