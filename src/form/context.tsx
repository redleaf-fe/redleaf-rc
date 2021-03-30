import React, { ReactNode } from 'react';
import { baseProps } from '../types';

export interface IFormValues {
  value: any;
  name: string;
  values: baseProps;
}

export interface IFormValidator {
  rule: string | (({ value, name, values }: IFormValues) => boolean);
  message: string;
}

export interface IFormRef {
  values: baseProps;
  items: baseProps;
  errors: baseProps;
}

export interface IFormContext {
  formRef?: IFormRef;
  layout?: 'horizontal' | 'vertical';
  validateOnChange?: boolean;
  onFormChange?: ({ name, value }: { name: string; value: any }) => void;
}

export const FormContext = React.createContext<IFormContext>({});

export const ItemContext = React.createContext({});
