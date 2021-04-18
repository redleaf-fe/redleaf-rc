import React, { useState } from 'react';
import { Select, Button } from 'redleaf-rc';

import options from './data';
import '../../doc.less';

const Select1 = () => {
  const [selectVal, setSelectVal] = useState(['1']);

  return (
    <>
      <div className="mb8">
        单选：
        <Select
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        多选：
        <Select
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
          className="mr8"
          type="multi"
          value={selectVal}
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
            setSelectVal(value);
          }}
        />
        <Button
          onClick={() => {
            setSelectVal(['1', '2', '3']);
          }}
        >
          设置选项
        </Button>
      </div>
      <div className="mb8">
        设置初始值：
        <Select
          className="mr8"
          defaultValue={['3']}
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
        <Select
          className="mr8"
          type="multi"
          defaultValue={['3', '4', '5']}
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        只读：
        <Select
          className="mr8"
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
          className="mr8"
          type="multi"
          defaultValue={['3', '4', '5']}
          disabled
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
        <Select
          className="mr8"
          disabled
          defaultValue={['3']}
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        限制多选的个数：
        <Select
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
          type="multi"
          showSearch={false}
          options={options}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
      </div>
      <div className="mb8">
        不显示清除所有选中项按钮：
        <Select type="multi" showClearIcon={false} options={options} />
      </div>
    </>
  );
};

export default () => <Select1 />;
