import React, { useRef } from 'react';
import { Form, Button } from 'redleaf-rc';

import Comp from './comp';
import './style.less';
import '../../doc.less';

const Form4 = () => {
  const form = useRef({});

  return (
    <>
      <Form
        getInstance={i => {
          form.current = i;
        }}
      >
        <div>
          <Form.Item name="email" label="邮箱：" className="mb8">
            <Comp />
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

export default () => <Form4 />;
