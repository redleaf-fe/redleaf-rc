import React, { useState } from 'react';
import { Button } from 'redleaf-rc';

import '../../doc.less';

const Button4 = () => {
  const [active, setActive] = useState(1);
  const getActive = (val: number) => (active === val ? 'primary' : 'default');
  return (
    <Button.Group>
      <Button type={getActive(1)} onClick={() => setActive(1)}>
        11
      </Button>
      <Button type={getActive(2)} onClick={() => setActive(2)}>
        22
      </Button>
      <Button type={getActive(3)} onClick={() => setActive(3)}>
        33
      </Button>
    </Button.Group>
  );
};

export default () => <Button4 />;
