import React, {
  CSSProperties,
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";
import { canbePositiveNumber } from "../utils";
import keymap from "../keymap";
import { IconVisible, IconNotVisible, IconCloseFill } from "../icon";
import "../styles/common.css";
import "./style.css";

export interface IProps extends baseProps {
  containerClassName?: string;
  className?: string;
  type?: "text" | "password" | "textarea";
  disabled?: boolean;
  maxLength?: number | string;
  value?: string;
  onChange?: Function;
  onEnterPress?: Function;
  showCount?: boolean;
  showClear?: boolean;
  // textarea的属性
  rows?: number | string;
  cols?: number | string;
  verticalAlign?: string;
  resize?:
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "block"
    | "both"
    | "horizontal"
    | "inline"
    | "none"
    | "vertical";
}

const Input = (props: IProps) => {
  const {
    containerClassName,
    className,
    type = "text",
    disabled,
    maxLength,
    value,
    onChange,
    onEnterPress,
    showCount,
    showClear,
    rows,
    cols,
    verticalAlign,
    resize,
    ...restProps
  } = props;

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setInputVal(value || "");
  }, [value]);

  const onInputChange = useCallback(
    (e: ChangeEvent<any>) => {
      if (canbePositiveNumber(maxLength)) {
        if (e.target.value?.length <= Number(maxLength)) {
          setInputVal(e.target.value);
          onChange?.(e);
        }
      } else {
        setInputVal(e.target.value);
        onChange?.(e);
      }
    },
    [maxLength, onChange]
  );

  const onInputKeyDown = useCallback(
    (e: KeyboardEvent<any>) => {
      if (e.keyCode === keymap.Enter) {
        onEnterPress?.(e);
      }
    },
    [onEnterPress]
  );

  const onPasswordVisible = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const onInputClear = useCallback(() => {
    setInputVal("");
  }, []);

  const inputType = useMemo(() => {
    if (type === "password" && !passwordVisible) {
      return "text";
    }
    return type;
  }, [type, passwordVisible]);

  const isTextarea = useMemo(() => {
    return type === "textarea";
  }, [type]);

  const textareaStyle = useMemo(() => {
    const style: CSSProperties = {};
    resize && (style.resize = resize);
    verticalAlign && (style.verticalAlign = verticalAlign);
    return style;
  }, [resize, verticalAlign]);

  const paddingMore = useMemo(() => {
    if (type === "password" || (inputVal && showClear)) {
      return true;
    }
    return false;
  }, [type, showClear, inputVal]);

  return (
    <span className={cls(`${prefixCls}-input-container`, containerClassName)}>
      {isTextarea ? (
        <textarea
          className={cls(`${prefixCls}-textarea`, className, {
            [`${prefixCls}-disabled-textarea`]: disabled,
          })}
          style={textareaStyle}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          value={inputVal}
          disabled={disabled}
          rows={Number(rows)}
          cols={Number(cols)}
          {...restProps}
        />
      ) : (
        <>
          <input
            className={cls(`${prefixCls}-input`, className, {
              [`${prefixCls}-disabled-input`]: disabled,
              [`${prefixCls}-input-padding-more`]: paddingMore,
            })}
            type={inputType}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            value={inputVal}
            disabled={disabled}
            {...restProps}
          />

          {inputVal && showClear && (
            <svg
              className={`${prefixCls}-clear-icon`}
              viewBox="0 0 1024 1024"
              onClick={onInputClear}
            >
              <path d={IconCloseFill} fill="#666" />
            </svg>
          )}
        </>
      )}

      {type === "password" && (
        <svg
          className={`${prefixCls}-password-icon`}
          viewBox="0 0 1024 1024"
          onClick={onPasswordVisible}
        >
          <path
            d={passwordVisible ? IconVisible : IconNotVisible}
            fill="#666"
          />
        </svg>
      )}

      {showCount && canbePositiveNumber(maxLength) && (
        <span className={`${prefixCls}-input-count`}>
          {inputVal.length}/{maxLength}
        </span>
      )}
    </span>
  );
};

Input.propTypes = {
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "textarea"]),
  disabled: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnterPress: PropTypes.func,
  showCount: PropTypes.bool,
  showClear: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  verticalAlign: PropTypes.string,
  resize: PropTypes.oneOf([
    "-moz-initial",
    "inherit",
    "initial",
    "revert",
    "unset",
    "block",
    "both",
    "horizontal",
    "inline",
    "none",
    "vertical",
  ]),
};

Input.defaultProps = {
  type: "text",
  showClear: false,
  showCount: false,
  disabled: false,
  rows: 3,
  cols: 20,
  verticalAlign: "top",
  resize: "none",
};

export default Input;
