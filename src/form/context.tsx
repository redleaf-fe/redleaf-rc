import React from 'react';

export interface FormContextProps {
  formRef?: {
    values: any;
    items: any;
  };
  layout?: 'horizontal' | 'vertical';
  onFormChange?: ({ name, value }: { name: string; value: any }) => void;
}

export const FormContext = React.createContext<FormContextProps>({});

export const ItemContext = React.createContext({});
