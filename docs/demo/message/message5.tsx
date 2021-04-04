import React from 'react';
import { Message, Button } from 'redleaf-rc';

import '../../doc.less';

const Message5 = () => {
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: 'default',
            content: 'message position',
          });
        }}
      >
        默认
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: 'topLeft',
            content: 'message position',
            position: 'topLeft',
          });
        }}
      >
        左上
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: 'topRight',
            content: 'message position',
            position: 'topRight',
          });
        }}
      >
        右上
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: 'bottomLeft',
            content: 'message position',
            position: 'bottomLeft',
          });
        }}
      >
        左下
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: 'bottomRight',
            content: 'message position',
            position: 'bottomRight',
          });
        }}
      >
        右下
      </Button>
    </>
  );
};

export default () => <Message5 />;
