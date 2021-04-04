import React from 'react';
import { Form, Input } from 'redleaf-rc';

const Comp = () => (
  <Form>
    <Form.Item name="name" label="姓名：">
      <Input />
    </Form.Item>
  </Form>
);

export default () => <Comp />;
