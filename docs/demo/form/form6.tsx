import React, { useRef } from 'react';
import { Form, Input, Check, Button } from 'redleaf-rc';

import { genderOptions } from './data';
import './style.less';
import '../../doc.less';

const HOC = (props: any) => {
  return <Input {...props} />;
};

const Form6 = () => {
  const form1 = useRef({});
  return (
    <>
      <Form
        className="form6"
        getInstance={i => {
          form1.current = i;
        }}
      >
        {/* 注意这个包裹的div */}
        <div>
          <Form.Item name="name1" label="两个不同类型的表单组件：">
            <Input className="mb8" />
            <Check options={genderOptions} className="block ml200" />
          </Form.Item>

          <Form.Item name="name2" label="Form.Item嵌套：">
            <Form.Item name="inner" label="内层：">
              <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item name="name3" label="div包裹：">
            <div className="ml200">
              <Input />
            </div>
          </Form.Item>

          <Form.Item name="name4" label="高阶组件：">
            <HOC />
          </Form.Item>

          <Button
            className="ml200 mr8"
            onClick={() => {
              console.log(form1.current.getValues());
            }}
          >
            submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default () => <Form6 />;
