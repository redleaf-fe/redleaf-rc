import React from "react";
import { CodeViewer } from "../../common";
import { Message, Button } from "rhino-rc";

const Message1 = () => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        Message.show({ content: "message" });
      }}
    >
      <Button>click me</Button>
    </div>
  );
};

const Message2 = () => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        Message.show({ content: "message with key", key: "message with key" });
      }}
    >
      <Button>click me</Button>
    </div>
  );
};

const Message3 = () => {
  return (
    <>
      <div
        className="cursor-pointer mb8"
        onClick={() => {
          Message.config({ duration: "5000" });
          Message.show({ content: "display 5s" });
        }}
      >
        <Button>将message默认显示时间设置为5秒</Button>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          Message.show({ content: "display 15s", duration: 15000 });
        }}
      >
        <Button>这个message的显示时间设置为15秒</Button>
      </div>
    </>
  );
};

const Message4 = () => {
  let cnt = 0;
  return (
    <>
      <div
        className="cursor-pointer mb8"
        onClick={() => {
          const close = Message.show({
            content: (
              <div
                className="cursor-pointer"
                onClick={() => {
                  close?.();
                }}
              >
                <div className="mb8 font16">hand close {cnt++}</div>
                <div>
                  hand close hand close hand close hand close hand close hand
                  close hand close{" "}
                </div>
              </div>
            ),
            onClose: () => {
              console.log("关闭回调");
            },
          });
        }}
      >
        <Button>手动销毁1</Button>
      </div>
      <div
        className="cursor-pointer mb8"
        onClick={() => {
          Message.notify({
            content: (
              <div>
                <div className="mb8 font16">hand close {cnt++}</div>
                <div>
                  hand close hand close hand close hand close hand close hand
                  close hand close{" "}
                </div>
              </div>
            ),
            onClose: () => {
              console.log("关闭回调");
            },
          });
        }}
      >
        <Button>手动销毁2</Button>
      </div>
    </>
  );
};

const Message5 = () => {
  return (
    <>
      <div
        className="cursor-pointer mb8"
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
        <Button>默认</Button>
      </div>
      <div
        className="cursor-pointer mb8"
        onClick={() => {
          Message.show({
            content: (
              <div>
                <div className="mb8 font16">topLeft</div>
                <div>message position</div>
              </div>
            ),
            position: "topLeft",
          });
        }}
      >
        <Button>左上</Button>
      </div>
      <div
        className="cursor-pointer mb8"
        onClick={() => {
          Message.show({
            content: (
              <div>
                <div className="mb8 font16">topRight</div>
                <div>message position</div>
              </div>
            ),
            position: "topRight",
          });
        }}
      >
        <Button>右上</Button>
      </div>
      <div
        className="cursor-pointer mb8"
        onClick={() => {
          Message.show({
            content: (
              <div>
                <div className="mb8 font16">bottomLeft</div>
                <div>message position</div>
              </div>
            ),
            position: "bottomLeft",
          });
        }}
      >
        <Button>左下</Button>
      </div>
      <div
        className="cursor-pointer mb8"
        onClick={() => {
          Message.show({
            content: (
              <div>
                <div className="mb8 font16">bottomRight</div>
                <div>message position</div>
              </div>
            ),
            position: "bottomRight",
          });
        }}
      >
        <Button>右下</Button>
      </div>
    </>
  );
};

