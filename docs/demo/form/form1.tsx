import React, { useRef } from 'react';
import { Form, Input, Select, Button, Check, DateTime } from 'redleaf-rc';

import { genderOptions, classOptions } from './data';
import './style.less';
import '../../doc.less';

const Form1 = () => {
  const form1 = useRef({});
  return (
    <>
      <div className="mb8">竖直布局：</div>
      <Form
        getInstance={i => {
          form1.current = i;
        }}
      >
        <Form.Item label={<div className="color-red">姓名：</div>} name="name1">
          <Input />
        </Form.Item>
        <Form.Item label="性别：" name="gender1">
          <Check options={genderOptions} />
        </Form.Item>
        <Form.Item label="班级：" name="class1">
          <Select options={classOptions} />
        </Form.Item>
        <Form.Item label="时间：" name="time1">
          <DateTime type="time" />
        </Form.Item>
        <Button
          className="ml100"
          onClick={() => {
            console.log(form1.current.getValues());
          }}
        >
          submit
        </Button>
      </Form>

      <div className="mt8 mb8">水平布局：</div>
      <Form layout="horizontal">
        <Form.Item label="姓名：" name="name1">
          <Input />
        </Form.Item>
        <Form.Item label="性别：" name="gender1">
          <Check options={genderOptions} />
        </Form.Item>
        <Form.Item label="班级：" name="class1">
          <Select options={classOptions} />
        </Form.Item>
        <Form.Item label="时间：" name="time1">
          <DateTime type="time" />
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <Form1 />;
