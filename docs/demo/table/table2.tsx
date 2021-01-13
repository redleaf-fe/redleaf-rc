import React, { useReducer, useEffect } from 'react';
import { Table, Pagination } from 'redleaf-rc';
import '../../doc.less';

import {reducer, columns, simuFetch} from './data';

const Table2 = () => {
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
      <Table columns={columns} datasets={state.datasets} />
      <Pagination
        pageSize={5}
        showPageJumper
        className="mt8 float-right"
        totalItems={state.totalItems}
        onChange={page => {
          simuFetch({
            curPage: page,
            pageSize: 5,
          }).then(res => {
            dispatch(res);
          });
        }}
      />
    </>
  );
};

export default () => <Table2 />;