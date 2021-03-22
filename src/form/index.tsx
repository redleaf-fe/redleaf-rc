import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { FormContext } from './context';
import FormItem from './item';
import { prefixCls } from '../constants';
import { baseProps } from '../types';

import '../styles/common.less';
import './style.less';

/* TODO: 
设置值、值变更回调，值变更时实时更新
必填标志
校验和报错，滚动到错误处
预置校验(required，简单值：undefined\null\''，数组：空数组，对象：空对象，没属性)
自定义组件，onChange 和 value
*/

type IFormInstance = {
  getValues: () => void;
  setValues: ({ name, value }: { name: string; value: baseProps }) => void;
};

export interface FormProps extends baseProps {
  getInstance?: ({ getValues, setValues }: IFormInstance) => void;
  children: ReactNode;
  className?: string;
  defaultValue?: any;
  onValuesChange?: ({
    name,
    value,
    values,
  }: {
    name: string;
    value: any;
    values: any;
  }) => void;
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

  const formRef = useRef<{ values: any; items: any }>({
    values: {},
    items: {},
  });

  useEffect(() => {
    formRef.current.values = defaultValue;

    for (const [k, v] of Object.entries(formRef.current.items)) {
      console.log(v, k);
      v?.setValue(formRef.current.values[k]);
    }

    getInstance?.({
      getValues: () => formRef.current.values,
      setValues: ({ name, value }: { name: string; value: baseProps }) => {
        formRef.current.values[name] = value;
        formRef.current.items[name].setValue(value);
      },
    });
  }, []);

  return (
    <FormContext.Provider
      value={{
        formRef: formRef.current,
        layout,
        onFormChange: ({ name, value }: { name: string; value: any }) => {
          formRef.current.values[name] = value;
          onValuesChange?.({ name, value, values: formRef.current.values });
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
};

Form.Item = FormItem;

export default Form;
