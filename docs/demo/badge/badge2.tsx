import React from 'react';
import { Badge } from 'redleaf-rc';

import './style.less';
import '../../doc.less';

const Badge2 = () => {
  return (
    <>
      <div className="mb16">最大值</div>
      <div className="mb16">
        <Badge num={100} maxNum={99} className="mr16" />
        <Badge num="100" maxNum={99} className="mr16" />
        <Badge num={<div>100</div>} maxNum={99} className="mr16" />
        <Badge num={[1, 2, 3]} maxNum={99} className="mr16" />
        <Badge num={'a message'} maxNum={99} className="mr16" />
      </div>

      <div className="mb16">显示小圆点</div>
      <div className="mb16">
        {['primary', 'default', 'danger', 'success'].map((v, k) => (
          <span key={k} className="mr16 dot-badge-body">
            <Badge num={123} dotted type={v} className="dot-badge" />
          </span>
        ))}
      </div>
    </>
  );
};

export default () => <Badge2 />;
