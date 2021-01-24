import React from 'react';
import { Message, Button } from 'redleaf-rc';

import '../../doc.less';

const Message2 = () => {
  return (
    <Button
      onClick={() => {
        Message.show({ content: 'message with key', key: 'message with key' });
      }}
    >
      click me
    </Button>
  );
};

export default () => <Message2 />;
