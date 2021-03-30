import React, { useRef, useState } from 'react';
import { Form, Input, Select, Button, Check, DateTime } from 'redleaf-rc';

import { genderOptions, classOptions } from './data';
import './style.less';
import '../../doc.less';

const Form3 = () => {
  const form = useRef({});

  return (
    <>
      <Form
        getInstance={i => {
          form.current = i;
        }}
        defaultValue={{
          name3: 'redleaf',
          class3: ['1'],
          gender3: ['male'],
          time3: '10:5:20',
        }}
        onValuesChange={({ value, name, values }) => {
          switch (name) {
            case 'name3':
              form.current.setValues({ [name]: value.replace(/\s/g, '') });
              break;
            case 'gender3':
              console.log(value[0], [value[0] === 'male' ? 'female' : 'male']);
              form.current.setValues({
                [name]: [value[0] === 'male' ? 'female' : 'male'],
              });
              break;
            case 'class3':
              form.current.setValues({
                [name]: [parseInt(value[0]) + 1 + ''],
              });
              break;
            case 'time3':
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
          <Form.Item name="name3" label="姓名：">
            <Input />
          </Form.Item>
          <Form.Item name="gender3" label="性别：">
            <Check options={genderOptions} />
          </Form.Item>
          <Form.Item name="class3" label="班级：">
            <Select options={classOptions} />
          </Form.Item>
          <Form.Item name="time3" label="时间：">
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
          <Button
            className="mr8"
            onClick={() => {
              form.current.setValues({
                name3: 'larry',
                gender3: ['male'],
                class3: ['2'],
                time3: '12:00:05',
              });
            }}
          >
            设置值
          </Button>
        </div>
      </Form>
    </>
  );
};

export default () => <Form3 />;
