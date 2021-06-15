import React from 'react';
import { Message, Button } from 'redleaf-rc';

import '../../doc.less';

const Message6 = () => {
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Message.success('message success');
        }}
      >
        Success
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.error('message error');
        }}
      >
        Error
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.info('message info');
        }}
      >
        Info
      </Button>
    </>
  );
};

export default () => <Message6 />;
