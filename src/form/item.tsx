import React, { ReactNode, ReactElement, Component } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { FormContext } from './context';
import { baseProps } from '../types';
import { prefixCls } from '../constants';

import '../styles/common.less';
import './style.less';

// export interface IFormItemRule extends baseProps {}

// export interface IFormItemErrorMsg extends baseProps {}

export interface FormItemProps extends baseProps {
  children: ReactNode;
  className?: string;
  label?: string;
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  rules?: baseProps; // 键值对，值是函数
  errorMessage?: baseProps;
}

const { node, string, func, bool, any, oneOf, object } = PropTypes;

class FormItem extends Component<FormItemProps> {
  static propTypes = {
    children: node.isRequired,
    className: string,
    label: string,
    name: string.isRequired,
    readOnly: bool,
    disabled: bool,
    rules: props => {
      const arr: string[] = [];
      Object.keys(props.rules || {}).forEach(v => {
        if (typeof props.rules[v] === 'string') {
          arr.push(v);
        }
      });
      if (arr.length) {
        return new Error(`these rules are not function type: ${arr}`);
      }
    },
    errorMessage: props => {
      const arr: string[] = [];
      Object.keys(props.errorMessage || {}).forEach(v => {
        if (typeof props.errorMessage[v] === 'string') {
          arr.push(v);
        }
      });
      if (arr.length) {
        return new Error(`these errorMessages are not string type: ${arr}`);
      }
    },
  };

  static defaultProps = {
    readOnly: false,
    disabled: false,
  };

  static contextType = FormContext;

  state = {
    value: undefined,
  };

  componentDidMount(): void {
    const { name } = this.props;
    if (name) {
      this.context.formRef.items[name] = this;
    }
  }

  setValue = value => {
    this.setState({ value });
  };

  render(): ReactElement {
    const {
      children,
      className,
      label,
      name,
      readOnly,
      disabled,
      rules,
      errorMessage,
      ...restProps
    } = this.props;

    const { value } = this.state;

    const { layout = 'vertical', onFormChange } = this.context;

    return (
      <span
        className={cls(
          `${prefixCls}-form-item`,
          `${prefixCls}-${layout}-form-item`,
          className,
        )}
        {...restProps}
      >
        {label && <span className="item-label">{label}</span>}
        {React.Children.map(children, child => {
          return React.isValidElement(child)
            ? React.cloneElement(child as ReactElement, {
                value,
                disabled,
                readOnly,
                onChange: ({ value }: { value: any }) => {
                  this.setValue(value);
                  onFormChange?.({ name, value });
                },
              })
            : child;
        })}
      </span>
    );
  }
}

export default FormItem;
