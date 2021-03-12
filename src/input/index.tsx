import React, {
  ReactElement,
  ChangeEvent,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { baseProps } from '../types';
import { prefixCls } from '../constants';
import { IconVisible, IconNotVisible } from '../icon';

import '../styles/common.less';
import './style.less';

export interface InputProps extends baseProps {
  className?: string;
  inputClassName?: string;
  type?: 'text' | 'password' | 'textarea' | 'int';
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  onChange?: ({
    e,
    value,
  }: {
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    value?: string;
  }) => void;
  showCount?: boolean;
  // textarea的属性
  rows?: number;
}

const Input = (props: InputProps): ReactElement => {
  const {
    className,
    inputClassName,
    type,
    disabled,
    readOnly,
    placeholder,
    maxLength,
    value,
    defaultValue = '',
    onChange,
    showCount,
    rows,
    ...restProps
  } = props;

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    setInputVal(typeof value === 'undefined' ? defaultValue : value);
  }, [value, defaultValue]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let val = e.target.value;
      if (type === 'int') {
        val = val.replace(/\D/g, '');
      }

      if (typeof value === 'undefined') {
        if (Number(maxLength) > 0) {
          if (val?.length <= Number(maxLength)) {
            setInputVal(val);
            onChange?.({ e, value: val });
          }
        } else {
          setInputVal(val);
          onChange?.({ e, value: val });
        }
      } else {
        onChange?.({ e, value: val });
      }
    },
    [maxLength, onChange, value, type],
  );

  const onPasswordVisible = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const inputType = useMemo(() => {
    if (type === 'password' && !passwordVisible) {
      return 'text';
    } else if (type === 'int') {
      return 'text';
    }
    return type;
  }, [type, passwordVisible]);

  const isTextarea = useMemo(() => {
    return type === 'textarea';
  }, [type]);

  return (
    <>
      <span
        className={cls(
          `${prefixCls}-input-container`,
          {
            [`${prefixCls}-disabled-input-container`]: disabled,
          },
          className,
        )}
      >
        {isTextarea ? (
          <textarea
            className={cls('textarea', inputClassName)}
            onChange={onInputChange}
            value={inputVal}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            rows={Number(rows)}
            {...restProps}
          />
        ) : (
          <input
            className={cls(
              'input',
              {
                'input-password': type === 'password',
              },
              inputClassName,
            )}
            type={inputType}
            onChange={onInputChange}
            value={inputVal}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            {...restProps}
          />
        )}

        {type === 'password' && (
          <svg
            className="input-password-icon"
            viewBox="0 0 1024 1024"
            onClick={onPasswordVisible}
          >
            <path d={passwordVisible ? IconVisible : IconNotVisible} />
          </svg>
        )}
      </span>
      {showCount && Number(maxLength) > 0 && (
        <span className={`${prefixCls}-input-count`}>
          {inputVal.length}/{maxLength}
        </span>
      )}
    </>
  );
};

const { string, oneOf, bool, number, func } = PropTypes;

Input.propTypes = {
  className: string,
  inputClassName: string,
  type: oneOf(['text', 'password', 'textarea', 'int']),
  disabled: bool,
  readOnly: bool,
  placeholder: string,
  maxLength: number,
  value: string,
  defaultValue: string,
  onChange: func,
  showCount: bool,
  rows: number,
};

Input.defaultProps = {
  type: 'text',
  showCount: false,
  defaultValue: '',
  disabled: false,
  readOnly: false,
  placeholder: '请输入',
  rows: 3,
};

export default Input;
