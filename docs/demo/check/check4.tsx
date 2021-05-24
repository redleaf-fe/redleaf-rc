import React, { useState } from 'react';
import { Check, Button } from 'redleaf-rc';

import '../../doc.less';

const Check4 = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <Check
        options={[{ text: '', value: '' }]}
        onChange={({ value }) => {
          setData(value);
        }}
      />
      <Button
        className="block mt8"
        onClick={() => {
          console.log(data);
        }}
      >
        确认
      </Button>
    </>
  );
};

export default () => <Check4 />;
