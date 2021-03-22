import React from 'react';
import { Check } from 'redleaf-rc';

import { data1, data2 } from './data';
import '../../doc.less';

const Check1 = () => (
  <>
    单选：
    <Check options={data1} className="block mb16" />
    <Check options={data1} className="block mb16" shape="rect" />
    单选取消勾选：
    <Check options={data1} className="block mb16" cancelable={true} />
    <Check
      options={data1}
      className="block mb16"
      shape="rect"
      cancelable={true}
    />
    多选：
    <Check options={data1} className="block mb16" type="multi" />
    <Check options={data1} className="block mb16" shape="rect" type="multi" />
    <div className="mb8">
      多行排列，可以通过--check-label-width设置单个check-item的文本显示长度：
    </div>
    <Check options={data2} className="block mb16" />
  </>
);

export default () => <Check1 />;
