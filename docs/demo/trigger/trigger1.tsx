import React from 'react';
import { Trigger, Button, Bubble } from 'redleaf-rc';

import '../../doc.less';

const Trigger1 = () => {
  return (
    <>
      <Trigger
        className="mr8"
        type="hover"
        topOffset="-8"
        content={<Bubble className="orange-bubble">121323123</Bubble>}
        onChildrenResize={rect => {
          console.log(rect);
        }}
      >
        <Button>Hover me</Button>
      </Trigger>
      <Trigger
        type="click"
        topOffset={-8}
        content={<Bubble className="orange-bubble">121323123</Bubble>}
        onHide={() => {
          console.log('hide');
        }}
        onShow={() => {
          console.log('show');
        }}
      >
        <Button>Click me</Button>
      </Trigger>
    </>
  );
};

export default () => <Trigger1 />;
