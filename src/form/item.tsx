import React, { ReactNode, ReactElement, Component, useCallback } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { FormContext, IFormValidator } from './context';
import { baseProps } from '../types';
import { prefixCls } from '../constants';

import '../styles/common.less';
import './style.less';

export interface FormItemProps extends baseProps {
  children: ReactNode;
  className?: string;
  label?: string;
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  validators?: IFormValidator[];
}

const { node, string, func, bool, arrayOf, oneOfType, shape } = PropTypes;

const validatorShape = shape({
  rule: oneOfType([string, func]),
  message: string,
});

class FormItem extends Component<FormItemProps> {
  static propTypes = {
    children: node.isRequired,
    className: string,
    label: string,
    name: string.isRequired,
    readOnly: bool,
    disabled: bool,
    validators: arrayOf(validatorShape),
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
    const { name, validators } = this.props;
    if (name) {
      const { items, validators: formVali } = this.context.formRef;
      items[name] = this;
      formVali[name] = validators;
    }
  }

  setValue = (value: any): void => {
    this.setState({ value });
  };

  ItemOnChange = ({ value }: { value: any }): void => {
    const { name } = this.props;
    const { onFormChange } = this.context;

    console.log('item change');

    this.setValue(value);
    onFormChange?.({ name, value });
  };

  render(): ReactElement {
    const {
      children,
      className,
      label,
      readOnly,
      disabled,
      ...restProps
    } = this.props;

    const { value } = this.state;

    const { layout = 'vertical' } = this.context;

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
                onChange: this.ItemOnChange,
              })
            : child;
        })}
      </span>
    );
  }
}

export default FormItem;
