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
        onValuesChange={({ value, name, values }) => {
          switch (name) {
            case 'name':
              form.current.setValues({ [name]: value.replace(/\s/g, '') });
              break;
            case 'gender':
              console.log(value[0], [value[0] === 'male' ? 'female' : 'male']);
              form.current.setValues({
                [name]: [value[0] === 'male' ? 'female' : 'male'],
              });
              break;
            case 'class':
              form.current.setValues({
                [name]: [parseInt(value[0]) + 1 + ''],
              });
              break;
            case 'time':
              {
                const HMS = value.split(':');
                form.current.setValues({
                  [name]: `${parseInt(HMS[0]) + 1}:${HMS[1]}:${HMS[2]}`,
                });
              }
              break;
          }
        }}
      >
        <div>
          <Form.Item
            name="name"
            label="姓名："
            className="mb8"
            validators={[
              {
                rule: ({ value, name, values }) => {},
                message: '必填',
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
