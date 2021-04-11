import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useRef,
  useEffect,
} from "react";
import cls from "classnames";
import PropTypes from "prop-types";
import _cloneDeep from "lodash/cloneDeep";

import { FormContext, IFormValues, IFormRef } from "./context";
import FormItem from "./item";
import { prefixCls } from "../constants";
import { baseProps } from "../types";

import "../styles/common.less";
import "./style.less";

/* TODO: 
两种布局
校验和报错，滚动到错误处
预置校验(required，简单值：undefined\null\''，数组：空数组，对象：空对象，没属性，空字符串)
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
  validateOnChange?: boolean;
  onValuesChange?: ({ name, value, values }: IFormValues) => void;
  layout?: "horizontal" | "vertical";
}

const Form = (props: FormProps): ReactElement => {
  const {
    className,
    children,
    getInstance,
    layout = "vertical",
    defaultValue = {},
    validateOnChange,
    onValuesChange,
    ...restProps
  } = props;

  const formRef = useRef<IFormRef>({
    values: {},
    items: {},
    errors: {},
  });

  useEffect(() => {
    formRef.current.values = _cloneDeep(defaultValue);

    const { values = {}, errors = {}, items = {} } = formRef.current;

    for (const [k, v] of Object.entries(items)) {
      v?.setValue(values?.[k]);
    }

    getInstance?.({
      getValues: () => {
        for (const v of Object.values(items)) {
          v?.validate();
        }
        return { values, errors };
      },
      setValues: (kvs) => {
        for (const [k, v] of Object.entries(kvs)) {
          values[k] = v;
          items[k].setValue(v);
        }
      },
    });
  }, []);

  const onFormChange = useCallback(
    ({ name, value }: { name: string; value: any }) => {
      const { values = {} } = formRef.current;
      values[name] = value;
      onValuesChange?.({ name, value, values });
    },
    [onValuesChange]
  );

  return (
    <FormContext.Provider
      value={{
        formRef: formRef.current,
        layout,
        validateOnChange,
        onFormChange,
      }}
    >
      <span
        className={cls(
          `${prefixCls}-form`,
          `${prefixCls}-${layout}-form`,
          className
        )}
        {...restProps}
      >
        {children}
      </span>
    </FormContext.Provider>
  );
};

const { node, string, oneOf, func, any, bool } = PropTypes;

Form.propTypes = {
  children: node.isRequired,
  className: string,
  layout: oneOf(["horizontal", "vertical"]),
  validateOnChange: bool,
  defaultValue: any,
  onValuesChange: func,
  getInstance: func,
};

Form.defaultProps = {
  layout: "vertical",
  validateOnChange: true,
};

Form.Item = FormItem;

export default Form;
