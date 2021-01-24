import React from 'react';
import { ConfigProvider, Pagination } from 'redleaf-rc';

import '../../doc.less';

const ConfigProvider1 = () => {
  return (
    <>
      英文：
      <ConfigProvider.Provider lang="en-US">
        <Pagination className="block mb8" totalItems={28} />
      </ConfigProvider.Provider>
      中文：
      <ConfigProvider.Provider lang="zh-CN">
        <Pagination className="block mb8" totalItems={28} />
      </ConfigProvider.Provider>
      通过langText设置了前一页的文本为{'<'}：
      <ConfigProvider.Provider lang="zh-CN" langText={{ prevPage: '<' }}>
        <Pagination className="block mb8" totalItems={28} />
      </ConfigProvider.Provider>
    </>
  );
};

export default () => <ConfigProvider1 />;
