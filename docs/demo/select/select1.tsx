import React, { useState } from 'react';
import { Select, Button } from 'redleaf-rc';

import options from './data';
import '../../doc.less';

const Select1 = () => {
  const [selectVal, setSelectVal] = useState([]);

  return (
    <>
      <div className="mb8">
        单选：
        <Select
          className="vertical-align-top"
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        多选：
        <Select
          className="vertical-align-top"
          type="multi"
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
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
          onChange={({ value, meta }) => {
            console.log(value, meta);
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
          className="mr8 vertical-align-top"
          type="multi"
          defaultValue={['1', '3', '4', '5']}
          readOnly
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        禁用：
        <Select
          className="mr8 vertical-align-top"
          type="multi"
          defaultValue={['3', '4', '5', '7']}
          disabled
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
        <Select
          className="mr8 vertical-align-top"
          disabled
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
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
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        不带选项搜索：
        <Select
          className="vertical-align-top"
          type="multi"
          showSearch={false}
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        不显示清除按钮：
        <Select
          className="vertical-align-top"
          type="multi"
          showClearIcon={false}
          options={options}
        />
      </div>
    </>
  );
};

export default () => <Select1 />;
