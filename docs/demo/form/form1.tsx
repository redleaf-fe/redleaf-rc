import React, { useRef } from 'react';
import { Form, Input, Select, Button, Check, DateTime } from 'redleaf-rc';

import { genderOptions, classOptions } from './data';
import './style.less';
import '../../doc.less';

const Form1 = () => {
  const form = useRef({});
  return (
    <>
      <Form
        getInstance={i => (form.current = i)}
        defaultValue={{ class: ['1'] }}
      >
        <Form.Item label="姓名：" name="name" className="mb8">
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="性别：" className="mb8">
          <Check options={genderOptions} />
        </Form.Item>
        <Form.Item name="class" label="班级：" className="mb8">
          <Select options={classOptions} />
        </Form.Item>
        <Form.Item name="time" label="时间：" className="mb8">
          <DateTime type="time" />
        </Form.Item>
        <Button
          className="ml100"
          onClick={() => {
            console.log(form.current.values);
          }}
        >
          submit
        </Button>
      </Form>
    </>
  );
};

export default () => <Form1 />;
