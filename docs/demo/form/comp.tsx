import React, { useEffect, useState } from 'react';
import { Input } from 'redleaf-rc';

const Comp: React.FC = props => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const { onChange } = props;

  useEffect(() => {
    // 如果没有这一句，form就不会接收到值
    onChange?.({ value: `${input1}@${input2}`, other: 'email' });
  }, [input1, input2, onChange]);

  return (
    <>
      <Input
        onChange={({ value }) => {
          setInput1(value);
        }}
      />
      @
      <Input
        onChange={({ value }) => {
          setInput2(value);
        }}
      />
    </>
  );
};

export default Comp;
