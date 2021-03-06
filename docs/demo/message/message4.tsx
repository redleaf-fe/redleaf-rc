import React from 'react';
import { Message, Button } from 'redleaf-rc';

import '../../doc.less';

const Message4 = () => {
  let cnt = 0;
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          const close = Message.show({
            content: (
              <div
                className="cursor-pointer"
                onClick={() => {
                  close?.();
                }}
              >
                <div className="mb8 font16">hand close {cnt++}</div>
                <div>点击内容关闭</div>
              </div>
            ),
            onClose: () => {
              console.log('关闭回调');
            },
            duration: 0
          });
        }}
      >
        手动销毁1
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: <div>hand close {cnt++}</div>,
            content: <div>点击关闭按钮关闭</div>,
            onClose: () => {
              console.log('关闭回调');
            },
            duration: 0,
            showCloseIcon: true
          });
        }}
      >
        手动销毁2
      </Button>
    </>
  );
};

export default () => <Message4 />;
