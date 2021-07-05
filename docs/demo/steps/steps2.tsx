import React, { useState } from 'react';
import { Steps } from 'redleaf-rc';

import options from './data';
import './style.less';
import '../../doc.less';

const Steps2 = () => {
  const [state, setState] = useState('1');
  return (
    <>
      <Steps
        options={options}
        className="block mb16"
        defaultValue={'3'}
        value={state}
        onChange={({ value, meta }) => {
          console.log(value, meta);
          setState(value);
        }}
      />
      <Steps
        options={options}
        layout="vertical"
        className="step-vertical"
        defaultValue={'3'}
        value={state}
        onChange={({ value, meta }) => {
          console.log(value, meta);
          setState(value);
        }}
      />
    </>
  );
};

export default () => <Steps2 />;
