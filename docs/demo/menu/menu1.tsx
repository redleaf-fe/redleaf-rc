import React from 'react';
import { Menu } from 'redleaf-rc';

import menuData from './data';
import '../../doc.less';

const Menu1 = () => (
  <Menu
    className="border-1px-black"
    datasets={menuData}
    defaultValue="Acinonyx"
  />
);

export default () => <Menu1 />;
