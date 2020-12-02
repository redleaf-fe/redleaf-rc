import React from "react";
import {CodeViewer} from "../../common";
import {ResizeObserver} from 'redleaf-rc';



const ResizeObserver1 = ()=>{
  return <ResizeObserver onResize={entries=>{
    entries.forEach(entry => {
      console.log(entry);
    })
  }}>
    <div className="inline-block">123</div>
    <br />
    <div className="inline-block">123123</div>
    <br />
    <div className="inline-block">123123123</div>
  </ResizeObserver>
};



export default class extends React.Component {
  render(){
    return (<><h2>ResizeObserver</h2>
<h3 id="基本使用"># 基本使用</h3>
<CodeViewer source={`// <!-- ResizeObserver1 -->
import {ResizeObserver} from 'redleaf-rc';

// --

const ResizeObserver1 = ()=>{
  return <ResizeObserver onResize={entries=>{
    entries.forEach(entry => {
      console.log(entry);
    })
  }}>
    <div className="inline-block">123</div>
    <br />
    <div className="inline-block">123123</div>
    <br />
    <div className="inline-block">123123123</div>
  </ResizeObserver>
};

// --
ReactDOM.render(
  <ResizeObserver1 />,
  document.getElementById('root')
);`}><ResizeObserver1 /></CodeViewer>
<h3 id="ResizeObserver"># ResizeObserver</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>children</td>
<td>要监听大小变更的元素，只监听一层，不会往更深层遍历</td>
<td>ReactNode</td>
<td>无</td>
<td>是</td></tr>
<tr><td>onResize</td>
<td>大小变更时的回调函数，节流需要自己做</td>
<td>function(entries:ResizeObserverEntry[]):void</td>
<td>无</td>
<td>是</td></tr></tbody>
</table>
<h3 id="ResizeObserverEntry"># ResizeObserverEntry</h3>
<span className="plain-text-md">有若干属性，其中比较常用的是 target，contentRect 两个，target 是大小发生变化的元素，contentRect 是描述元素的宽高和位置信息</span>
<div className="right-nav-contain"><a className="right-nav" href="#基本使用">基本使用</a>
<a className="right-nav" href="#ResizeObserver">ResizeObserver</a>
<a className="right-nav" href="#ResizeObserverEntry">ResizeObserverEntry</a></div></>)
  }
}