import React, {
  useEffect,
  useMemo,
  useCallback,
  ReactElement,
  ReactNode
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _uniqBy from 'lodash/uniqBy';

import { baseProps } from '../types';
import { IconCheck, IconPartCheck } from '../icon';
import { prefixCls } from '../constants';
import { useSafeState, useMount } from '../utils/hooks';

import '../styles/common.less';
import './style.less';

export interface ICheckOption {
  text: string;
  value: string;
  disabled?: boolean;
  render?: ({ meta, index }: { meta: baseProps; index: number }) => ReactNode;
}

export interface CheckProps extends baseProps {
  className?: string;
  itemClassName?: string;
  type?: 'single' | 'multi';
  shape?: 'round' | 'rect';
  layout?: 'horizontal' | 'vertical';
  disabled?: boolean;
  readOnly?: boolean;
  maxNum?: number;
  value?: string[];
  defaultValue?: string[];
  markFill?: boolean;
  halfCheck?: boolean;
  cancelable?: boolean;
  onChange?: ({
    value,
    meta
  }: {
    value: string[];
    meta: ICheckOption[];
  }) => void;
  options: ICheckOption[];
}

const Check = (props: CheckProps): ReactElement => {
  const {
    className,
    itemClassName,
    type,
    shape,
    layout = 'horizontal',
    disabled,
    readOnly,
    maxNum,
    markFill = true,
    halfCheck,
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
    () => state.checkValue.map((v: ICheckOption) => v.value),
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
            ? state.checkValue.filter(
                (vv: ICheckOption) => vv.value !== v.value
              )
            : _uniqBy([...state.checkValue, v], 'value');
          if (Number(maxNum) > 0) {
            val = val.slice(0, Number(maxNum));
          }
          // TODO: 这里的_uniqBy和slice处理最大个数，和useEffect里面的重叠，但是又不能去掉
        }
        uncontrolled && setState({ checkValue: val });
        onChange?.({
          value: val.map((vv: ICheckOption) => vv.value),
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
      {options?.map((v, k) => {
        const active = checkedValues.includes(v.value);
        return (
          <span
            key={v.value}
            className={cls(
              `${prefixCls}-check-item`,
              `${prefixCls}-check-${layout}-item`,
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
                <path d={halfCheck ? IconPartCheck : IconCheck} />
              </svg>
            </span>
            {typeof v.render === 'function'
              ? v.render({ meta: v, index: k })
              : v.text && (
                  <span className={`${prefixCls}-check-label`}>{v.text}</span>
                )}
          </span>
        );
      })}
    </span>
  );
};

const { shape, string, bool, oneOf, number, arrayOf, func } = PropTypes;

const optionShape = shape({
  disabled: bool,
  render: func,
  text: string.isRequired,
  value: string.isRequired
});

Check.propTypes = {
  className: string,
  itemClassName: string,
  type: oneOf(['single', 'multi']),
  shape: oneOf(['round', 'rect']),
  layout: oneOf(['horizontal', 'vertical']),
  disabled: bool,
  readOnly: bool,
  maxNum: number,
  markFill: bool,
  halfCheck: bool,
  cancelable: bool,
  value: arrayOf(string),
  defaultValue: arrayOf(string),
  onChange: func,
  options: arrayOf(optionShape).isRequired
};

Check.defaultProps = {
  type: 'single',
  shape: 'round',
  layout: 'horizontal',
  disabled: false,
  readOnly: false,
  cancelable: true,
  markFill: true,
  halfCheck: false
};

export default Check;
