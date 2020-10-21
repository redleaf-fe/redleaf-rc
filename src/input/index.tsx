import React, {
  ReactElement,
  ChangeEvent,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";
import { canbePositiveNumber, isUndefined } from "../utils";
import { IconVisible, IconNotVisible } from "../icon";
import "../styles/common.css";
import "./style.css";

export interface InputProps extends baseProps {
  className?: string;
  inputClassName?: string;
  type?: "text" | "password" | "textarea" | "int";
  disabled?: boolean;
  maxLength?: number | string;
  value?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
  showCount?: boolean;
  // textarea的属性
  rows?: number | string;
}

const Input = (props: InputProps): ReactElement => {
  const {
    className,
    inputClassName,
    type = "text",
    disabled,
    maxLength,
    value,
    onChange,
    showCount,
    rows,
    ...restProps
  } = props;

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setInputVal(value || "");
  }, [value]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let val = e.target.value;
      if (type === "int") {
        val = val.replace(/\D/g, "");
      }

      if (isUndefined(value)) {
        if (canbePositiveNumber(maxLength)) {
          if (val?.length <= Number(maxLength)) {
            setInputVal(val);
            onChange?.(e, val);
          }
        } else {
          setInputVal(val);
          onChange?.(e, val);
        }
      } else {
        onChange?.(e, val);
      }
    },
    [maxLength, onChange, value, type]
  );

  const onPasswordVisible = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const inputType = useMemo(() => {
    if (type === "password" && !passwordVisible) {
      return "text";
    } else if (type === "int") {
      return "text";
    }
    return type;
  }, [type, passwordVisible]);

  const isTextarea = useMemo(() => {
    return type === "textarea";
  }, [type]);

  return (
    <span
      className={cls(
        `${prefixCls}-input-container`,
        {
          [`${prefixCls}-disabled-input-container`]: disabled,
        },
        className
      )}
    >
      {isTextarea ? (
        <textarea
          className={cls("textarea", inputClassName)}
          onChange={onInputChange}
          value={inputVal}
          disabled={disabled}
          rows={Number(rows)}
          {...restProps}
        />
      ) : (
        <input
          className={cls("input", inputClassName)}
          type={inputType}
          onChange={onInputChange}
          value={inputVal}
          disabled={disabled}
          {...restProps}
        />
      )}

      {type === "password" && (
        <svg
          className="input-password-icon"
          viewBox="0 0 1024 1024"
          onClick={onPasswordVisible}
        >
          <path
            d={passwordVisible ? IconVisible : IconNotVisible}
            fill="#bbb"
          />
        </svg>
      )}

      {showCount && canbePositiveNumber(maxLength) && (
        <span className="input-count">
          {inputVal.length}/{maxLength}
        </span>
      )}
    </span>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "textarea", "int"]),
  disabled: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  showCount: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  type: "text",
  showCount: false,
  disabled: false,
  rows: 3,
};

export default Input;
