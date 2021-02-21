import React, { useState } from 'react';
import { Select, Button } from 'redleaf-rc';

import options from './data';
import '../../doc.less';

const Select1 = () => {
  const [selectVal, setSelectVal] = useState<string[]>([]);

  return (
    <>
      <div className="mb8">
        单选：
        <Select
          className="vertical-align-top"
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
      </div>
      <div className="mb8">
        多选：
        <Select
          className="vertical-align-top"
          type="multi"
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
      </div>
      <div className="mb8">
        受控：
        <Select
          className="mr8 vertical-align-top"
          type="multi"
          value={selectVal}
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
        <Button
          onClick={() => {
            const arr = ['1', '2', '3', '4', '5', '6'];
            const idx = Math.ceil(Math.random() * 5);
            const val = arr.slice(idx, idx + 3);
            setSelectVal(val);
          }}
        >
          设置选项
        </Button>
      </div>
      <div className="mb8">
        只读：
        <Select
          className="mr8"
          type="multi"
          readOnly
          value={['1', '2']}
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
      </div>
      <div className="mb8">
        禁用：
        <Select
          className="mr8"
          type="multi"
          disabled
          value={['1', '2']}
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
        <Select
          className="mr8"
          disabled
          value={['1']}
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
      </div>
      <div className="mb8">
        限制多选的个数：
        <Select
          className="vertical-align-top"
          maxNum={4}
          type="multi"
          placeholder="请选择选项"
          searchNodata="查无选项"
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
      </div>
      <div className="mb8">
        不带选项搜索：
        <Select
          className="vertical-align-top"
          type="multi"
          showSearch={false}
          showClearIcon={false}
          options={options}
          onChange={({ value, selection }) => {
            console.log(value, selection);
          }}
        />
      </div>
    </>
  );
};

export default () => <Select1 />;
