import React, { useReducer, useEffect } from 'react';
import { Table } from 'redleaf-rc';
import '../../doc.less';

import {reducer, columns, simuFetch} from './data';

const Table1 = () => {
  const [state, dispatch] = useReducer(reducer, {
    datasets: [],
    totalItems: 0,
  });

  useEffect(() => {
    simuFetch({
      curPage: 1,
      pageSize: 5,
    }).then(res => {
      dispatch(res);
    });
  }, []);

  return (
    <>
      行有边框
      <Table
        className="mb8"
        columns={columns}
        datasets={state.datasets}
        bordered="row"
      />
      行列都有边框
      <Table
        className="mb8"
        columns={columns}
        datasets={state.datasets}
        bordered="full"
      />
      无边框
      <Table
        className="mb8"
        columns={columns}
        datasets={state.datasets}
        bordered="none"
      />
    </>
  );
};

export default () => <Table1 />;
