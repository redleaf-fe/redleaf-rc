import React from "react";
import { CodeViewer } from "../../common";
import { useState } from "react";
import { Button, Message } from "rhino-rc";

// <!-- Button1 -->
const Button1 = () => {
  return (
    <>
      <Button
        className="mr8"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        按钮
      </Button>
      <Button
        className="mr8"
        type="default"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        type="primary"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        type="success"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        绿色
      </Button>
      <Button
        className="mr8"
        type="danger"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        红色
      </Button>
      <Button
        className="mr8"
        type="danger"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        <div>这是一个div包裹的按钮</div>
      </Button>
    </>
  );
};

// <!-- Button2 -->
const Button2 = () => {
  return (
    <>
      <Button
        className="mr8"
        bordered
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        按钮
      </Button>
      <Button
        className="mr8"
        bordered
        type="default"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        bordered
        type="primary"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        bordered
        type="success"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        绿色
      </Button>
      <Button
        className="mr8"
        bordered
        type="danger"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        红色
      </Button>
    </>
  );
};

// <!-- Button3 -->
const Button3 = () => {
  return (
    <>
      <Button
        className="mr8"
        disabled
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        按钮
      </Button>
      <Button
        className="mr8"
        disabled
        type="default"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        disabled
        type="primary"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        disabled
        type="success"
        onClick={() => Message.show({ content: "按下按钮" })}
      >
        绿色
      </Button>
      {/* 注意这最后一个 */}
      <Button
        className="mr8"
        disabled
        type="danger"
        onMouseDown={() => Message.show({ content: "按下按钮" })}
      >
        我是可以点击成功的，不信你试试
      </Button>
    </>
  );
};

// <!-- Button4 -->
const Button4 = () => {
  const [active, setActive] = useState(1);
  const getActive = (val: number) => (active === val ? "primary" : "default");

  return (
    <Button.Group>
      <Button type={getActive(1)} onClick={() => setActive(1)}>
        11
      </Button>
      <Button type={getActive(2)} onClick={() => setActive(2)}>
        22
      </Button>
      <Button type={getActive(3)} onClick={() => setActive(3)}>
        33
      </Button>
    </Button.Group>
  );
};

