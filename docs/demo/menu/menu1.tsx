import React from 'react';
import { Menu } from 'redleaf-rc';

import menuData from './data';
import '../../doc.less';

const Menu1 = () => (
  <Menu
    className="border-1px-black"
    options={menuData}
    defaultValue="Rodentia"
    onOpen={({ meta }) => {
      console.log(meta, 'open');
    }}
    onClose={({ meta }) => {
      console.log(meta, 'close');
    }}
    onChange={({ meta }) => {
      console.log(meta, 'active');
    }}
  />
);

export default () => <Menu1 />;
