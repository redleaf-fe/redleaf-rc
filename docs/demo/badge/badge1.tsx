import React from 'react';
import { Badge } from 'redleaf-rc';

import '../../doc.less';

const Badge1 = () => {
  return (
    <>
      <div className="mb16">普通样式</div>
      <div className="mb16">
        <Badge num={1} className="mr16" />
        <Badge num={12} type="default" className="mr16" />
        <Badge num={123} type="danger" className="mr16" />
        <Badge num={1234} type="success" className="mr16" />
      </div>

      <div className="mb16">边框样式</div>
      <div className="mb16">
        <Badge num={1} bordered className="mr16" />
        <Badge num={12} type="default" bordered className="mr16" />
        <Badge num={123} type="danger" bordered className="mr16" />
        <Badge num={1234} type="success" bordered className="mr16" />
      </div>

      <div className="mb16">禁用状态</div>
      <div className="mb16">
        <Badge num={1} disabled className="mr16" />
        <Badge num={12} type="default" disabled className="mr16" />
        <Badge num={123} type="danger" disabled className="mr16" />
        <Badge num={1234} type="success" disabled className="mr16" />
      </div>
    </>
  );
};

export default () => <Badge1 />;
