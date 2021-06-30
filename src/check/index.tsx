import React, { useEffect, useMemo, useCallback, ReactElement } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _uniqBy from 'lodash/uniqBy';

import { baseProps } from '../types';
import { IconCheck } from '../icon';
import { prefixCls } from '../constants';
import { useSafeState, useMount } from '../utils/hooks';

import '../styles/common.less';
import './style.less';

export interface ICheckValue extends baseProps {
  text: string;
  value: string;
}

export interface ICheckOption extends ICheckValue {
  disabled?: boolean;
}

export interface CheckProps extends baseProps {
  className?: string;
  itemClassName?: string;
  type?: 'single' | 'multi';
  shape?: 'round' | 'rect';
  disabled?: boolean;
  readOnly?: boolean;
  maxNum?: number;
  value?: string[];
  defaultValue?: string[];
  markFill?: boolean;
  cancelable?: boolean;
  onChange?: ({
    value,
    meta
  }: {
    value: string[];
    meta: ICheckValue[];
  }) => void;
  options: ICheckOption[];
}

const Check = (props: CheckProps): ReactElement => {
  const {
    className,
    itemClassName,
    type,
    shape,
    disabled,
    readOnly,
    maxNum,
    markFill = true,
    cancelable = true,
    value,
    defaultValue = [],
    onChange,
    options = [],
    ...restProps
  } = props;

  const [state, setState] = useSafeState({
    checkValue: []
  });

  const isSingle = useMemo(() => {
    return type === 'single';
  }, [type]);

  const uncontrolled = useMemo(() => {
    return value === undefined;
  }, [value]);

  const dealInput = useCallback(
    val => {
      // 从options中过滤value
      let ret = _uniqBy(
        options.filter(v => val?.includes(v.value)),
        'value'
      );

      if (isSingle) {
        ret = ret.slice(0, 1);
      } else if (Number(maxNum) > 0) {
        ret = ret.slice(0, Number(maxNum));
      }

      return ret;
    },
    [options, maxNum, isSingle]
  );

  useMount(() => {
    defaultValue.length > 0 &&
      setState({ checkValue: dealInput(defaultValue) });
  });

  const checkedValues = useMemo(
    () => state.checkValue.map((v: ICheckValue) => v.value),
    [state.checkValue]
  );

  useEffect(() => {
    if (!uncontrolled) {
      setState({ checkValue: dealInput(value) });
    }
  }, [value, dealInput, uncontrolled, setState]);

  const onClickItem = useCallback(
    v => {
      if (!readOnly && !disabled && !v.disabled) {
        let val = [];
        // 已选中的，再次点击要取消
        if (isSingle) {
          val = cancelable && checkedValues.includes(v.value) ? [] : [v];
        } else {
          val = checkedValues.includes(v.value)
            ? state.checkValue.filter((vv: ICheckValue) => vv.value !== v.value)
            : _uniqBy([...state.checkValue, v], 'value');
          if (Number(maxNum) > 0) {
            val = val.slice(0, Number(maxNum));
          }
          // TODO: 这里的_uniqBy和slice处理最大个数，和useEffect里面的重叠，但是又不能去掉
        }
        uncontrolled && setState({ checkValue: val });
        onChange?.({
          value: val.map((vv: ICheckValue) => vv.value),
          meta: val
        });
      }
    },
    [
      isSingle,
      readOnly,
      disabled,
      onChange,
      maxNum,
      checkedValues,
      uncontrolled,
      cancelable,
      state.checkValue,
      setState
    ]
  );

  return (
    <span
      className={cls(
        `${prefixCls}-check-container`,
        {
          [`${prefixCls}-disabled-check-container`]: disabled
        },
        className
      )}
      {...restProps}
    >
      {options?.map(v => {
        const active = checkedValues.includes(v.value);
        return (
          <span
            key={v.value}
            className={cls(
              `${prefixCls}-check-item`,
              { [`${prefixCls}-check-disabled-item`]: v.disabled },
              itemClassName
            )}
            onClick={() => onClickItem(v)}
          >
            <span
              className={cls(`${prefixCls}-check-${shape}`, {
                [`${prefixCls}-check-active-${shape}`]: active,
                [`${prefixCls}-check-active-fill-${shape}`]: active && markFill
              })}
            >
              <svg
                className={`${prefixCls}-check-mark`}
                viewBox="0 0 1024 1024"
              >
                <path d={IconCheck} />
              </svg>
            </span>
            <span className={`${prefixCls}-check-label`}>{v.text}</span>
          </span>
        );
      })}
    </span>
  );
};

const { shape, string, bool, oneOf, number, arrayOf, func } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string.isRequired,
  value: string.isRequired
});

Check.propTypes = {
  className: string,
  itemClassName: string,
  type: oneOf(['single', 'multi']),
  shape: oneOf(['round', 'rect']),
  disabled: bool,
  readOnly: bool,
  maxNum: number,
  markFill: bool,
  cancelable: bool,
  value: arrayOf(string),
  defaultValue: arrayOf(string),
  onChange: func,
  options: arrayOf(optionShape).isRequired
};

Check.defaultProps = {
  type: 'single',
  shape: 'round',
  disabled: false,
  readOnly: false,
  cancelable: true,
  markFill: true
};

export default Check;
