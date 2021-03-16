import React, {
  ReactNode,
  ReactElement,
  useMemo,
  useEffect,
  MutableRefObject,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

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
  rules?: baseProps; // 键值对，值是函数
  errorMessage?: baseProps;
  defaultValue?: baseProps;
  readOnly?: boolean;
  disabled?: boolean;
  onFormChange: ({ name, value }: { name: string; value: any }) => void;
  layout: 'horizontal' | 'vertical';
}

const FormItem = (props: FormItemProps): ReactElement => {
  // layout属性是<Form />传递进来的
  const {
    className,
    children,
    onFormChange,
    name,
    label,
    layout,
    defaultValue,
    readOnly,
    disabled,
    ...restProps
  } = props;

  useEffect(() => {
    onFormChange?.({ name, value: defaultValue?.[name] });
  }, [name, onFormChange, defaultValue]);

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
              defaultValue: defaultValue?.[name],
              disabled,
              readOnly,
              onChange: ({ value }: { value: any }) => {
                if (!readOnly && !disabled) {
                  onFormChange?.({ name, value });
                }
              },
            })
          : child;
      })}
    </span>
  );
};

const { node, string, func, bool, any, oneOf, object } = PropTypes;

FormItem.propTypes = {
  children: node.isRequired,
  className: string,
  label: string,
  name: string.isRequired,
  onFormChange: func,
  readOnly: bool,
  disabled: bool,
  layout: oneOf(['vertical', 'horizontal']),
  defaultValue: object,
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

FormItem.defaultProps = {
  readOnly: false,
  disabled: false,
  layout: 'vertical',
};

export default FormItem;
