import React from 'react';
import { Message, Button } from 'redleaf-rc';

import '../../doc.less';

const Message1 = () => {
  return (
    <Button
      onClick={() => {
        Message.show({ content: 'message' });
      }}
    >
      click me
    </Button>
  );
};

export default () => <Message1 />;
