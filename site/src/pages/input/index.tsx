import React from "react";
import {CodeViewer} from "../../common";
import {useState} from "react";
import {Input, Button} from 'redleaf-rc';


function genString(){
  const idx = Math.ceil(Math.random()*8);
  const val = '123456789'.slice(idx, idx+3);
  return val;
}

const Input1 = ()=>{
  const [inputVal, setInputVal] = useState('init');
  const [inputVal2, setInputVal2] = useState('disabled');
  const [inputVal3, setInputVal3] = useState('readOnly');
  return <>
    <div className="mb8">
      受控：
      <Input 
        className="mr8" 
        value={inputVal} 
        onChange={(e, value)=>{
          console.log(e.target.value, value);
        }} />
      <Button onClick={()=>{
        setInputVal(genString());
      }}>设置内容</Button>
    </div>

    <div className="mb8">
      非受控：
      <Input 
        placeholder="请输入"
        onChange={(e, value)=>{
          console.log(e.target.value, value);
        }} />
    </div>

    <div className="mb8">
      禁用：
      <Input 
        className="mr8" 
        disabled 
        value={inputVal2} 
        onChange={(e)=>{
          console.log(e.target.value);
        }} />
      <Button onClick={()=>{
        setInputVal2(genString());
      }}>设置内容</Button>
    </div>

    <div className="mb8">
      只读：
      <Input 
        className="mr8" 
        readOnly 
        value={inputVal3} 
        onChange={(e)=>{
          console.log(e.target.value);
        }} />
      <Button onClick={()=>{
        setInputVal3(genString());
      }}>设置内容</Button>
    </div>

    <div className="mb8">
      限制输入的最大长度：
      <Input showCount maxLength={30} onChange={(e)=>{
          console.log(e.target.value);
        }} />
    </div>
  </>
};



const Input2 = ()=>{
  return <>
    <div className="mb8">
      <Input type="password" placeholder="输入密码" />
    </div>
    <div className="mb8">
      <Input type="int" placeholder="输入整数" />
    </div>
  </>
};



const Input3 = ()=>{
  const [inputVal, setInputVal] = useState('multi');
  const [inputVal2, setInputVal2] = useState('disable');
  return <>
    <div className="mb8">
      受控：
      <Input 
        className="mr8"
        value={inputVal}
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e)=>{
          console.log(e.target.value);
        }}
      />
      <Button onClick={()=>{
        setInputVal(genString());
      }}>设置内容</Button>
    </div>
    <div className="mb8">
      非受控，设置高度：
      <Input 
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e)=>{
          console.log(e.target.value);
        }}
        rows={6}
        showCount
        maxLength={150}
      />
    </div>
    <div className="mb8">
      禁用：
      <Input 
        className="mr8"
        disabled
        value={inputVal2}
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e)=>{
          console.log(e.target.value);
        }}
      />
      <Button onClick={()=>{
        setInputVal2(genString());
      }}>设置内容</Button>
    </div>
  </>
};



