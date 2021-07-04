import React from 'react';
import { Button, Message } from 'redleaf-rc';

import '../../doc.less';

const Button1 = () => {
  return (
    <>
      <Button
        className="mr8"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        type="default"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        type="success"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        绿色
      </Button>
      <Button
        className="mr8"
        type="danger"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        红色
      </Button>
    </>
  );
};

export default () => <Button1 />;
