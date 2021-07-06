import React, { useState } from 'react';
import { Tabs, Select } from 'redleaf-rc';

import options from './data';
import '../../doc.less';

const Tabs3 = () => {
  const [dir, setDir] = useState('left');
  return (
    <>
      <Select
        options={[
          { text: 'top', value: 'top' },
          { text: 'right', value: 'right' },
          { text: 'bottom', value: 'bottom' },
          { text: 'left', value: 'left' }
        ]}
        onChange={({ value }) => {
          setDir(value);
        }}
      />
      <Tabs options={options.slice(0, 3)} position={dir} />
    </>
  );
};

export default () => <Tabs3 />;
