import React from 'react';
import { Menu } from 'redleaf-rc';

import menuData from './data';
import '../../doc.less';

const Menu2 = () => <Menu className="border-1px-black" datasets={menuData} />;

export default () => <Menu2 />;
