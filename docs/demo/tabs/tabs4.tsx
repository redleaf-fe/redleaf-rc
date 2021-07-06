import React from 'react';
import { Tabs } from 'redleaf-rc';

import options from './data';
import '../../doc.less';

const Tabs4 = () => {
  return (
    <>
      <div className="mb16">切换tab销毁content</div>
      <Tabs className="mb16" options={options.slice(0, 3)} destroyOnHide />
      <div className="mb16">切换tab保留content</div>
      <Tabs options={options.slice(0, 3)} />
    </>
  );
};

export default () => <Tabs4 />;
