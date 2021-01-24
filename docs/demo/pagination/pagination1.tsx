import React from 'react';
import { Pagination } from 'redleaf-rc';

import '../../doc.less';

const Pagination1 = () => {
  return (
    <>
      {}
      <Pagination className="block mb8" totalItems={0} />
      <Pagination className="block mb8" totalItems="6" />
      <Pagination className="block mb8" totalItems={16} />
      <Pagination className="block mb8" totalItems={26} />
      <Pagination className="block mb8" totalItems={56} />
      <Pagination className="block mb8" totalItems="66" />
      <Pagination className="block mb8" totalItems={76} />
      <Pagination className="block mb8" totalItems={86} />
    </>
  );
};

export default () => <Pagination1 />;
