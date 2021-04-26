import React from 'react';

function genData(len: number) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push({
      nameKey: { data: 'name' + i },
      ageKey: i,
      descKey: '很长很长的文本' + Math.random(),
      heightKey: i,
      weightKey: i,
      scoreKey: i
    });
  }
  return arr;
}

const tableData = genData(166);

function simuFetch({
  curPage,
  pageSize
}: {
  curPage: number;
  pageSize: number;
}): Promise {
  return Promise.resolve({
    datasets: tableData.slice((curPage - 1) * pageSize, curPage * pageSize),
    totalItems: tableData.length
  });
}

function reducer(state: any, action: any): { datasets: any; totalItems: any } {
  const { datasets, totalItems } = action;
  return { datasets, totalItems };
}

const columns = [
  {
    title: 'name',
    columnKey: 'nameKey.data',
    width: '20%',
    textAlign: 'start'
  },
  { title: 'age', columnKey: 'ageKey', textAlign: 'end' },
  { title: 'desc', columnKey: 'descKey', textAlign: 'center', grow: true },
  { title: 'height', columnKey: 'heightKey', width: '100' },
  { title: 'weight', columnKey: 'weightKey' },
  {
    title: 'score',
    columnKey: 'scoreKey',
    render: ({ meta }) => {
      return <div>{meta.scoreKey}</div>;
    }
  }
];

export { reducer, columns, simuFetch };
