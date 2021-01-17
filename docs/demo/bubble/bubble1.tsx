import React from 'react';
import { Bubble } from 'redleaf-rc';

import '../../doc.less';

const Bubble1 = () => {
  document.body.style.setProperty('--bubble-bgColor', 'orange');
  return (
    <>
      <div className="mb16">
        <Bubble className="mr16" position="topCenter">
          topCenter
        </Bubble>
        <Bubble className="mr16" position="leftCenter">
          leftCenter
        </Bubble>
        <Bubble className="mr16" position="rightCenter">
          rightCenter
        </Bubble>
        <Bubble className="mr16" position="bottomCenter">
          bottomCenter
        </Bubble>
      </div>

      <div className="mb16">
        <Bubble className="mr16" position="topLeft">
          topLeft
        </Bubble>
        <Bubble className="mr16" position="topRight">
          topRight
        </Bubble>
        <Bubble className="mr16" position="bottomLeft">
          bottomLeft
        </Bubble>
        <Bubble className="mr16" position="bottomRight">
          bottomRight
        </Bubble>
      </div>

      <div className="mb16">
        <Bubble className="mr16" position="leftTop">
          <div>leftTop</div>
          <div>leftTop</div>
          <div>leftTop</div>
        </Bubble>
        <Bubble className="mr16" position="rightTop">
          <div>rightTop</div>
          <div>rightTop</div>
          <div>rightTop</div>
        </Bubble>
        <Bubble className="mr16" position="leftBottom">
          <div>leftBottom</div>
          <div>leftBottom</div>
          <div>leftBottom</div>
        </Bubble>
        <Bubble className="mr16" position="rightBottom">
          <div>rightBottom</div>
          <div>rightBottom</div>
          <div>rightBottom</div>
        </Bubble>
      </div>
    </>
  );
};

export default () => <Bubble1 />;
