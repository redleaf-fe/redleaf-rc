import React, { useRef, useState } from 'react';
import { Button, Dialog } from 'redleaf-rc';

import { longText } from './data';
import '../../doc.less';
import './style.less';

const Dialog3 = () => {
  const close1 = useRef();

  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          close1.current = Dialog.show({
            content: (
              <div>
                <Button
                  className="mt8"
                  onClick={() => {
                    Dialog.show({
                      title: '另一个对话框',
                      content: <div className="dialog3">{longText}</div>,
                      showCloseIcon: true,
                    });
                  }}
                >
                  打开另一个对话框
                </Button>
              </div>
            ),
            title: '对话框中打开另一个对话框',
            showCloseIcon: true,
          });
        }}
      >
        open
      </Button>
    </>
  );
};

export default () => <Dialog3 />;