export default class extends React.Component {
  render() {
    return (
      <>
        <h2>Message</h2>
        <h3 id="基本使用"># 基本使用</h3>
        <CodeViewer
          source={`// <!-- Message1 -->
import {Message, Button} from 'rhino-rc';

// --
const Message1 = ()=>{
  return <div className="cursor-pointer" onClick={()=>{
    Message.show({content: 'message'})
  }}>
    <Button>click me</Button>
  </div>
};

// --
ReactDOM.render(
  <Message1 />,
  document.getElementById('root')
);`}
        >
          <Message1 />
        </CodeViewer>
        <h3 id="避免相同内容的message弹出多次">
          # 避免相同内容的message弹出多次
        </h3>
        <CodeViewer
          source={`// <!-- Message2 -->
import {Message, Button} from 'rhino-rc';

// --
const Message2 = ()=>{
  return <div className="cursor-pointer" onClick={()=>{
    Message.show({content: 'message with key', key: 'message with key'})
  }}>
    <Button>click me</Button>
  </div>
};

// --
ReactDOM.render(
  <Message2 />,
  document.getElementById('root')
);`}
        >
          <Message2 />
        </CodeViewer>
        <h3 id="设置显示时间"># 设置显示时间</h3>
        <span className="plain-text-md">
          单位ms，不传使用默认时间，传小于等于0的数或NaN不会自动销毁
        </span>
        <CodeViewer
          source={`// <!-- Message3 -->
import {Message, Button} from 'rhino-rc';

// --

const Message3 = ()=>{
  return <>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.config({duration: '5000'})
    Message.show({content: 'display 5s'})
  }}>
    <Button>将message默认显示时间设置为5秒</Button>
  </div>
  <div className="cursor-pointer" onClick={()=>{
    Message.show({content: 'display 15s', duration: 15000})
  }}>
    <Button>这个message的显示时间设置为15秒</Button>
  </div>
  </>
};

// --
ReactDOM.render(
  <Message3 />,
  document.getElementById('root')
);`}
        >
          <Message3 />
        </CodeViewer>
        <h3 id="手动销毁"># 手动销毁</h3>
        <span className="plain-text-md">
          show函数返回一个close函数，调用该函数可销毁Message
        </span>
        <br />
        <span className="plain-text-md">
          也可以使用notify，notify中使用了show函数，并增加了关闭按钮
        </span>
        <CodeViewer
          source={`// <!-- Message4 -->
import {Message, Button} from 'rhino-rc';

// --

const Message4 = ()=>{
  let cnt = 0;
  return <>
    <div className="cursor-pointer mb8" onClick={()=>{
      const close = Message.show({
        content: <div className="cursor-pointer" onClick={()=>{
          close?.()
        }}>
            <div className="mb8 font16">hand close {cnt++}</div>
            <div>hand close hand close hand close hand close hand close hand close hand close </div>
          </div>, 
        onClose: ()=>{
          console.log('关闭回调')
        }
      })
    }}>
      <Button>手动销毁1</Button>
    </div>
    <div className="cursor-pointer mb8" onClick={()=>{
      Message.notify({
        content: <div>
            <div className="mb8 font16">hand close {cnt++}</div>
            <div>hand close hand close hand close hand close hand close hand close hand close </div>
          </div>, 
        onClose: ()=>{
          console.log('关闭回调')
        }
      })
    }}>
      <Button>手动销毁2</Button>
    </div>
  </>
};

// --
ReactDOM.render(
  <Message4 />,
  document.getElementById('root')
);`}
        >
          <Message4 />
        </CodeViewer>
        <h3 id="位置"># 位置</h3>
        <CodeViewer
          source={`// <!-- Message5 -->
import {Message, Button} from 'rhino-rc';

// --

const Message5 = ()=>{
  return <>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">default</div>
          <div>message position</div>
        </div>, 
    })
  }}>
    <Button>默认</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">topLeft</div>
          <div>message position</div>
        </div>,
      position: 'topLeft'
    })
  }}>
    <Button>左上</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">topRight</div>
          <div>message position</div>
        </div>,
      position: 'topRight'
    })
  }}>
    <Button>右上</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">bottomLeft</div>
          <div>message position</div>
        </div>,
      position: 'bottomLeft'
    })
  }}>
    <Button>左下</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">bottomRight</div>
          <div>message position</div>
        </div>,
      position: 'bottomRight'
    })
  }}>
    <Button>右下</Button>
  </div>
  </>
};

// --
ReactDOM.render(
  <Message5 />,
  document.getElementById('root')
);`}
        >
          <Message5 />
        </CodeViewer>
        <h3 id="Message函数"># Message函数</h3>
        <table className="table">
          <thead>
            <tr>
              <th>函数</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>show</td>
              <td>
                显示Message，参数见下文，返回一个close函数，可用于销毁Message
              </td>
            </tr>
            <tr>
              <td>notify</td>
              <td>
                使用了show，并添加了关闭按钮，传入duration参数无效，notify使用show函数时传入的duration为0
              </td>
            </tr>
            <tr>
              <td>config</td>
              <td>用于设置Message展示的默认时间，参数duration</td>
            </tr>
          </tbody>
        </table>
        <h3 id="show函数的参数"># show函数的参数</h3>
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
              <td>content</td>
              <td>消息内容</td>
              <td>ReactNode</td>
              <td>无</td>
              <td>是</td>
            </tr>
            <tr>
              <td>duration</td>
              <td>
                消息展示的时间，单位ms，不传使用默认时间，传一个小于等于0的数或NaN不自动销毁
              </td>
              <td>string | number</td>
              <td>2000</td>
              <td>否</td>
            </tr>
            <tr>
              <td>key</td>
              <td>用于保证同内容的Message只弹出一次</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>position</td>
              <td>Message展示位置，不填默认在视口中上部展示</td>
              <td>"topLeft" | "topRight" | "bottomLeft" | "bottomRight"</td>
              <td>无</td>
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
              <td>--message-color</td>
              <td>消息内容文本颜色</td>
            </tr>
            <tr>
              <td>--message-bgColor</td>
              <td>消息内容背景颜色</td>
            </tr>
            <tr>
              <td>--message-box-shadow</td>
              <td>消息边框阴影颜色</td>
            </tr>
            <tr>
              <td>--message-close-color</td>
              <td>关闭按钮的图标的颜色</td>
            </tr>
          </tbody>
        </table>
        <div className="right-nav-contain">
          <a className="right-nav" href="#基本使用">
            基本使用
          </a>
          <a className="right-nav" href="#避免相同内容的message弹出多次">
            避免相同内容的message弹出多次
          </a>
          <a className="right-nav" href="#设置显示时间">
            设置显示时间
          </a>
          <a className="right-nav" href="#手动销毁">
            手动销毁
          </a>
          <a className="right-nav" href="#位置">
            位置
          </a>
          <a className="right-nav" href="#Message函数">
            Message函数
          </a>
          <a className="right-nav" href="#show函数的参数">
            show函数的参数
          </a>
          <a className="right-nav" href="#css变量">
            css变量
          </a>
        </div>
      </>
    );
  }
}
