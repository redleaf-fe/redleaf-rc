import React from 'react';
import { Button, Message } from 'redleaf-rc';

import '../../doc.less';

const Button2 = () => {
  return (
    <>
      <Button
        className="mr8"
        bordered
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        按钮
      </Button>
      <Button
        className="mr8"
        bordered
        type="default"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        bordered
        type="primary"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        bordered
        type="success"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        绿色
      </Button>
      <Button
        className="mr8"
        bordered
        type="danger"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        红色
      </Button>
    </>
  );
};

export default () => <Button2 />;
