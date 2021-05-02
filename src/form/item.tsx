import React, { ReactNode, ReactElement, Component } from "react";
import cls from "classnames";
import PropTypes from "prop-types";
import _omit from "lodash/omit";

import { FormContext, IFormValidator } from "./context";
import { baseProps } from "../types";
import { prefixCls } from "../constants";

import "../styles/common.less";
import "./style.less";

export interface FormItemProps extends baseProps {
  children: ReactNode;
  className?: string;
  label?: string;
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  showRequiredMark?: boolean;
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
    showRequiredMark: bool,
    validators: arrayOf(validatorShape),
  };

  static defaultProps = {
    readOnly: false,
    disabled: false,
    showRequiredMark: false,
  };

  static contextType = FormContext;

  state = {
    value: undefined,
    error: "",
  };

  componentDidMount(): void {
    const { name } = this.props;
    if (name) {
      const { items = {} } = this.context.formRef || {};
      items[name] = this;
    }
  }

  setValue = (value: baseProps): void => {
    this.setState({ value });
  };

  onChange = ({ value }: { value: baseProps }): void => {
    const { name } = this.props;
    const { onFormChange, validateOnChange } = this.context;

    this.setValue(value);
    onFormChange?.({ name, value });

    validateOnChange && this.validate();
  };

  validate = (): boolean => {
    const { name, validators } = this.props;
    const { values = {}, errors = {} } = this.context.formRef || {};

    if (validators && validators.length > 0) {
      validators.every((vv) => {
        if (typeof vv.rule === "function") {
          const res = vv.rule({ value: values?.[name], name, values });
          if (res) {
            // 已有的error要删除
            delete errors[name];
            this.setState({ error: "" });
          } else {
            errors[name] = vv.message;
            this.setState({ error: vv.message });
            return false;
          }
        }
        return true;
      });
    }
    return true;
  };

  render(): ReactElement {
    const {
      children,
      className,
      label,
      readOnly,
      disabled,
      showRequiredMark,
    } = this.props;
    const restProps = _omit(
      this.props,
      "children",
      "className",
      "label",
      "name",
      "readOnly",
      "disabled",
      "showRequiredMark",
      "validators"
    );

    const { value, error } = this.state;
    const { layout = "vertical" } = this.context;

    return (
      <span
        className={cls(
          `${prefixCls}-form-item`,
          `${prefixCls}-${layout}-form-item`,
          className
        )}
        {...restProps}
      >
        {label && (
          <span className={`${prefixCls}-form-item-label`}>
            {showRequiredMark && (
              <span className={`${prefixCls}-form-item-require`}>*</span>
            )}
            {label}
          </span>
        )}
        {React.Children.map(children, (child) => {
          return React.isValidElement(child)
            ? React.cloneElement(child as ReactElement, {
                value,
                disabled,
                readOnly,
                onChange: this.onChange,
              })
            : child;
        })}
        <span className={`${prefixCls}-form-item-error`}>{error}</span>
      </span>
    );
  }
}

export default FormItem;
