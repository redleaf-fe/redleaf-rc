import React, { useState } from 'react';
import { Select, Button } from 'redleaf-rc';
import { ISelection } from 'redleaf-rc/dist/select';

import '../../doc.less';

const Select2 = () => {
  const [options, setOptions] = useState<ISelection[]>([]);
  return (
    <>
      <div className="mb8">
        <Select
          className="mr8 vertical-align-top"
          type="multi"
          options={options}
          onSearch={val => {
            setTimeout(() => {
              setOptions(
                [1, 2, 3, 4, 5].map(v => ({ text: v + val, value: v + val })),
              );
            }, 300);
          }}
          onChange={({ value, selection }) => {
            console.log(value, selection);
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
