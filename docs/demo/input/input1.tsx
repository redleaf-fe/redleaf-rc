import React, { useState } from 'react';
import { Input, Button } from 'redleaf-rc';

import '../../doc.less';

const Input1 = () => {
  const [inputVal, setInputVal] = useState('init');
  return (
    <>
      <div className="mb8">
        受控：
        <Input
          className="mr8"
          value={inputVal}
          onChange={({ e, value }) => {
            console.log(e?.target.value, value);
            setInputVal(value);
          }}
        />
        <Button
          onClick={() => {
            setInputVal('设置内容');
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
          defaultValue="被禁用了"
          onChange={({ value }) => {
            console.log(value);
          }}
        />
      </div>

      <div className="mb8">
        只读：
        <Input
          className="mr8"
          readOnly
          defaultValue="只读状态"
          onChange={({ value }) => {
            console.log(value);
          }}
        />
      </div>

      <div className="mb8">
        限制输入的最大长度：
        <Input
          showCount
          value={inputVal}
          maxLength={30}
          onChange={({ value }) => {
            console.log(value);
            setInputVal(value);
          }}
        />
      </div>
    </>
  );
};

export default () => <Input1 />;
