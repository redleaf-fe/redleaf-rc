import React, {
  ReactNode,
  ReactElement,
  MouseEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

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

export interface FormProps extends baseProps {
  getInstance: (ins: baseProps) => void;
  children: ReactNode;
  className?: string;
  defaultValue?: any;
  onValuesChange?: ({ name, value }: { name: string; value: any }) => void;
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

  const form = useRef<baseProps>({
    values: {},
  });

  useEffect(() => {
    getInstance(form.current);
  }, [getInstance]);

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
              // 让Form.Item可以获取到form、layout等属性
              form: form.current,
              defaultValue,
              layout,
              onFormChange: ({ name, value }: { name: string; value: any }) => {
                form.current.values[name] = value;
                onValuesChange?.({ name, value });
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
};

Form.defaultProps = {
  layout: 'vertical',
};

Form.Item = FormItem;

export default Form;
