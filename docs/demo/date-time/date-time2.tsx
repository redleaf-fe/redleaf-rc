import React, { useState } from 'react';
import { DateTime } from 'redleaf-rc';

import '../../doc.less';

const DateTime2 = () => {
  const [datetime, setDatetime] = useState('2020-12-1');
  const [datetime2, setDatetime2] = useState('');
  return (
    <>
      <div className="mb8">
        使用String类型：
        <DateTime
          type="date-time"
          defaultValue="12:0:0"
          value={datetime}
          onChange={({ value }) => {
            setDatetime(value);
          }}
        />
      </div>
      <div className="mb8">
        使用dayjs对象：
        <DateTime
          type="date-time"
          value={datetime2}
          onChange={({ meta }) => {
            // 清除时meta为空对象
            setDatetime2(
              typeof meta.format === 'function'
                ? meta.format('YYYY-MM-DD HH:mm:ss')
                : ''
            );
          }}
        />
      </div>
    </>
  );
};

export default () => <DateTime2 />;
