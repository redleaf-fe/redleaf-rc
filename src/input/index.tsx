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
import { getStrLength, typeJudge } from '../utils/js';
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

  const uncontrolled = useMemo(() => {
    return typeJudge.isUndefined(value);
  }, [value]);

  const dealInput = useCallback(
    val => {
      let ret = val;
      if (type === 'int') {
        ret = ret.replace(/\D/g, '');
      }

      const maxLen = Number(maxLength);
      if (maxLen > 0) {
        ret = ret.slice(0, maxLen);
      }

      return ret;
    },
    [type, maxLength],
  );

  useEffect(() => {
    !typeJudge.isUndefined(defaultValue) &&
      setInputVal(dealInput(defaultValue));
    // WARN: 初始化，不需要添加依赖
  }, []);

  useEffect(() => {
    if (!uncontrolled) {
      setInputVal(dealInput(value));
    }
  }, [value, uncontrolled, dealInput]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = dealInput(e.target.value);
      uncontrolled && setInputVal(val);
      onChange?.({ e, value: val });
    },
    [uncontrolled, onChange, dealInput],
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
          {getStrLength(inputVal)}/{maxLength}
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
