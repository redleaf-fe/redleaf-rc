import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import Badge from '../badge';
import { useSingleValue, useSafeState } from '../utils/hooks';
import { baseProps } from '../types';
import { prefixCls } from '../constants';

import '../styles/common.less';
import './style.less';

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
  const {
    className,
    datasets = [],
    layout = 'horizontal',
    value,
    defaultValue,
    onChange,
    ...restProps
  } = props;

  const { state, setState, uncontrolled } = useSingleValue({
    defaultValue,
    value
  });

  const activeIndex = useMemo(() => {
    return datasets.findIndex(v => v.value === state.activeValue);
  }, [datasets, state.activeValue]);

  const onClickStep = useCallback(
    val => {
      uncontrolled && setState({ activeValue: val.value });
      onChange?.({ meta: val, value: val.value });
    },
    [setState, onChange, uncontrolled]
  );

  return (
    <span
      className={cls(
        `${prefixCls}-steps`,
        `${prefixCls}-steps-${layout}`,
        className
      )}
      {...restProps}
    >
      {datasets.map((v, k) => {
        return (
          <span key={v.value} className={`${prefixCls}-step`}>
            <span
              className={cls(`${prefixCls}-steps-badge`, {
                [`${prefixCls}-steps-badge-first`]: k === 0,
                [`${prefixCls}-steps-badge-active`]: k <= activeIndex
              })}
            >
              <Badge
                onClick={() => onClickStep(v)}
                num={k + 1}
                type={k <= activeIndex ? 'primary' : 'default'}
              />
            </span>
            <span className={`${prefixCls}-steps-content`}>
              {typeof v.render === 'function'
                ? v.render({ meta: v, index: k })
                : v.text}
            </span>
          </span>
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
