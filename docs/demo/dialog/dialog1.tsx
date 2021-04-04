import React, { useRef } from 'react';
import { Button, Dialog } from 'redleaf-rc';

import '../../doc.less';
import './style.less';

const Dialog1 = () => {
  const close = useRef();

  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Dialog.show({
            content: '这是一个对话框的内容，点击遮罩区域关闭',
            title: '这是一个对话框',
            maskClosable: true,
          });
        }}
      >
        open
      </Button>
      <Button
        className="block"
        onClick={() => {
          close.current = Dialog.show({
            content: (
              <>
                <div className="dlg-content">
                  这是一个对话框的内容这是一个对话框的内容这是一个对话框的内容这是一个对话框的内容
                </div>
                <div className="dlg-footer overflow-hidden">
                  <Button
                    className="float-right mt8"
                    onClick={() => {
                      close.current();
                    }}
                  >
                    关闭
                  </Button>
                </div>
              </>
            ),
            title: <div className="mb8">这是一个对话框</div>,
            showCloseIcon: true,
            className: 'dialog1',
          });
        }}
      >
        open
      </Button>
    </>
  );
};

export default () => <Dialog1 />;
