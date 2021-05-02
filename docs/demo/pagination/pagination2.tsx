import React, { useState } from 'react';
import { Pagination, Button } from 'redleaf-rc';

import '../../doc.less';

const Pagination2 = () => {
  const [curPage, setCurPage] = useState(1);
  return (
    <>
      <Pagination
        className="block mb8"
        totalItems={186}
        currentPage={curPage}
        onChange={({ page }) => {
          console.log('当前是第' + page + '页');
        }}
      />
      <Pagination
        type="complex"
        className="block mb8"
        totalItems={186}
        currentPage={curPage}
        onChange={({ page }) => {
          console.log('当前是第' + page + '页');
        }}
      />
      <Button
        onClick={() => {
          console.log('change');
          setCurPage(3);
        }}
      >
        跳到第3页
      </Button>
    </>
  );
};

export default () => <Pagination2 />;
