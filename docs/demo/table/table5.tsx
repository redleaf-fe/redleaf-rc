import React, { useReducer, useEffect, useState } from 'react';
import { Table, ITableColumns, Pagination } from 'redleaf-rc';
import '../../doc.less';

import { reducer, columns, simuFetch } from './data';

const Table5 = () => {
  const [state, dispatch] = useReducer(reducer, {
    datasets: [],
    totalItems: 0
  });

  const [checkData, setCheckData] = useState([
    'name0',
    'name3',
    'name6',
    'name8'
  ]);

  useEffect(() => {
    simuFetch({
      curPage: 1,
      pageSize: 5
    }).then(res => {
      dispatch(res);
    });
  }, []);

  return (
    <>
      <Pagination
        pageSize={5}
        showPageJumper
        className="mt8 float-right"
        totalItems={state.totalItems}
        onChange={({ page }) => {
          simuFetch({
            curPage: page,
            pageSize: 5
          }).then(res => {
            dispatch(res);
          });
        }}
      />
      <Table
        checkable
        checkValue={checkData}
        onCheckChange={({ value, meta }) => {
          console.log(value, meta);
          setCheckData(value);
        }}
        checkKey="nameKey.data"
        className="mb8"
        columns={columns as ITableColumns[]}
        datasets={state.datasets}
        bordered="row"
      />
      <div>单选</div>
      <Pagination
        pageSize={5}
        showPageJumper
        className="mt8 float-right"
        totalItems={state.totalItems}
        onChange={({ page }) => {
          simuFetch({
            curPage: page,
            pageSize: 5
          }).then(res => {
            dispatch(res);
          });
        }}
      />
      <Table
        checkable
        checkType="single"
        onCheckChange={({ value, meta }) => {
          console.log(value, meta);
        }}
        checkKey="nameKey.data"
        className="mb8"
        columns={columns as ITableColumns[]}
        datasets={state.datasets}
        bordered="row"
      />
      <div>可选个数限制</div>
      <Pagination
        pageSize={5}
        showPageJumper
        className="mt8 float-right"
        totalItems={state.totalItems}
        onChange={({ page }) => {
          simuFetch({
            curPage: page,
            pageSize: 5
          }).then(res => {
            dispatch(res);
          });
        }}
      />
      <Table
        checkable
        checkMaxNum={4}
        onCheckChange={({ value, meta }) => {
          console.log(value, meta);
        }}
        checkKey="nameKey.data"
        className="mb8"
        columns={columns as ITableColumns[]}
        datasets={state.datasets}
        bordered="row"
      />
    </>
  );
};

export default () => <Table5 />;