export default class extends React.Component {
  render(){
    return (<><h2>Input</h2>
<h3 id="基本使用"># 基本使用</h3>
<CodeViewer source={`// <!-- Input1 -->
import {Input} from 'redleaf-rc';

// --
function genString(){
  const idx = Math.ceil(Math.random()*8);
  const val = '123456789'.slice(idx, idx+3);
  return val;
}

const Input1 = ()=>{
  const [inputVal, setInputVal] = useState('init');
  const [inputVal2, setInputVal2] = useState('disabled');
  const [inputVal3, setInputVal3] = useState('readOnly');
  return <>
    <div className="mb8">
      受控：
      <Input 
        className="mr8" 
        value={inputVal} 
        onChange={(e, value)=>{
          console.log(e.target.value, value);
        }} />
      <Button onClick={()=>{
        setInputVal(genString());
      }}>设置内容</Button>
    </div>

    <div className="mb8">
      非受控：
      <Input 
        placeholder="请输入"
        onChange={(e, value)=>{
          console.log(e.target.value, value);
        }} />
    </div>

    <div className="mb8">
      禁用：
      <Input 
        className="mr8" 
        disabled 
        value={inputVal2} 
        onChange={(e)=>{
          console.log(e.target.value);
        }} />
      <Button onClick={()=>{
        setInputVal2(genString());
      }}>设置内容</Button>
    </div>

    <div className="mb8">
      只读：
      <Input 
        className="mr8" 
        readOnly 
        value={inputVal3} 
        onChange={(e)=>{
          console.log(e.target.value);
        }} />
      <Button onClick={()=>{
        setInputVal3(genString());
      }}>设置内容</Button>
    </div>

    <div className="mb8">
      限制输入的最大长度：
      <Input showCount maxLength={30} onChange={(e)=>{
          console.log(e.target.value);
        }} />
    </div>
  </>
};

// --
ReactDOM.render(
  <Input1 />,
  document.getElementById('root')
);`}><Input1 /></CodeViewer>
<h3 id="密码输入、整数输入"># 密码输入、整数输入</h3>
<CodeViewer source={`// <!-- Input2 -->
import {Input} from 'redleaf-rc';

// --
const Input2 = ()=>{
  return <>
    <div className="mb8">
      <Input type="password" placeholder="输入密码" />
    </div>
    <div className="mb8">
      <Input type="int" placeholder="输入整数" />
    </div>
  </>
};

// --
ReactDOM.render(
  <Input2 />,
  document.getElementById('root')
);`}><Input2 /></CodeViewer>
<h3 id="多行输入"># 多行输入</h3>
<CodeViewer source={`// <!-- Input3 -->
import {Input} from 'redleaf-rc';

// --
const Input3 = ()=>{
  const [inputVal, setInputVal] = useState('multi');
  const [inputVal2, setInputVal2] = useState('disable');
  return <>
    <div className="mb8">
      受控：
      <Input 
        className="mr8"
        value={inputVal}
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e)=>{
          console.log(e.target.value);
        }}
      />
      <Button onClick={()=>{
        setInputVal(genString());
      }}>设置内容</Button>
    </div>
    <div className="mb8">
      非受控，设置高度：
      <Input 
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e)=>{
          console.log(e.target.value);
        }}
        rows={6}
        showCount
        maxLength={150}
      />
    </div>
    <div className="mb8">
      禁用：
      <Input 
        className="mr8"
        disabled
        value={inputVal2}
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e)=>{
          console.log(e.target.value);
        }}
      />
      <Button onClick={()=>{
        setInputVal2(genString());
      }}>设置内容</Button>
    </div>
  </>
};

// --
ReactDOM.render(
  <Input3 />,
  document.getElementById('root')
);`}><Input3 /></CodeViewer>
<h3 id="Input"># Input</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>className</td>
<td>输入框容器类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>inputClassName</td>
<td>输入框类名（textarea也适用）</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>type</td>
<td>输入框类型</td>
<td>"text" | "password" | "textarea" | "int"</td>
<td>"text"</td>
<td>否</td></tr>
<tr><td>disabled</td>
<td>禁用状态</td>
<td>boolean</td>
<td>false</td>
<td>否</td></tr>
<tr><td>maxLength</td>
<td>可输入的最大长度</td>
<td>string | number</td>
<td>无</td>
<td>否</td></tr>
<tr><td>value</td>
<td>输入框里的内容（受控）</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>onChange</td>
<td>输入框里的内容变化时的回调</td>
<td>function(e: ChangeEvent, value: string): void</td>
<td>无</td>
<td>否</td></tr>
<tr><td>showCount</td>
<td>显示输入内容的长度（需要同时设置maxLength属性才会显示）</td>
<td>boolean</td>
<td>false</td>
<td>否</td></tr>
<tr><td>rows</td>
<td>多行输入框的行数（高度）</td>
<td>string | number</td>
<td>3</td>
<td>否</td></tr></tbody>
</table>
<h3 id="css变量"># css变量</h3>
<table className="table">
<thead>
<tr><th>变量</th>
<th>说明</th></tr>
</thead>
<tbody><tr><td>--input-color</td>
<td>输入框文本颜色</td></tr>
<tr><td>--input-border</td>
<td>输入框边框样式</td></tr>
<tr><td>--input-bgColor</td>
<td>输入框背景色</td></tr>
<tr><td>--disabled-input-color</td>
<td>输入框禁用状态文本颜色</td></tr>
<tr><td>--disabled-input-border</td>
<td>输入框禁用状态边框样式</td></tr>
<tr><td>--disabled-input-bgColor</td>
<td>输入框禁用状态背景色</td></tr>
<tr><td>--input-width</td>
<td>输入框宽度</td></tr>
<tr><td>--input-font-size</td>
<td>输入框字体大小</td></tr>
<tr><td>--input-line-height</td>
<td>输入框行高</td></tr>
<tr><td>--input-border-radius</td>
<td>输入框圆角大小</td></tr>
<tr><td>--input-padding</td>
<td>输入框padding</td></tr>
<tr><td>--input-vertical-align</td>
<td>纵向对齐样式</td></tr>
<tr><td>--textarea-font-size</td>
<td>多行输入框字体大小</td></tr>
<tr><td>--textarea-line-height</td>
<td>多行输入框行高</td></tr>
<tr><td>--textarea-resize</td>
<td>多行输入框是否带调整大小功能（resize属性）</td></tr></tbody>
</table>
<h3 id="特别说明"># 特别说明</h3>
<span className="plain-text-md">input和textarea原生支持的属性，如placeholder等，都可以使用</span>
<br />
<span className="plain-text-md">showCount只有设置了maxLength的时候才生效</span>
<div className="right-nav-contain"><a className="right-nav" href="#基本使用">基本使用</a>
<a className="right-nav" href="#密码输入、整数输入">密码输入、整数输入</a>
<a className="right-nav" href="#多行输入">多行输入</a>
<a className="right-nav" href="#Input">Input</a>
<a className="right-nav" href="#css变量">css变量</a>
<a className="right-nav" href="#特别说明">特别说明</a></div></>)
  }
}