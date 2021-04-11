import React from 'react';
import { Button, Dialog } from 'redleaf-rc';

import '../../doc.less';
import './style.less';

const title = '这是一个对话框';
const content = '这是一个对话框的内容，点击遮罩区域关闭';

const Dialog2 = () => {
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Dialog.show({
            content,
            title,
            maskClosable: true,
          });
        }}
      >
        center
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Dialog.show({
            content,
            title,
            position: 'top',
            maskClosable: true,
          });
        }}
      >
        top
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Dialog.show({
            content,
            title,
            position: 'bottom',
            maskClosable: true,
          });
        }}
      >
        bottom
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Dialog.show({
            content,
            title,
            position: 'left',
            maskClosable: true,
          });
        }}
      >
        left
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Dialog.show({
            content,
            title,
            position: 'right',
            maskClosable: true,
          });
        }}
      >
        right
      </Button>
      自定义位置：
      <Button
        className="block mb8"
        onClick={() => {
          Dialog.show({
            className: 'dialog2',
            content,
            title,
            position: 'right',
            maskClosable: true,
          });
        }}
      >
        rightTop
      </Button>
    </>
  );
};

export default () => <Dialog2 />;
