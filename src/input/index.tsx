import React, { ReactElement, ChangeEvent, Component } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

import { baseProps } from '../types';
import { prefixCls } from '../constants';
import { getStrLength } from '../utils/js';
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

export interface InputState extends baseProps {
  inputVal: string;
  passwordVisible: boolean;
}

const { string, oneOf, bool, number, func } = PropTypes;

class Input extends Component<InputProps, InputState> {
  static propTypes = {
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

  static defaultProps = {
    type: 'text',
    showCount: false,
    defaultValue: '',
    disabled: false,
    readOnly: false,
    placeholder: '请输入',
    rows: 3,
  };

  uncontrolled;

  constructor(props: InputProps) {
    super(props);

    const { defaultValue, value } = props;
    this.uncontrolled = value === undefined;
    this.state = {
      // 先判断是否受控，再判断defaultValue是否undefined
      inputVal:
        value === undefined
          ? defaultValue !== undefined
            ? defaultValue
            : ''
          : value,
      passwordVisible: true,
    };
  }

  // 不能用didupdate（所以也就不能用useEffect），输入中文有问题
  static getDerivedStateFromProps(
    nextProps: InputProps,
    prevState: InputState,
  ): Partial<InputState> {
    const newState: Partial<InputState> = {};
    if (
      nextProps.value !== undefined &&
      prevState.inputVal !== nextProps.value
    ) {
      newState.inputVal = nextProps.value;
    }
    return newState;
  }

  dealInput = (val: string): string => {
    const { type, maxLength } = this.props;
    let ret = val;
    if (type === 'int') {
      ret = ret.replace(/\D/g, '');
    }

    const maxLen = Number(maxLength);
    if (maxLen > 0) {
      ret = ret.slice(0, maxLen);
    }

    return ret;
  };

  onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const val = e.target.value;
    this.uncontrolled && this.setState({ inputVal: val });
    this.props.onChange?.({ e, value: val });
  };

  onPasswordVisible = (): void => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  };

  get inputType(): string {
    const { type } = this.props;
    const { passwordVisible } = this.state;
    if (type === 'password' && !passwordVisible) {
      return 'text';
    } else if (type === 'int') {
      return 'text';
    }
    return type || 'text';
  }

  render(): ReactElement {
    const {
      className,
      inputClassName,
      type,
      disabled,
      readOnly,
      placeholder,
      maxLength,
      showCount,
      rows,
    } = this.props;
    const restProps = _omit(
      this.props,
      'className',
      'inputClassName',
      'type',
      'disabled',
      'readOnly',
      'placeholder',
      'maxLength',
      'value',
      'defaultValue',
      'onChange',
      'showCount',
      'rows',
    );

    const { inputVal, passwordVisible } = this.state;
    const dealtVal = this.dealInput(String(inputVal));

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
          {type === 'textarea' ? (
            <textarea
              className={cls('textarea', inputClassName)}
              onChange={this.onInputChange}
              value={dealtVal}
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
              type={this.inputType}
              onChange={this.onInputChange}
              value={dealtVal}
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
              onClick={this.onPasswordVisible}
            >
              <path d={passwordVisible ? IconVisible : IconNotVisible} />
            </svg>
          )}
        </span>
        {showCount && Number(maxLength) > 0 && (
          <span className={`${prefixCls}-input-count`}>
            {getStrLength(dealtVal)}/{maxLength}
          </span>
        )}
      </>
    );
  }
}

export default Input;
