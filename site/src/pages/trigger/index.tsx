import React from "react";
import {CodeViewer} from "../../common";
import {useState} from 'react';
import {Trigger, Button, Bubble} from 'redleaf-rc';


const Popover1 = ()=>{
  document.body.style.setProperty('--bubble-bgColor', 'orange');
  return <>
    <Trigger
      className="mr8"
      type="hover"
      topOffset="-8"
      content={<Bubble>121323123</Bubble>}>
      <Button>Hover me</Button>
    </Trigger>
    <Trigger
      type="click"
      topOffset={-8}
      content={<Bubble>121323123</Bubble>}>
      <Button>Click me</Button>
    </Trigger>
  </>
};



const Popover2 = ()=>{
  const [show, setShow] = useState(false)
  return <>
    <div className="mb8">
      <Trigger
        type="hover"
        topOffset="-8"
        visible={show}
        content={<Bubble>121323123</Bubble>}>
        <Button>under control</Button>
      </Trigger>
    </div>
    <Button className="mr8" onClick={()=>setShow(true)}>show</Button>
    <Button onClick={()=>setShow(false)}>hide</Button>
  </>
};



const Popover3 = ()=>{
  return <>
    <div className="mb16">
      <Trigger
        className="mr16"
        position="topCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>topCenter</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="bottomCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>bottomCenter</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="leftCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>leftCenter</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="rightCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>rightCenter</Button>
      </Trigger>
    </div>

    <div className="mb16">
      <Trigger
        className="mr16"
        position="topLeft"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>topLeft</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="topRight"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>topRight</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="bottomLeft"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>bottomLeft</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="bottomRight"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>bottomRight</Button>
      </Trigger>
    </div>

    <div className="mb16">
      <Trigger
        className="mr16"
        position="leftTop"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>leftTop</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="leftBottom"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>leftBottom</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="rightTop"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>rightTop</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="rightBottom"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>rightBottom</Button>
      </Trigger>
    </div>
  </>
};



