import React from 'react';
import { Menu } from 'redleaf-rc';

import '../../doc.less';

const Menu1 = () => (
  <Menu
    className="border-1px-black"
    datasets={[
      { value: '1', text: '111', children: [] },
      {
        value: '2',
        text: '222',
        children: [
          {
            value: '3',
            text: '333',
            children: [
              {
                value: '4',
                text: '444'
              }
            ]
          },
          {
            value: '8',
            text: '888',
            children: [
              {
                value: '9',
                text: '999'
              }
            ]
          }
        ]
      },
      { value: '5', text: '555', children: [{ value: '6', text: '666' }] },
      { value: '7', text: '777' }
    ]}
  />
);

export default () => <Menu1 />;
