import React from 'react';
import { Message, Button } from 'redleaf-rc';

import '../../doc.less';

const Message1 = () => {
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            content: 'this is a message',
          });
        }}
      >
        message without title
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            content: 'this is a message, this is a message',
            title: "I'm a title",
          });
        }}
      >
        message with title
      </Button>
      <Button
        className="block"
        onClick={() => {
          Message.show({
            title: 'this is a message',
            showCloseIcon: true,
            duration: 0,
          });
        }}
      >
        message with close icon
      </Button>
    </>
  );
};

export default () => <Message1 />;
