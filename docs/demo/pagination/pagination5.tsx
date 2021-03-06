import React from 'react';
import { Pagination, ConfigProvider } from 'redleaf-rc';

import '../../doc.less';

const Pagination1 = () => {
  return (
    <>
      <ConfigProvider.Provider lang="en-US">
        <Pagination
          className="block mb8"
          totalItems={56}
          showPageJumper
          showPageSizeChanger
        />
      </ConfigProvider.Provider>
      <ConfigProvider.Provider
        langText={{ prevPage: '<', nextPage: '>', goto: 'jump' }}
      >
        <Pagination
          className="block mb8"
          totalItems={56}
          showPageJumper
          showPageSizeChanger
        />
      </ConfigProvider.Provider>
    </>
  );
};

export default () => <Pagination1 />;
