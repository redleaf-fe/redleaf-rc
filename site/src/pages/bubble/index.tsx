import React from "react";
import { CodeViewer } from "../../common";
import { Bubble } from "rhino-rc";

const Bubble1 = () => {
  document.body.style.setProperty("--bubble-bgColor", "orange");
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
        </Bubble>
        <Bubble className="mr16" position="rightTop">
          <div>rightTop</div>
          <div>rightTop</div>
        </Bubble>
        <Bubble className="mr16" position="leftBottom">
          <div>leftBottom</div>
          <div>leftBottom</div>
        </Bubble>
        <Bubble className="mr16" position="rightBottom">
          <div>rightBottom</div>
          <div>rightBottom</div>
        </Bubble>
      </div>
    </>
  );
};

const Bubble2 = () => {
  return (
    <>
      <div className="mb16">
        <Bubble position="topCenter">topCenter</Bubble>
      </div>

      <div className="mb16">
        修改小三角的大小：
        <Bubble className="mr16" position="topCenter" triangleSize="12">
          topCenter
        </Bubble>
        <Bubble className="mr16" position="topCenter" triangleSize="4">
          topCenter
        </Bubble>
      </div>

      <div className="mb16">
        修改小三角的左右偏移：
        <Bubble className="mr16" position="topCenter" leftOffset="20">
          topCenter
        </Bubble>
        <Bubble className="mr16" position="topCenter" leftOffset="-20">
          topCenter
        </Bubble>
      </div>

      <div className="mb16">
        修改小三角的上下偏移：
        <Bubble className="mr16" position="topCenter" topOffset="4">
          topCenter
        </Bubble>
        <Bubble className="mr16" position="topCenter" topOffset="-4">
          topCenter
        </Bubble>
      </div>
    </>
  );
};

export default class extends React.Component {
  render() {
    return (
      <>
        <h2>Bubble</h2>
        <span className="plain-text-md">
          气泡，下面的例子中为了显示明显，设置了css变量--bubble-bgColor为orange
        </span>
        <br />
        <h3 id="基本使用"># 基本使用</h3>
        <CodeViewer
          source={`// <!-- Bubble1 -->
import {Bubble} from 'rhino-rc';

// --

const Bubble1 = ()=>{
  document.body.style.setProperty('--bubble-bgColor', 'orange');
  return <>
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
      </Bubble>
      <Bubble className="mr16" position="rightTop">
        <div>rightTop</div>
        <div>rightTop</div>
      </Bubble>
      <Bubble className="mr16" position="leftBottom">
        <div>leftBottom</div>
        <div>leftBottom</div>
      </Bubble>
      <Bubble className="mr16" position="rightBottom">
        <div>rightBottom</div>
        <div>rightBottom</div>
      </Bubble>
    </div>
  </>
};

// --
ReactDOM.render(
  <Bubble1 />,
  document.getElementById('root')
);`}
        >
          <Bubble1 />
        </CodeViewer>
        <h3 id="设置小三角和大小和偏移量"># 设置小三角和大小和偏移量</h3>
        <CodeViewer
          source={`// <!-- Bubble2 -->
import {Bubble} from 'rhino-rc';

// --
const Bubble2 = ()=>{
  return <>
    <div className="mb16">
      <Bubble position="topCenter">
        topCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的大小：
      <Bubble className="mr16" position="topCenter" triangleSize="12">
        topCenter
      </Bubble>
      <Bubble className="mr16" position="topCenter" triangleSize="4">
        topCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的左右偏移：
      <Bubble className="mr16" position="topCenter" leftOffset="20">
        topCenter
      </Bubble>
      <Bubble className="mr16" position="topCenter" leftOffset="-20">
        topCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的上下偏移：
      <Bubble className="mr16" position="topCenter" topOffset="4">
        topCenter
      </Bubble>
      <Bubble className="mr16" position="topCenter" topOffset="-4">
        topCenter
      </Bubble>
    </div>
  </>
};

// --
ReactDOM.render(
  <Bubble2 />,
  document.getElementById('root')
);`}
        >
          <Bubble2 />
        </CodeViewer>
        <h3 id="Bubble"># Bubble</h3>
        <table className="table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
              <th>必填</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>className</td>
              <td>气泡外层容器类名</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>triClassName</td>
              <td>气泡小三角类名</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>contentClassName</td>
              <td>气泡内容容器类名</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>children</td>
              <td>气泡内容</td>
              <td>ReactNode</td>
              <td>无</td>
              <td>是</td>
            </tr>
            <tr>
              <td>position</td>
              <td>气泡方向</td>
              <td>
                "topCenter" |<br /> "leftCenter" |<br /> "rightCenter" |<br />{" "}
                "bottomCenter" |<br /> "topLeft" |<br /> "topRight" |<br />{" "}
                "bottomLeft" |<br /> "bottomRight" |<br /> "leftTop" |<br />{" "}
                "leftBottom" |<br /> "rightTop" |<br /> "rightBottom"
              </td>
              <td>"bottomCenter"</td>
              <td>否</td>
            </tr>
            <tr>
              <td>triangleSize</td>
              <td>气泡小三角的大小</td>
              <td>string | number</td>
              <td>8</td>
              <td>否</td>
            </tr>
            <tr>
              <td>leftOffset</td>
              <td>气泡小三角的横向偏移，负数表示向左偏移，正数表示向右偏移</td>
              <td>string | number</td>
              <td>'0px'</td>
              <td>否</td>
            </tr>
            <tr>
              <td>topOffset</td>
              <td>气泡小三角的纵向偏移，负数表示向上偏移，正数表示向下偏移</td>
              <td>string | number</td>
              <td>'0px'</td>
              <td>否</td>
            </tr>
          </tbody>
        </table>
        <h3 id="css变量"># css变量</h3>
        <table className="table">
          <thead>
            <tr>
              <th>变量</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>--bubble-text-color</td>
              <td>气泡内文本颜色</td>
            </tr>
            <tr>
              <td>--bubble-bgColor</td>
              <td>气泡背景颜色（包含小三角的颜色）</td>
            </tr>
            <tr>
              <td>--bubble-box-shadow</td>
              <td>气泡阴影</td>
            </tr>
            <tr>
              <td>--bubble-padding</td>
              <td>气泡的padding</td>
            </tr>
            <tr>
              <td>--bubble-border-radius</td>
              <td>气泡圆角大小</td>
            </tr>
          </tbody>
        </table>
        <h3 id="特别说明"># 特别说明</h3>
        <span className="plain-text-md">
          如果设置了气泡外层容器的display属性为block，可能导致小三角的位置偏移
        </span>
        <br />
        <span className="plain-text-md">
          leftOffset和topOffset还可以设置百分比，比如&quot;50%&quot;，也可以设置成带px的值，比如&quot;10px&quot;，也可以设置成单独的数字和字符串，比如12和&quot;12&quot;；
        </span>
        <br />
        <span className="plain-text-md">
          triangleSize只能设置成单独的数字和字符串；
        </span>
        <div className="right-nav-contain">
          <a className="right-nav" href="#基本使用">
            基本使用
          </a>
          <a className="right-nav" href="#设置小三角和大小和偏移量">
            设置小三角和大小和偏移量
          </a>
          <a className="right-nav" href="#Bubble">
            Bubble
          </a>
          <a className="right-nav" href="#css变量">
            css变量
          </a>
          <a className="right-nav" href="#特别说明">
            特别说明
          </a>
        </div>
      </>
    );
  }
}
