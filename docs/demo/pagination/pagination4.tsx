import React from 'react';
import { Pagination } from 'redleaf-rc';

import '../../doc.less';

const Pagination4 = () => {
  return (
    <>
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageJumper
        showPageSizeChanger
        onChange={({ page, size }) => {
          console.log(page, size);
        }}
      />
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageJumper
        onChange={({ page, size }) => {
          console.log(page, size);
        }}
      />
      自定义每页条数选项：
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageSizeChanger
        onChange={({ page, size }) => {
          console.log(page, size);
        }}
        pageSizeList={[30, 60, 100]}
      />
    </>
  );
};

export default () => <Pagination4 />;
