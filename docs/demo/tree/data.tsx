import React from 'react';

export default [
  { value: 'home', text: '首页', children: [] },
  {
    value: 'Carnivora',
    text: '食肉目',
    children: [
      {
        value: 'Felidae',
        text: '猫科',
        children: [
          {
            value: 'Acinonyx',
            text: '猎豹属',
            render: () => (
              <div>
                <span className="color-red">猎豹</span>属
              </div>
            ),
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
    children: [
      {
        value: 'Sciuridae',
        text: '松鼠科'
      }
    ]
  }
];
