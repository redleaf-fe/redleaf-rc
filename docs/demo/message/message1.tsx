import React from 'react';
import { Message, Button, IconInfo } from 'redleaf-rc';

import '../../doc.less';

const Message1 = () => {
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            content: 'this is a message',
            onClose: () => {
              console.log('消息已关闭');
            }
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
            title: "I'm a title"
          });
        }}
      >
        message with title
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: 'this is a message',
            showCloseIcon: true,
            duration: 0
          });
        }}
      >
        message with close icon
      </Button>
      <Button
        className="block"
        onClick={() => {
          Message.show({
            title: (
              <div>
                <svg
                  viewBox="0 0 1024 1024"
                  width="24"
                  height="24"
                  fill="orange"
                >
                  <path d={IconInfo}></path>
                </svg>
                <span
                  className="inline-block"
                  style={{
                    verticalAlign: 'top',
                    color: 'skyblue',
                    height: '24px',
                    marginLeft: '5px'
                  }}
                >
                  complex message
                </span>
              </div>
            ),
            content: (
              <div>
                <div>it is a complex message</div>
                <div>which contains jsx</div>
              </div>
            ),
            showCloseIcon: true,
            duration: 0
          });
        }}
      >
        complex message
      </Button>
    </>
  );
};

export default () => <Message1 />;
