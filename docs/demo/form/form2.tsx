import React, { useRef } from 'react';
import { Form, Input, Select, Button, Check, DateTime } from 'redleaf-rc';

import { genderOptions, classOptions } from './data';
import './style.less';
import '../../doc.less';

const Form2 = () => {
  const form1 = useRef({});
  const form2 = useRef({});
  const form3 = useRef({});
  return (
    <>
      <div className="mb8">
        设置初始值：
        <Form
          getInstance={i => (form1.current = i)}
          defaultValue={{
            name: 'redleaf',
            class: ['1'],
            gender: ['male'],
            time: '2021-01-01 10:5:20'
          }}
        >
          <Form.Item name="name" label="姓名：">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="性别：">
            <Check options={genderOptions} />
          </Form.Item>
          <Form.Item name="class" label="班级：">
            <Select options={classOptions} />
          </Form.Item>
          <Form.Item name="time" label="时间：">
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
      </div>

      <div className="mb8">
        只读：
        <Form
          getInstance={i => (form2.current = i)}
          defaultValue={{
            name: 'redleaf',
            class: ['1'],
            gender: ['male'],
            time: '2021-01-01 10:5:20'
          }}
        >
          <Form.Item name="name" label="姓名：" readOnly>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="性别：" readOnly>
            <Check options={genderOptions} />
          </Form.Item>
          <Form.Item name="class" label="班级：" readOnly>
            <Select options={classOptions} />
          </Form.Item>
          <Form.Item name="time" label="时间：" readOnly>
            <DateTime type="time" />
          </Form.Item>
          <Button
            className="ml100"
            onClick={() => {
              console.log(form2.current.getValues());
            }}
          >
            submit
          </Button>
        </Form>
      </div>

      <div className="mb8">
        禁用：
        <Form
          getInstance={i => (form3.current = i)}
          defaultValue={{
            name: 'redleaf',
            class: ['1'],
            gender: ['male'],
            time: '2021-01-01 10:5:20'
          }}
        >
          <Form.Item name="name" label="姓名：" disabled>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="性别：" disabled>
            <Check options={genderOptions} />
          </Form.Item>
          <Form.Item name="class" label="班级：" disabled>
            <Select options={classOptions} />
          </Form.Item>
          <Form.Item name="time" label="时间：" disabled>
            <DateTime type="time" />
          </Form.Item>
          <Button
            className="ml100"
            onClick={() => {
              console.log(form3.current.getValues());
            }}
          >
            submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default () => <Form2 />;
