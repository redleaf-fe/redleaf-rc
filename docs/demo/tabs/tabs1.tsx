import React from 'react';
import { Tabs } from 'redleaf-rc';

import options from './data';
import '../../doc.less';

const Tabs1 = () => {
  return (
    <>
      <Tabs options={options.slice(0, 3)} />
    </>
  );
};

export default () => <Tabs1 />;
