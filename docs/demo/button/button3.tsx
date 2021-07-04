import React from 'react';
import { Button, Message } from 'redleaf-rc';

import '../../doc.less';

const Button3 = () => {
  return (
    <>
      <Button
        className="mr8"
        disabled
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        disabled
        type="default"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        disabled
        type="success"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        绿色
      </Button>
      {/* 注意这最后一个 */}
      <Button
        className="mr8"
        disabled
        type="danger"
        onMouseDown={() => Message.show({ content: '按下按钮' })}
      >
        我是可以点击成功的，不信你试试
      </Button>
    </>
  );
};

export default () => <Button3 />;
