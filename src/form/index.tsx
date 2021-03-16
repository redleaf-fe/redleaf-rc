import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import FormItem from './item';
import { prefixCls } from '../constants';
import { baseProps } from '../types';

import '../styles/common.less';
import './style.less';

/* TODO: 
必填标志
设置值
校验和报错，滚动到错误处
值变更回调，值变更时实时更新
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
    layout,
    defaultValue,
    onValuesChange,
    ...restProps
  } = props;

  const values = useRef<baseProps>({});
  const hasSetInstance = useRef(false);

  useEffect(() => {
    getInstance?.({
      getValues: () => values.current,
      setValues: ({ name, value }: { name: string; value: baseProps }) => {
        values.current[name] = value;
      },
    });
    hasSetInstance.current = true;
  }, []);

  return (
    <span
      className={cls(
        `${prefixCls}-form`,
        `${prefixCls}-${layout}-form`,
        className,
      )}
      {...restProps}
    >
      {React.Children.map(children, child => {
        // 这里这个type.name依赖react的结构
        return child?.type?.name === 'FormItem'
          ? React.cloneElement(child as ReactElement, {
              // 让Form.Item可以获取到layout等属性
              defaultValue,
              layout,
              onFormChange: ({ name, value }: { name: string; value: any }) => {
                values.current[name] = value;
                // 已经执行过getInstance才开始执行onValuesChange
                hasSetInstance.current &&
                  onValuesChange?.({ name, value, values: values.current });
              },
            })
          : child;
      })}
    </span>
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
