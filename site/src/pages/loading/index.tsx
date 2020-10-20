import React from "react";
import {CodeViewer} from "../../common";
import {Loading} from 'redleaf-rc';


const Loading1 = ()=>{
  return <>
    <Loading />
  </>
};



const Loading2 = ()=>{
  return <>
    {/* 颜色按照css样式中一样写即可 */}
    <Loading className="mr8" color="red" />
    <Loading className="mr8" color="#0a0" />
    <Loading className="mr8" color="rgb(0 ,0, 200)" />

    <Loading className="mr8" size="25" />
    <Loading className="mr8" size={15} />
  </>
};



export default class extends React.Component {
  render(){
    return (<><h2>Loading</h2>
<h3 id="基本使用"># 基本使用</h3>
<CodeViewer source={`// <!-- Loading1 -->
import {Loading} from 'redleaf-rc';

// --
const Loading1 = ()=>{
  return <>
    <Loading />
  </>
};

// --
ReactDOM.render(
  <Loading1 />,
  document.getElementById('root')
);`}><Loading1 /></CodeViewer>
<h3 id="设置大小、颜色"># 设置大小、颜色</h3>
<CodeViewer source={`// <!-- Loading2 -->
import {Loading} from 'redleaf-rc';

// --
const Loading2 = ()=>{
  return <>
    {/* 颜色按照css样式中一样写即可 */}
    <Loading className="mr8" color="red" />
    <Loading className="mr8" color="#0a0" />
    <Loading className="mr8" color="rgb(0 ,0, 200)" />

    <Loading className="mr8" size="25" />
    <Loading className="mr8" size={15} />
  </>
};

// --
ReactDOM.render(
  <Loading2 />,
  document.getElementById('root')
);`}><Loading2 /></CodeViewer>
<h3 id="Loading"># Loading</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>className</td>
<td>类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>size</td>
<td>loading元素的大小</td>
<td>number | string</td>
<td>20</td>
<td>否</td></tr>
<tr><td>color</td>
<td>loading元素的颜色</td>
<td>string(同css中的颜色值)</td>
<td>'#333'</td>
<td>否</td></tr></tbody>
</table>
<div className="right-nav-contain"><a className="right-nav" href="#基本使用">基本使用</a>
<a className="right-nav" href="#设置大小、颜色">设置大小、颜色</a>
<a className="right-nav" href="#Loading">Loading</a></div></>)
  }
}