import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import {
  FormContext,
  IFormValidator,
  IFormValues,
  IFormRef,
  IFormContext,
} from './context';
import FormItem from './item';
import { prefixCls } from '../constants';
import { baseProps } from '../types';

import '../styles/common.less';
import './style.less';

/* TODO: 
必填标志
校验和报错，滚动到错误处
预置校验(required，简单值：undefined\null\''，数组：空数组，对象：空对象，没属性)
自定义组件，onChange 和 value
onBlur时触发校验
*/

type IFormInstance = {
  getValues: () => void;
  setValues: (kvs: baseProps) => void;
};

export interface FormProps extends baseProps {
  getInstance?: ({ getValues, setValues }: IFormInstance) => void;
  children: ReactNode;
  className?: string;
  defaultValue?: baseProps;
  onValuesChange?: ({ name, value, values }: IFormValues) => void;
  layout?: 'horizontal' | 'vertical';
}

const Form = (props: FormProps): ReactElement => {
  const {
    className,
    children,
    getInstance,
    layout = 'vertical',
    defaultValue,
    onValuesChange,
    ...restProps
  } = props;

  const formRef = useRef<IFormRef>({
    values: {},
    items: {},
    validators: {},
  });

  useEffect(() => {
    formRef.current.values = defaultValue || {};

    const { values = {}, validators = {}, items = {} } = formRef.current;

    for (const [k, v] of Object.entries(items)) {
      v?.setValue(values?.[k]);
    }

    getInstance?.({
      getValues: () => {
        const errors: baseProps[] = [];

        for (const [k, v] of Object.entries(items)) {
          if (typeof v.rule === 'string') {
            //
          } else if (typeof v.rule === 'function') {
            const res = v.rule({ value: values?.[k], name: k, values });
            res && errors.push({ [k]: validators?.[k] });
          }
        }
        return { values, errors };
      },
      setValues: kvs => {
        for (const [k, v] of Object.entries(kvs)) {
          values[k] = v;
          items[k].setValue(v);
        }
      },
    });
  }, []);

  return (
    <FormContext.Provider
      value={{
        formRef: formRef.current,
        layout,
        onFormChange: ({ name, value }: { name: string; value: any }) => {
          const { values = {} } = formRef.current;
          values[name] = value;
          onValuesChange?.({ name, value, values });
        },
      }}
    >
      <span
        className={cls(
          `${prefixCls}-form`,
          `${prefixCls}-${layout}-form`,
          className,
        )}
        {...restProps}
      >
        {children}
      </span>
    </FormContext.Provider>
  );
};

const { node, string, oneOf, func, any } = PropTypes;

Form.propTypes = {
  children: node.isRequired,
  className: string,
  layout: oneOf(['horizontal', 'vertical']),
  defaultValue: any,
  onValuesChange: func,
  getInstance: func,
};

Form.defaultProps = {
  layout: 'vertical',
  defaultValue: {},
};

Form.Item = FormItem;

export default Form;
