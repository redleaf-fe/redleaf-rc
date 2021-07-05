import React from 'react';
import { Pagination } from 'redleaf-rc';

import '../../doc.less';

const Pagination4 = () => {
  return (
    <>
      <Pagination
        className="mb8"
        totalItems={186}
        showPageJumper
        showPageSizeChanger
        onChange={({ page, pageSize }) => {
          console.log(page, pageSize);
        }}
      />
      <Pagination
        className="mb8"
        totalItems={186}
        showPageJumper
        onChange={({ page, pageSize }) => {
          console.log(page, pageSize);
        }}
      />
      自定义每页条数选项：
      <Pagination
        className="mb8"
        totalItems={186}
        showPageSizeChanger
        onChange={({ page, pageSize }) => {
          console.log(page, pageSize);
        }}
        pageSizeList={[30, 60, 100]}
      />
    </>
  );
};

export default () => <Pagination4 />;
