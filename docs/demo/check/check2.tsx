import React, { useState } from 'react';
import { Check } from 'redleaf-rc';

import { data1 } from './data';
import '../../doc.less';

const Check1 = () => {
  const [checkVal1, setCheckVal1] = useState(['1', '3', '5', '7']);
  return (
    <>
      受控：
      <Check
        options={data1}
        className="block mb16"
        type="multi"
        value={checkVal1}
        onChange={({ value, meta }) => {
          console.log(value, meta);
          setCheckVal1(value);
        }}
      />
      设置初始值：
      <Check
        options={data1}
        className="block mb16"
        type="multi"
        defaultValue={['1', '3', '5']}
        onChange={({ value, meta }) => {
          console.log(value, meta);
        }}
      />
      只读：
      <Check
        options={data1}
        className="block mb16"
        type="multi"
        defaultValue={['1', '3', '5']}
        readOnly
        onChange={({ value, meta }) => {
          console.log(value, meta);
        }}
      />
      禁用：
      <Check
        options={data1}
        className="block mb16"
        type="multi"
        defaultValue={['2', '4', '6']}
        disabled
        onChange={({ value, meta }) => {
          console.log(value, meta);
        }}
      />
      限制多选的个数：
      <Check
        options={data1}
        className="block mb16"
        type="multi"
        defaultValue={['2', '4', '6']}
        maxNum={4}
        onChange={({ value, meta }) => {
          console.log(value, meta);
        }}
      />
    </>
  );
};

export default () => <Check1 />;
