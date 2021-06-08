import React from 'react';
import { Button, Popup, Message } from 'redleaf-rc';

import '../../doc.less';

const Popup1 = () => {
  return (
    <>
      <Popup
        onOk={() => {
          Message.show({ title: '确定' });
        }}
        onCancel={() => {
          Message.show({ title: '取消' });
        }}
      >
        <Button>删除</Button>
      </Popup>
    </>
  );
};

export default () => <Popup1 />;
