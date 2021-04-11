import React, { useRef, useState } from 'react';
import { Button, Dialog } from 'redleaf-rc';

import Comp from './comp';

import '../../doc.less';
import './style.less';

const Dialog3 = () => {
  const [defaultValue, setDefaultValue] = useState({});
  const close1 = useRef();

  const submit1 = ({ values }) => {
    close1.current();
    // 改变defaultValue
    setDefaultValue(values);
    console.log(values);
  };

  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          close1.current = Dialog.show({
            content: <Comp submit={submit1} defaultValue={defaultValue} />,
            title: '更新对话框中内容',
            showCloseIcon: true,
            onClose: () => {
              console.log('close');
            },
          });
        }}
      >
        open
      </Button>
      <Button
        onClick={() => {
          setDefaultValue({ name: 'redleaf' });
        }}
      >
        改变defaultValue
      </Button>
    </>
  );
};

export default () => <Dialog3 />;
