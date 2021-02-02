import React, { useMemo, ReactElement } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { prefixCls } from '../constants';
import { IconLoading } from '../icon';

import './style.less';

export interface LoadingProps extends baseProps {
  className?: string;
  size?: number;
  color?: string;
}

const Loading = (props: LoadingProps): ReactElement => {
  const { className, size, color, ...restProps } = props;
  const _size = useMemo(
    () => (Number(size) > 0 ? Math.min(Number(size), 1024) : 20),
    [size],
  );

  return (
    <svg
      className={cls(`${prefixCls}-loading`, className)}
      viewBox="0 0 1024 1024"
      width={_size}
      height={_size}
      {...restProps}
    >
      <path fill={color} d={IconLoading} />
    </svg>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 20,
  color: '#333',
};

export default Loading;
