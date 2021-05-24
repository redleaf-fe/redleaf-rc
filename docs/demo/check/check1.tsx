import React from 'react';
import { Check } from 'redleaf-rc';

import { data1, data2 } from './data';
import '../../doc.less';

const Check1 = () => (
  <>
    单选：
    <Check options={data1} className="block mb8" />
    <Check options={data1} className="block mb8" shape="rect" />
    单选不允许取消勾选：
    <Check options={data1} className="block mb8" cancelable={false} />
    <Check
      options={data1}
      className="block mb8"
      shape="rect"
      cancelable={false}
    />
    多选：
    <Check options={data1} className="block mb8" type="multi" />
    <Check options={data1} className="block mb8" shape="rect" type="multi" />
    <div className="mb8">
      多行排列，可以通过--check-label-width设置单个check-item的文本显示长度：
    </div>
    <Check options={data2} className="block mb8" />
  </>
);

export default () => <Check1 />;
