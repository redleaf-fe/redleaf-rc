import React, { useReducer, useEffect } from 'react';
import { Table } from 'redleaf-rc';
import '../../doc.less';

import { reducer, columns, simuFetch } from './data';

const Table3 = () => {
  const [state, dispatch] = useReducer(reducer, {
    datasets: [],
    totalItems: 0,
  });

  useEffect(() => {
    simuFetch({
      curPage: 1,
      pageSize: 10,
    }).then(res => {
      dispatch(res);
    });
  }, []);

  return (
    <>
      列滚动
      <Table
        className="mb8"
        bordered="full"
        colScrollWidth={1000}
        columns={columns}
        datasets={state.datasets}
      />
      行滚动
      <Table
        bordered="full"
        rowScrollHeight={100}
        colScrollWidth={1000}
        columns={columns}
        datasets={state.datasets}
      />
    </>
  );
};

export default () => <Table3 />;
