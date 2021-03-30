import React from 'react';
import { Check } from 'redleaf-rc';

import { data1 } from './data';
import '../../doc.less';

const Check3 = () => (
  <>
    <Check
      options={data1}
      defaultValue={['1', '5', '7']}
      className="block mb16"
      markFill={false}
    />
    <Check
      options={data1}
      defaultValue={['3', '7']}
      className="block mb16"
      shape="rect"
      markFill={false}
    />
  </>
);

export default () => <Check3 />;
