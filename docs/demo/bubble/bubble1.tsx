import React, { useEffect } from 'react';
import { Bubble } from 'redleaf-rc';

import '../../doc.less';

const Bubble1 = () => {
  return (
    <>
      <div className="mb16">
        <Bubble className="mr16 orange-bubble" position="topCenter">
          topCenter
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="leftCenter">
          leftCenter
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="rightCenter">
          rightCenter
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="bottomCenter">
          bottomCenter
        </Bubble>
      </div>

      <div className="mb16">
        <Bubble className="mr16 orange-bubble" position="topLeft">
          topLeft
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="topRight">
          topRight
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="bottomLeft">
          bottomLeft
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="bottomRight">
          bottomRight
        </Bubble>
      </div>

      <div className="mb16">
        <Bubble className="mr16 orange-bubble" position="leftTop">
          <div>leftTop</div>
          <div>leftTop</div>
          <div>leftTop</div>
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="rightTop">
          <div>rightTop</div>
          <div>rightTop</div>
          <div>rightTop</div>
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="leftBottom">
          <div>leftBottom</div>
          <div>leftBottom</div>
          <div>leftBottom</div>
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="rightBottom">
          <div>rightBottom</div>
          <div>rightBottom</div>
          <div>rightBottom</div>
        </Bubble>
      </div>
    </>
  );
};

export default () => <Bubble1 />;
