import React from 'react';
import { Loading } from 'redleaf-rc';

import '../../doc.less';

const Loading2 = () => {
  return (
    <>
      {/* 颜色按照css样式中一样写即可 */}
      <Loading className="mr8" color="red" />
      <Loading className="mr8" color="#0a0" />
      <Loading className="mr8" color="rgb(0 ,0, 200)" />
      <Loading className="mr8" size={15} />
    </>
  );
};

export default () => <Loading2 />;
