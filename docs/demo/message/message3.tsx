import React from 'react';
import { Message, Button } from 'redleaf-rc';

import '../../doc.less';

const Message3 = () => {
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Message.config({ duration: 5000 });
          Message.show({ content: 'display 5s' });
        }}
      >
        将message默认显示时间设置为5秒
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({ content: 'display 15s', duration: 15000 });
        }}
      >
        这个message的显示时间设置为15秒
      </Button>
    </>
  );
};

export default () => <Message3 />;
