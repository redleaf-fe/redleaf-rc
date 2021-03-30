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
                <div>
                  hand close hand close hand close hand close hand close hand
                  close hand close{' '}
                </div>
              </div>
            ),
            onClose: () => {
              console.log('关闭回调');
            },
            duration: 0,
            className: 'customize-container',
            contentClassName: 'customize-inner-container',
          });
        }}
      >
        手动销毁1
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.notify({
            content: (
              <div>
                <div className="mb8 font16">hand close {cnt++}</div>
                <div>
                  hand close hand close hand close hand close hand close hand
                  close hand close{' '}
                </div>
              </div>
            ),
            onClose: () => {
              console.log('关闭回调');
            },
            className: 'customize-container',
            contentClassName: 'customize-inner-container',
          });
        }}
      >
        手动销毁2
      </Button>
    </>
  );
};

export default () => <Message4 />;
