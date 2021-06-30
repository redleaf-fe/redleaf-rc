import React from 'react';
import { Select } from 'redleaf-rc';

import options from './data';
import '../../doc.less';
import './style.less';

function renderOption({ meta, index }) {
  return (
    <div>
      {meta.text}
      <div style={{ color: '#d5d5d5' }}>一行多余的文本{meta.value}</div>
    </div>
  );
}

function renderItem({ meta, index }) {
  return <div className="color-red">{meta.text}</div>;
}

const Select3 = () => {
  return (
    <Select
      optionsClassName="custom-options"
      type="multi"
      options={options.map(v => {
        return { ...v, renderOption, renderItem };
      })}
      onChange={({ value, meta }) => {
        console.log(value, meta);
      }}
    />
  );
};

export default () => <Select3 />;
