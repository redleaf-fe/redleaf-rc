import React from 'react';
import { Steps } from 'redleaf-rc';

import options from './data';
import './style.less';
import '../../doc.less';

const Steps1 = () => {
  return (
    <>
      <Steps
        options={[
          { text: '11', value: '1' },
          { text: '22', value: '2' },
          { text: '33', value: '3' },
          { text: '44', value: '4' },
          { text: '55', value: '5' },
          { text: '66', value: '6' }
        ]}
        className="block mb16"
      />
      <div className="mb16">设置初始值</div>
      <Steps
        options={options}
        className="block mb16 step-horizontal"
        defaultValue={'2'}
      />
      <Steps
        options={options}
        layout="vertical"
        className="block step-vertical"
        defaultValue={'2'}
      />
    </>
  );
};

export default () => <Steps1 />;
