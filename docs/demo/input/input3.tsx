import React, { useState } from 'react';
import { Input, Button } from 'redleaf-rc';

import '../../doc.less';

const Input3 = () => {
  const [inputVal, setInputVal] = useState('multi');
  const [inputVal2, setInputVal2] = useState('disable');
  return (
    <>
      <div className="mb8">
        受控：
        <Input
          className="mr8 vertical-align-top"
          value={inputVal}
          type="textarea"
          placeholder="输入多行内容"
          onChange={({ value }) => {
            console.log(value);
            setInputVal(value);
          }}
        />
        <Button
          className="vertical-align-top"
          onClick={() => {
            setInputVal('这是设置的内容');
          }}
        >
          设置内容
        </Button>
      </div>
      <div className="mb8">
        非受控，设置高度：
        <Input
          type="textarea"
          className="vertical-align-top"
          placeholder="输入多行内容"
          onChange={({ value }) => {
            console.log(value);
          }}
          rows={6}
          showCount
          maxLength={150}
        />
      </div>
      <div className="mb8">
        禁用：
        <Input
          className="mr8 vertical-align-top"
          disabled
          value={inputVal2}
          type="textarea"
          placeholder="输入多行内容"
          onChange={({ value }) => {
            console.log(value);
          }}
        />
        <Button
          className="vertical-align-top"
          onClick={() => {
            setInputVal2('设置内容');
          }}
        >
          设置内容
        </Button>
      </div>
    </>
  );
};

export default () => <Input3 />;