export default class extends React.Component {
  render(){
    return (<><h2>Trigger</h2>
<h3 id="基本使用"># 基本使用</h3>
<span className="plain-text-md">例子中对 content 使用了 Bubble 组件，也可以不用 Bubble 组件包裹，自定义 content 展示样式</span>
<br />
<CodeViewer source={`// <!-- Popover1 -->
import {Trigger, Button, Bubble} from 'redleaf-rc';

// --
const Popover1 = ()=>{
  document.body.style.setProperty('--bubble-bgColor', 'orange');
  return <>
    <Trigger
      className="mr8"
      type="hover"
      topOffset="-8"
      content={<Bubble>121323123</Bubble>}>
      <Button>Hover me</Button>
    </Trigger>
    <Trigger
      type="click"
      topOffset={-8}
      content={<Bubble>121323123</Bubble>}>
      <Button>Click me</Button>
    </Trigger>
  </>
};

// --
ReactDOM.render(
  <Popover1 />,
  document.getElementById('root')
);`}><Popover1 /></CodeViewer>
<h3 id="手动控制 content 显示隐藏"># 手动控制 content 显示隐藏</h3>
<CodeViewer source={`// <!-- Popover2 -->
import {Trigger, Button, Bubble} from 'redleaf-rc';

// --
const Popover2 = ()=>{
  const [show, setShow] = useState(false)
  return <>
    <div className="mb8">
      <Trigger
        type="hover"
        topOffset="-8"
        visible={show}
        content={<Bubble>121323123</Bubble>}>
        <Button>under control</Button>
      </Trigger>
    </div>
    <Button className="mr8" onClick={()=>setShow(true)}>show</Button>
    <Button onClick={()=>setShow(false)}>hide</Button>
  </>
};

// --
ReactDOM.render(
  <Popover2 />,
  document.getElementById('root')
);`}><Popover2 /></CodeViewer>
<h3 id="十二种位置"># 十二种位置</h3>
<span className="plain-text-md">取值和 Bubble 组件一致</span>
<br />
<span className="plain-text-md">这里没有再用 Bubble 组件展示，为了防止 Bubble 的箭头影响判断，这里的位置指的是 Trigger 包裹的子组件为基准，content 向基准对齐</span>
<br />
<CodeViewer source={`// <!-- Popover3 -->
import {Trigger, Button} from 'redleaf-rc';

// --
const Popover3 = ()=>{
  return <>
    <div className="mb16">
      <Trigger
        className="mr16"
        position="topCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>topCenter</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="bottomCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>bottomCenter</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="leftCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>leftCenter</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="rightCenter"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>rightCenter</Button>
      </Trigger>
    </div>

    <div className="mb16">
      <Trigger
        className="mr16"
        position="topLeft"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>topLeft</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="topRight"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>topRight</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="bottomLeft"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>bottomLeft</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="bottomRight"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>bottomRight</Button>
      </Trigger>
    </div>

    <div className="mb16">
      <Trigger
        className="mr16"
        position="leftTop"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>leftTop</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="leftBottom"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>leftBottom</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="rightTop"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>rightTop</Button>
      </Trigger>
      <Trigger
        className="mr16"
        position="rightBottom"
        content={<div className="border-1px-black bg-white">121323123asdasdasd</div>}>
        <Button>rightBottom</Button>
      </Trigger>
    </div>
  </>
};

// --
ReactDOM.render(
  <Popover3 />,
  document.getElementById('root')
);`}><Popover3 /></CodeViewer>
<h3 id="Popover"># Popover</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>contentClassName</td>
<td>popover 包裹子组件的容器的类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>className</td>
<td>popover 外层容器类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>type</td>
<td>触发类型</td>
<td>"hover" | "click"</td>
<td>"hover"</td>
<td>否</td></tr>
<tr><td>onHide</td>
<td>content 隐藏时的回调</td>
<td>function(): void</td>
<td>无</td>
<td>否</td></tr>
<tr><td>onVisible</td>
<td>content 显示时的回调</td>
<td>function(): void</td>
<td>无</td>
<td>否</td></tr>
<tr><td>children</td>
<td>popover 包裹的子组件</td>
<td>ReactNode</td>
<td>无</td>
<td>是</td></tr>
<tr><td>content</td>
<td>popover 显示的内容</td>
<td>ReactNode</td>
<td>无</td>
<td>是</td></tr>
<tr><td>position</td>
<td>content 显示位置</td>
<td>"topCenter" |<br/> "leftCenter" |<br/> "rightCenter" |<br/> "bottomCenter" |<br/> "topLeft" |<br/> "topRight" |<br/> "bottomLeft" |<br/> "bottomRight" |<br/> "leftTop" |<br/> "leftBottom" |<br/> "rightTop" |<br/> "rightBottom"</td>
<td>"topCenter"</td>
<td>否</td></tr>
<tr><td>visible</td>
<td>控制 content 是否展示</td>
<td>boolean</td>
<td>无</td>
<td>否</td></tr>
<tr><td>leftOffset</td>
<td>content 的横向偏移，负数表示向左偏移，正数表示向右偏移</td>
<td>string | number</td>
<td>'0px'</td>
<td>否</td></tr>
<tr><td>topOffset</td>
<td>content 的纵向偏移，负数表示向上偏移，正数表示向下偏移</td>
<td>string | number</td>
<td>'0px'</td>
<td>否</td></tr></tbody>
</table>
<h3 id="css 变量"># css 变量</h3>
<table className="table">
<thead>
<tr><th>变量</th>
<th>说明</th></tr>
</thead>
<tbody><tr><td>--popover-z-index</td>
<td>content 的 z-index</td></tr></tbody>
</table>
<h3 id="特别说明"># 特别说明</h3>
<span className="plain-text-md">leftOffset 和 topOffset 可以设置成带 px 的值，比如&quot;10px&quot;，也可以设置成单独的数字和字符串，比如 12 和&quot;12&quot;，也可以设置百分比，比如&quot;50%&quot;，但是要注意，trigger 的弹出层挂在 doucument.body 上面，所以百分比是相对于 doucument.body 的。</span>
<br />
<span className="plain-text-md">leftOffset 和 topOffset 是用在 calc()中的，所以理论上 css 支持的单位都可以传</span>
<div className="right-nav-contain"><a className="right-nav" href="#基本使用">基本使用</a>
<a className="right-nav" href="#手动控制 content 显示隐藏">手动控制 content 显示隐藏</a>
<a className="right-nav" href="#十二种位置">十二种位置</a>
<a className="right-nav" href="#Popover">Popover</a>
<a className="right-nav" href="#css 变量">css 变量</a>
<a className="right-nav" href="#特别说明">特别说明</a></div></>)
  }
}