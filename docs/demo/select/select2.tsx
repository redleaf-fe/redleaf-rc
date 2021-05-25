import React, { useState } from 'react';
import { Select, Button, ISelection } from 'redleaf-rc';

import '../../doc.less';

const Select2 = () => {
  const [options, setOptions] = useState([]);

  const getData = val => {
    return new Promise(res => {
      setTimeout(() => {
        res([1, 2, 3, 4, 5].map(v => ({ text: v + val, value: v + val })));
      }, 300);
    });
  };

  return (
    <>
      <div className="mb8">
        <Select
          className="mr8"
          type="multi"
          options={options}
          onSearch={val => {
            getData(val).then(res => {
              setOptions(res);
            });
          }}
          onChange={({ value, meta }) => {
            console.log(value, meta);
          }}
        />
        <Button
          onClick={() => {
            setOptions([]);
          }}
        >
          重置选项
        </Button>
      </div>
    </>
  );
};

export default () => <Select2 />;
