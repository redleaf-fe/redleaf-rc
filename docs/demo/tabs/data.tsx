import React from 'react';
import { Check } from 'redleaf-rc';

import './style.less';

export default [
  {
    text:
      '很长很长的文本很长很长的文本很长很长的文本很长很长的文本很长很长的文本很长很长的文本',
    value: '1',
    content: (
      <div className="content">
        <Check
          layout="vertical"
          options={[
            { value: 'option1', text: 'option1' },
            { value: 'option2', text: 'option2' },
            { value: 'option3', text: 'option3' }
          ]}
        />
      </div>
    )
  },
  {
    text:
      '2222222222222222222222222222222222222222222222222222222222222222222222',
    value: '2',
    content: (
      <div className="content">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    )
  },
  {
    text: '33',
    value: '3',
    content: (
      <div className="content">
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    )
  },
  { text: '44', value: '4' },
  { text: '55', value: '5' },
  { text: '66', value: '6' },
  { text: 'disabled', value: '7', disabled: true },
  { text: '77777', value: '8' },
  { text: '88888', value: '9' }
];