export default class extends React.Component {
  render() {
    return (
      <>
        <h2>Button</h2>
        <h3 id="普通形式"># 普通形式</h3>
        <CodeViewer
          source={`import {Button, Message} from 'rhino-rc';

// --
// <!-- Button1 -->
const Button1 = ()=>{
  return <>
    <Button className="mr8" onClick={()=>Message.show({content: '按下按钮'})}>按钮</Button>
    <Button className="mr8" type="default" onClick={()=>Message.show({content: '按下按钮'})}>默认</Button>
    <Button className="mr8" type="primary" onClick={()=>Message.show({content: '按下按钮'})}>蓝色</Button>
    <Button className="mr8" type="success" onClick={()=>Message.show({content: '按下按钮'})}>绿色</Button>
    <Button className="mr8" type="danger" onClick={()=>Message.show({content: '按下按钮'})}>红色</Button>
    <Button className="mr8" type="danger" onClick={()=>Message.show({content: '按下按钮'})}>
      <div>这是一个div包裹的按钮</div>
    </Button>
  </>
};

// --
ReactDOM.render(
  <Button1 />,
  document.getElementById('root')
);`}
        >
          <Button1 />
        </CodeViewer>
        <h3 id="边框形式"># 边框形式</h3>
        <CodeViewer
          source={`import {Button, Message} from 'rhino-rc';

// --
// <!-- Button2 -->
const Button2 = ()=>{
  return <>
    <Button className="mr8" bordered onClick={()=>Message.show({content: '按下按钮'})}>按钮</Button>
    <Button className="mr8" bordered type="default" onClick={()=>Message.show({content: '按下按钮'})}>默认</Button>
    <Button className="mr8" bordered type="primary" onClick={()=>Message.show({content: '按下按钮'})}>蓝色</Button>
    <Button className="mr8" bordered type="success" onClick={()=>Message.show({content: '按下按钮'})}>绿色</Button>
    <Button className="mr8" bordered type="danger" onClick={()=>Message.show({content: '按下按钮'})}>红色</Button>
  </>
};

// --
ReactDOM.render(
  <Button2 />,
  document.getElementById('root')
);`}
        >
          <Button2 />
        </CodeViewer>
        <h3 id="禁用状态"># 禁用状态</h3>
        <CodeViewer
          source={`import {Button, Message} from 'rhino-rc';

// --
// <!-- Button3 -->
const Button3 = ()=>{
  return <>
    <Button className="mr8" disabled onClick={()=>Message.show({content: '按下按钮'})}>按钮</Button>
    <Button className="mr8" disabled type="default" onClick={()=>Message.show({content: '按下按钮'})}>默认</Button>
    <Button className="mr8" disabled type="primary" onClick={()=>Message.show({content: '按下按钮'})}>蓝色</Button>
    <Button className="mr8" disabled type="success" onClick={()=>Message.show({content: '按下按钮'})}>绿色</Button>
    {/* 注意这最后一个 */}
    <Button className="mr8" disabled type="danger" onMouseDown={()=>Message.show({content: '按下按钮'})}>我是可以点击成功的，不信你试试</Button>
  </>
};

// --
ReactDOM.render(
  <Button3 />,
  document.getElementById('root')
);`}
        >
          <Button3 />
        </CodeViewer>
        <h3 id="按钮组"># 按钮组</h3>
        <CodeViewer
          source={`import {Button} from 'rhino-rc';

// --
// <!-- Button4 -->
const Button4 = ()=>{
  const [active, setActive] = useState(1);
  const getActive = (val: number) => active === val ? 'primary' : 'default';

  return <Button.Group>
    <Button type={getActive(1)} onClick={()=>setActive(1)}>11</Button>
    <Button type={getActive(2)} onClick={()=>setActive(2)}>22</Button>
    <Button type={getActive(3)} onClick={()=>setActive(3)}>33</Button>
  </Button.Group>
};

// --
ReactDOM.render(
  <Button4 />,
  document.getElementById('root')
);`}
        >
          <Button4 />
        </CodeViewer>
        <h3 id="Button"># Button</h3>
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
              <td>children</td>
              <td>按钮显示的内容</td>
              <td>ReactNode</td>
              <td>无</td>
              <td>是</td>
            </tr>
            <tr>
              <td>className</td>
              <td>按钮的类名</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>禁用状态</td>
              <td>boolean</td>
              <td>false</td>
              <td>否</td>
            </tr>
            <tr>
              <td>type</td>
              <td>按钮颜色</td>
              <td>'primary' | 'danger' | 'success' | 'default'</td>
              <td>'primary'</td>
              <td>否</td>
            </tr>
            <tr>
              <td>bordered</td>
              <td>边框形式</td>
              <td>boolean</td>
              <td>false</td>
              <td>否</td>
            </tr>
          </tbody>
        </table>
        <h3 id="Button.Group"># Button.Group</h3>
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
              <td>children</td>
              <td>按钮组内的内容</td>
              <td>ReactNode</td>
              <td>无</td>
              <td>是</td>
            </tr>
            <tr>
              <td>className</td>
              <td>按钮组的类名</td>
              <td>string</td>
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
              <td>--default-button-color</td>
              <td>默认按钮字体颜色</td>
            </tr>
            <tr>
              <td>--colors-button-color</td>
              <td>非默认（primary、danger、success）按钮字体颜色</td>
            </tr>
            <tr>
              <td>--default-button-bgColor</td>
              <td>默认按钮背景颜色</td>
            </tr>
            <tr>
              <td>--primary-button-bgColor</td>
              <td>primary按钮背景颜色</td>
            </tr>
            <tr>
              <td>--success-button-bgColor</td>
              <td>success按钮背景颜色</td>
            </tr>
            <tr>
              <td>--danger-button-bgColor</td>
              <td>danger按钮背景颜色</td>
            </tr>
            <tr>
              <td>--default-button-border-color</td>
              <td>默认按钮边框颜色</td>
            </tr>
            <tr>
              <td>--disabled-button-bgColor</td>
              <td>禁用状态背景颜色</td>
            </tr>
            <tr>
              <td>--disabled-button-color</td>
              <td>禁用状态字体颜色</td>
            </tr>
            <tr>
              <td>--disabled-button-border-color</td>
              <td>禁用状态边框颜色</td>
            </tr>
            <tr>
              <td>--button-font-size</td>
              <td>按钮字体大小</td>
            </tr>
          </tbody>
        </table>
        <h3 id="特别说明"># 特别说明</h3>
        <span className="plain-text-md">
          disabled中只处理了onClick事件，如果使用onMouseDown等事件，仍会执行
        </span>
        <br />
        <div className="right-nav-contain">
          <a className="right-nav" href="#普通形式">
            普通形式
          </a>
          <a className="right-nav" href="#边框形式">
            边框形式
          </a>
          <a className="right-nav" href="#禁用状态">
            禁用状态
          </a>
          <a className="right-nav" href="#按钮组">
            按钮组
          </a>
          <a className="right-nav" href="#Button">
            Button
          </a>
          <a className="right-nav" href="#Button.Group">
            Button.Group
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
