import React, { useRef } from 'react';
import { Form, Input, Select, Button } from 'redleaf-rc';

import { classOptions } from './data';
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
          time: '10:5:20'
        }}
      >
        <div>
          <Form.Item
            name="name"
            label="姓名："
            showRequiredMark
            validators={[
              {
                rule: ({ value, name, values }) => {
                  return !!value;
                },
                message: '必填'
              },
              {
                rule: ({ value, name, values }) => {
                  return !/\s/.test(value);
                },
                message: '不能包含空格'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="class"
            label="班级："
            validators={[
              {
                rule: ({ value, name, values }) => {
                  console.log(
                    values.name.startsWith('1'),
                    value,
                    value[0] !== '1'
                  );
                  if (values.name.startsWith('1') && value[0] !== '1') {
                    return false;
                  }
                  return true;
                },
                message: '1开头的姓名必须选择为101班级'
              }
            ]}
          >
            <Select options={classOptions} />
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
