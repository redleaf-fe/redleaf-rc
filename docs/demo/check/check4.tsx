import React, { useState } from 'react';
import { Check } from 'redleaf-rc';

import '../../doc.less';

const Check4 = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <Check
        options={[{ text: '', value: '' }]}
        onChange={({ value }) => {
          setData(value);
          console.log(data);
        }}
      />
    </>
  );
};

export default () => <Check4 />;
