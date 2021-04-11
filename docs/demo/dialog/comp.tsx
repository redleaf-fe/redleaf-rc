import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button } from 'redleaf-rc';

const Comp = props => {
  const formRef = useRef();
  const { submit, defaultValue } = props;
  const [optionData, setOptionData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setOptionData([
        { value: '1', text: '101' },
        { value: '2', text: '102' },
      ]);
    }, 1000);
  }, []);

  return (
    <Form
      className="mt8 dialog-form2"
      getInstance={f => (formRef.current = f)}
      defaultValue={defaultValue}
    >
      <Form.Item name="name" label="姓名：">
        <Input />
      </Form.Item>
      <Form.Item name="class" label="班级：">
        <Select options={optionData} />
      </Form.Item>
      <Button
        className="float-right"
        onClick={() => {
          submit(formRef.current.getValues());
        }}
      >
        提交
      </Button>
    </Form>
  );
};

export default Comp;
