import React, { ReactNode } from 'react';
import { IconInfoFill } from 'redleaf-rc';

import '../../doc.less';

function renderItem({ meta }): ReactNode {
  return (
    <div>
      <span className="color-red">{meta.text}</span>
      <span>{meta.value}</span>
    </div>
  );
}

export default [
  { value: 'home', text: '首页', children: [] },
  {
    value: 'Carnivora',
    text: '食肉目',
    render: renderItem,
    children: [
      {
        value: 'Felidae',
        text: '猫科',
        render({ meta }) {
          return (
            <div>
              {meta.text}
              <svg className="svg-icon" viewBox="0 0 1024 1024">
                <path d={IconInfoFill} />
              </svg>
            </div>
          );
        },
        children: [
          {
            value: 'Acinonyx',
            text: '猎豹属',
            children: [
              {
                value: 'disabledOption',
                text: 'disabled option',
                disabled: true
              },
              {
                value: 'longText',
                text: '很长很长的文本很长很长的文本很长很长的文本很长很长的文本'
              }
            ]
          },
          {
            value: 'Lynx',
            text: '猞猁属'
          }
        ]
      },
      {
        value: 'Canidae',
        text: '犬科',
        render({ meta }) {
          return (
            <div>
              {meta.text}
              <svg className="svg-icon" viewBox="0 0 1024 1024">
                <path d={IconInfoFill} />
              </svg>
            </div>
          );
        },
        children: [
          {
            value: 'Canis',
            text: '犬属'
          }
        ]
      }
    ]
  },
  {
    value: 'Rodentia',
    text: '啮齿目',
    render: renderItem,
    children: [
      {
        value: 'Sciuridae',
        text: '松鼠科'
      }
    ]
  }
];
