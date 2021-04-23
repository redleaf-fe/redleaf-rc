import React from 'react';
import { Menu } from 'redleaf-rc';

import '../../doc.less';

const Menu1 = () => (
  <Menu
    className="border-1px-black"
    datasets={[
      { value: '1', text: '111' },
      { value: '2', text: '222' },
    ]}
  />
);

export default () => <Menu1 />;
