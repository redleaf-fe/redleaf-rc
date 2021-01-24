import React from 'react';
import { Trigger, Button } from 'redleaf-rc';

import '../../doc.less';

const Trigger3 = () => {
  return (
    <>
      <div className="mb16">
        <Trigger
          className="mr16"
          position="topCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>topCenter</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="bottomCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>bottomCenter</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="leftCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>leftCenter</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="rightCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>rightCenter</Button>
        </Trigger>
      </div>

      <div className="mb16">
        <Trigger
          className="mr16"
          position="topLeft"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>topLeft</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="topRight"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>topRight</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="bottomLeft"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>bottomLeft</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="bottomRight"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>bottomRight</Button>
        </Trigger>
      </div>

      <div className="mb16">
        <Trigger
          className="mr16"
          position="leftTop"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>leftTop</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="leftBottom"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>leftBottom</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="rightTop"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>rightTop</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="rightBottom"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>rightBottom</Button>
        </Trigger>
      </div>
    </>
  );
};

export default () => <Trigger3 />;
