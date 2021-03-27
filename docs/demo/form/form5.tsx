import React, { useRef } from 'react';
import { Form, Input, Select, Button, Check, DateTime } from 'redleaf-rc';

import { genderOptions, classOptions } from './data';
import './style.less';
import '../../doc.less';

const Form5 = () => {
  const form = useRef({});

  return (
    <>
      <Form
        getInstance={i => {
          form.current = i;
        }}
        defaultValue={{
          name: 'redleaf',
          class: ['1'],
          gender: ['male'],
          time: '10:5:20',
        }}
      >
        <div>
          <Form.Item
            name="name"
            label="姓名："
            className="mb8"
            validators={[
              {
                rule: ({ value, name, values }) => {
                  return !!value;
                },
                message: '必填',
              },
              {
                rule: ({ value, name, values }) => {
                  return value.startsWith('a');
                },
                message: '必须以a开头',
              },
              {
                rule: ({ value, name, values }) => {
                  return !/\s/.test(value);
                },
                message: '不能包含空格',
              },
            ]}
          >
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
            className="ml100 mr8"
            onClick={() => {
              console.log(form.current.getValues());
            }}
          >
            submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default () => <Form5 />;
