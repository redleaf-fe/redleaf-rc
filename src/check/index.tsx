import React, { useCallback, ReactElement, ReactNode } from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { baseProps } from "../types";
import { IconCheck, IconPartCheck } from "../icon";
import { prefixCls } from "../constants";
import { useCheck } from "../utils/hooks";

import "../styles/common.less";
import "./style.less";

export interface ICheckOption {
  text: string;
  value: string;
  disabled?: boolean;
  render?: ({ meta, index }: { meta: baseProps; index: number }) => ReactNode;
}

export interface CheckProps extends baseProps {
  className?: string;
  itemClassName?: string;
  type?: "single" | "multi";
  shape?: "round" | "rect";
  layout?: "horizontal" | "vertical";
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
    meta,
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
    layout = "horizontal",
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

  const { checkedValues, addItem, delItem } = useCheck<ICheckOption>({
    type,
    value,
    options,
    maxNum,
    defaultValue,
    onChange,
  });

  const onClickItem = useCallback(
    (v) => {
      if (!readOnly && !disabled && !v.disabled) {
        if (cancelable && checkedValues.includes(v.value)) {
          // 已选中的，再次点击要取消
          delItem(v);
        } else {
          addItem(v);
        }
      }
    },
    [readOnly, disabled, checkedValues, cancelable, addItem, delItem]
  );

  return (
    <span
      className={cls(
        `${prefixCls}-check-container`,
        {
          [`${prefixCls}-disabled-check-container`]: disabled,
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
                [`${prefixCls}-check-active-fill-${shape}`]: active && markFill,
              })}
            >
              <svg
                className={`${prefixCls}-check-mark`}
                viewBox="0 0 1024 1024"
              >
                <path d={halfCheck ? IconPartCheck : IconCheck} />
              </svg>
            </span>
            {typeof v.render === "function"
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
  value: string.isRequired,
});

Check.propTypes = {
  className: string,
  itemClassName: string,
  type: oneOf(["single", "multi"]),
  shape: oneOf(["round", "rect"]),
  layout: oneOf(["horizontal", "vertical"]),
  disabled: bool,
  readOnly: bool,
  maxNum: number,
  markFill: bool,
  halfCheck: bool,
  cancelable: bool,
  value: arrayOf(string),
  defaultValue: arrayOf(string),
  onChange: func,
  options: arrayOf(optionShape).isRequired,
};

Check.defaultProps = {
  type: "single",
  shape: "round",
  layout: "horizontal",
  disabled: false,
  readOnly: false,
  cancelable: true,
  markFill: true,
  halfCheck: false,
};

export default Check;
