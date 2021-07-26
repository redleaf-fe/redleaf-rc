import React from 'react';
import { Check } from 'redleaf-rc';

import { data1 } from './data';
import '../../doc.less';

const Check3 = () => (
  <>
    <Check
      options={data1}
      defaultValue={['1', '5', '7']}
      className="block mb8"
      markFill={false}
    />
    <Check
      options={data1}
      defaultValue={['3', '7']}
      className="block mb8"
      shape="rect"
      markFill={false}
    />

    <div>部分选中状态</div>
    <Check
      options={data1}
      defaultValue={['1', '5', '7']}
      className="block mb8"
      markFill={false}
      halfCheck
    />
    <Check
      options={data1}
      defaultValue={['3', '7']}
      className="block mb8"
      shape="rect"
      markFill={false}
      halfCheck
    />
  </>
);

export default () => <Check3 />;
