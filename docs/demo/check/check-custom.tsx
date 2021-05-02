import React from 'react';
import { Check } from 'redleaf-rc';

import './style.less';

// 这样也是可以的
// document.body.style.setProperty('--check-hover-color', 'orange');

export default () => (
  <Check
    className="custom"
    options={[
      { text: '选项一', value: '1' },
      { text: '选项二', value: '2' }
    ]}
  />
);
