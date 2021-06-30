import React from 'react';
import { Check } from 'redleaf-rc';

import { data1 } from './data';
import '../../doc.less';

function renderLabel({ meta, index }) {
  return (
    <span className="color-red mr8">
      {meta.text}-{index}
    </span>
  );
}

const Check5 = () => (
  <>
    <Check
      options={data1.map(v => ({
        ...v,
        render: renderLabel
      }))}
      defaultValue={['1', '5', '7']}
      className="block mb8"
    />
  </>
);

export default () => <Check5 />;
