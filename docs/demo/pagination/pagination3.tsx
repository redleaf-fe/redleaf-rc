import React, { useState } from 'react';
import { Pagination, Button } from 'redleaf-rc';

import '../../doc.less';

const Pagination3 = () => {
  const [items, setItems] = useState(186);
  return (
    <>
      <Pagination
        className="block mb8"
        totalItems={items}
        renderTotalItems={({ totalItems, currentPage, pageSize, pages }) => {
          return (
            <span className="mr8">
              共{totalItems}项数据，共{pages}页，每页{pageSize}项，当前第
              {currentPage}页
            </span>
          );
        }}
      />
      <Pagination
        type="complex"
        className="block mb8"
        totalItems={items}
        renderTotalItems={({ totalItems, currentPage, pageSize, pages }) => {
          return (
            <span className="mr8">
              共{totalItems}项数据，共{pages}页，每页{pageSize}项，当前第
              {currentPage}页
            </span>
          );
        }}
      />
      <Pagination
        className="block mb8"
        totalItems={0}
        renderTotalItems={({ totalItems, currentPage, pageSize, pages }) => {
          return (
            <span className="mr8">
              共{totalItems}项数据，共{pages}页，每页{pageSize}项
            </span>
          );
        }}
      />
      <Pagination
        type="complex"
        className="block mb8"
        totalItems={0}
        renderTotalItems={({ totalItems, currentPage, pageSize, pages }) => {
          return (
            <span className="mr8">
              共{totalItems}项数据，共{pages}页，每页{pageSize}项
            </span>
          );
        }}
      />
      <Button
        onClick={() => {
          setItems(items + 9);
        }}
      >
        add items
      </Button>
    </>
  );
};

export default () => <Pagination3 />;
