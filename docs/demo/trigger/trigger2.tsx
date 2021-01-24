import React, { useState } from 'react';
import { Trigger, Button, Bubble } from 'redleaf-rc';

import '../../doc.less';

const Trigger2 = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="mb8">
        <Trigger
          type="hover"
          topOffset="-8"
          visible={show}
          content={<Bubble>121323123</Bubble>}
        >
          <Button>under control</Button>
        </Trigger>
      </div>
      <Button className="mr8" onClick={() => setShow(true)}>
        show
      </Button>
      <Button onClick={() => setShow(false)}>hide</Button>
    </>
  );
};

export default () => <Trigger2 />;
