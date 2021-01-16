import React, { useState } from 'react';
import { Input, Button } from 'redleaf-rc';

import genString from './data';
import '../../doc.less';

const Input1 = () => {
  const [inputVal, setInputVal] = useState('init');
  const [inputVal2, setInputVal2] = useState('disabled');
  const [inputVal3, setInputVal3] = useState('readOnly');
  return (
    <>
      <div className="mb8">
        受控：
        <Input
          className="mr8"
          value={inputVal}
          onChange={({ e, value }) => {
            console.log(e?.target.value, value);
          }}
        />
        <Button
          onClick={() => {
            setInputVal(genString());
          }}
        >
          设置内容
        </Button>
      </div>

      <div className="mb8">
        非受控：
        <Input
          placeholder="请输入"
          onChange={({ e, value }) => {
            console.log(e?.target.value, value);
          }}
        />
      </div>

      <div className="mb8">
        禁用：
        <Input
          className="mr8"
          disabled
          value={inputVal2}
          onChange={({ e }) => {
            console.log(e?.target.value);
          }}
        />
        <Button
          onClick={() => {
            setInputVal2(genString());
          }}
        >
          设置内容
        </Button>
      </div>

      <div className="mb8">
        只读：
        <Input
          className="mr8"
          readOnly
          value={inputVal3}
          onChange={({ e }) => {
            console.log(e?.target.value);
          }}
        />
        <Button
          onClick={() => {
            setInputVal3(genString());
          }}
        >
          设置内容
        </Button>
      </div>

      <div className="mb8">
        限制输入的最大长度：
        <Input
          showCount
          maxLength={300}
          onChange={({ e }) => {
            console.log(e?.target.value);
          }}
        />
      </div>
    </>
  );
};

export default () => <Input1 />;
