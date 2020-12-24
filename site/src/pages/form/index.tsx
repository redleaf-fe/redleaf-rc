import React from "react";
import {CodeViewer} from "../../common";
import {useState, useRef} from "react";
import {Form, Input, Select, Button} from 'redleaf-rc';


// <!-- Form1 -->
const Form1 = ()=>{
  const form = useRef<any>({});
  return <Form getInstance={i => form.current = i}>
    <Form.Item name="user">
      <Input />
    </Form.Item>
    <Form.Item name="gender">
      <Select />
    </Form.Item>
    <Button onClick={()=>{
      console.log(form.current.getFields());
    }}>submit</Button>
  </Form>
};



export default class extends React.Component {
  render(){
    return (<><h2>Form</h2>
<h3 id="普通形式"># 普通形式</h3>
<CodeViewer source={`import {Form, Input, Select, Button} from 'redleaf-rc';

// --
// <!-- Form1 -->
const Form1 = ()=>{
  const form = useRef<any>({});
  return <Form getInstance={i => form.current = i}>
    <Form.Item name="user">
      <Input />
    </Form.Item>
    <Form.Item name="gender">
      <Select />
    </Form.Item>
    <Button onClick={()=>{
      console.log(form.current.getFields());
    }}>submit</Button>
  </Form>
};

// --
ReactDOM.render(
  <Form1 />,
  document.getElementById('root')
);`}><Form1 /></CodeViewer>
<h3 id="Form"># Form</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody></tbody>
</table>
<h3 id="css 变量"># css 变量</h3>
<table className="table">
<thead>
<tr><th>变量</th>
<th>说明</th></tr>
</thead>
<tbody></tbody>
</table>
<h3 id="特别说明"># 特别说明</h3>
<h3 id="todo"># todo</h3>
<span className="plain-text-md">label
必填标志
获取值
设置值
默认值
校验和报错，滚动到错误处
label
横竖布局
值变更回调
预置校验
自定义组件，onChange 和 value
在 input 等组件上挂 onChange 的兼容</span>
<div className="right-nav-contain"><a className="right-nav" href="#普通形式">普通形式</a>
<a className="right-nav" href="#Form">Form</a>
<a className="right-nav" href="#css 变量">css 变量</a>
<a className="right-nav" href="#特别说明">特别说明</a>
<a className="right-nav" href="#todo">todo</a></div></>)
  }
}