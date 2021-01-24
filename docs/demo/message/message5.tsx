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
            content: (
              <div>
                <div className="mb8 font16">default</div>
                <div>message position</div>
              </div>
            ),
          });
        }}
      >
        默认
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            content: (
              <div>
                <div className="mb8 font16">topLeft</div>
                <div>message position</div>
              </div>
            ),
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
            content: (
              <div>
                <div className="mb8 font16">topRight</div>
                <div>message position</div>
              </div>
            ),
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
            content: (
              <div>
                <div className="mb8 font16">bottomLeft</div>
                <div>message position</div>
              </div>
            ),
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
            content: (
              <div>
                <div className="mb8 font16">bottomRight</div>
                <div>message position</div>
              </div>
            ),
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
