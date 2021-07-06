import React, { useState } from 'react';
import { Tabs } from 'redleaf-rc';

import options from './data';
import '../../doc.less';

const Tabs1 = () => {
  const [val, setVal] = useState('2');
  return (
    <Tabs
      options={options}
      defaultValue="8"
      value={val}
      onChange={({ value, meta }) => {
        console.log(value, meta);
        setVal(value);
      }}
    />
  );
};

export default () => <Tabs1 />;
