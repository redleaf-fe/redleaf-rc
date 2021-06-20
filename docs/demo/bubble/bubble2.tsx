import React from 'react';
import { Bubble } from 'redleaf-rc';

import '../../doc.less';

const Bubble2 = () => {
  return (
    <>
      <div className="mb16">
        修改小三角的大小：
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          triangleSize={12}
        >
          bottomCenter
        </Bubble>
        <Bubble className="mr16 orange-bubble" position="bottomCenter">
          bottomCenter
        </Bubble>
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          triangleSize={4}
        >
          bottomCenter
        </Bubble>
      </div>

      <div className="mb16">
        修改小三角的左右偏移：
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          leftOffset="4"
        >
          bottomCenter
        </Bubble>
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          leftOffset="0"
        >
          bottomCenter
        </Bubble>
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          leftOffset="-4"
        >
          bottomCenter
        </Bubble>
      </div>

      <div className="mb16">
        修改小三角的上下偏移：
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          topOffset="4"
        >
          bottomCenter
        </Bubble>
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          topOffset="0"
        >
          bottomCenter
        </Bubble>
        <Bubble
          className="mr16 orange-bubble"
          position="bottomCenter"
          topOffset="-4"
        >
          bottomCenter
        </Bubble>
      </div>
    </>
  );
};

export default () => <Bubble2 />;
