import React from 'react';
import { Pagination } from 'redleaf-rc';

import '../../doc.less';

const Pagination1 = () => {
  return (
    <>
      <Pagination className="mb8" totalItems={0} type="complex" />
      <Pagination className="mb8" totalItems="6" type="complex" />
      <Pagination className="mb8" totalItems={36} type="complex" />
      <Pagination className="mb8" totalItems={56} />
      <Pagination className="mb8" totalItems={76} />
      <Pagination className="mb8" totalItems={96} />
    </>
  );
};

export default () => <Pagination1 />;
