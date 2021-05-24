import React, { useState } from 'react';
import { Table, Button } from 'redleaf-rc';
import '../../doc.less';

import { columns } from './data';

const Table4 = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      无数据
      <Table
        className="mb8"
        columns={columns}
        datasets={[]}
        nodataText="暂时没有数据"
      />
      loading
      <Button
        className="block mb8 mt8"
        onClick={() => {
          setLoading(t => !t);
        }}
      >
        切换loading状态
      </Button>
      <Table
        columns={columns}
        datasets={[
          {
            nameKey: { data: 'name1' },
            ageKey: 1,
            descKey: '很长很长的文本' + Math.random(),
            heightKey: 1,
            weightKey: 1,
            scoreKey: 1
          }
        ]}
        loading={loading}
      />
    </>
  );
};

export default () => <Table4 />;
