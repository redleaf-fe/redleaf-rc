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
            children: [
              {
                value: 'xxx',
                text: 'xxx',
                disabled: true
              },
              {
                value: 'yyy',
                text: 'yyy'
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
