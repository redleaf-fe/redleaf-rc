import React from "react";
import { CodeViewer } from "../../common";
import { useState } from "react";
import { Input, Message } from "rhino-rc";

const Input1 = () => {
  const [inputVal, setInputVal] = useState("init");
  const [inputVal2, setInputVal2] = useState("disabled");
  const [inputVal3, setInputVal3] = useState("readOnly");
  return (
    <>
      <div className="mb8">
        受控：
        <Input
          value={inputVal}
          onChange={(e: any) => {
            setInputVal(e.target.value + "1");
          }}
        />
      </div>

      <div className="mb8">
        非受控：
        <Input
          placeholder="请输入"
          onChange={(e: any) => {
            console.log(e.target.value);
          }}
        />
      </div>

      <div className="mb8">
        禁用：
        <Input
          disabled
          value={inputVal2}
          onChange={(e: any) => {
            setInputVal2(e.target.value);
          }}
        />
      </div>

      <div className="mb8">
        只读：
        <Input
          readOnly
          value={inputVal3}
          onChange={(e: any) => {
            setInputVal3(e.target.value);
          }}
        />
      </div>

      <div className="mb8">
        响应回车：
        <Input
          onEnterPress={(e: any) => {
            Message.show({ content: e.target.value });
          }}
        />
      </div>

      <div className="mb8">
        显示清除按钮：
        <Input showClear />
      </div>

      <div className="mb8">
        限制输入的最大长度：
        <Input showCount maxLength={10} />
      </div>
    </>
  );
};

const Input2 = () => {
  const [inputVal, setInputVal] = useState("init");
  return (
    <>
      <div className="mb8">
        <Input
          value={inputVal}
          type="password"
          placeholder="输入密码"
          onChange={(e: any) => {
            setInputVal(e.target.value);
          }}
        />
      </div>
    </>
  );
};

const Input3 = () => {
  const [inputVal, setInputVal] = useState("multi");
  return (
    <>
      <div className="mb8">
        <span>受控，可手动调整大小：</span>
        <Input
          value={inputVal}
          type="textarea"
          placeholder="输入多行内容"
          onChange={(e: any) => {
            setInputVal(e.target.value);
          }}
          verticalAlign="top"
          resize="both"
        />
      </div>
      <div className="mb8">
        非受控，设置宽高：
        <Input
          type="textarea"
          placeholder="输入多行内容"
          onChange={(e: any) => {
            console.log(e.target.value);
          }}
          verticalAlign="middle"
          cols={40}
          rows={6}
        />
      </div>
      <div className="mb8">
        禁用：
        <Input
          disabled
          value="已禁用"
          type="textarea"
          placeholder="输入多行内容"
          onChange={(e: any) => {
            console.log(e.target.value);
          }}
          verticalAlign="bottom"
        />
      </div>
    </>
  );
};

export default class extends React.Component {
  render() {
    return (
      <>
        <h2>Input</h2>
        <span className="plain-text-md">
          包含text、password、textarea三种形式
        </span>
        <br />
        <h3 id="基本使用"># 基本使用</h3>
        <CodeViewer
          source={`// <!-- Input1 -->
import {Input, Message} from 'rhino-rc';

// --
const Input1 = ()=>{
  const [inputVal, setInputVal] = useState('init');
  const [inputVal2, setInputVal2] = useState('disabled');
  const [inputVal3, setInputVal3] = useState('readOnly');
  return <>
    <div className="mb8">
      受控：
      <Input 
        value={inputVal}
        onChange={(e: any)=>{
          setInputVal(e.target.value + '1')
        }} />
    </div>

    <div className="mb8">
      非受控：
      <Input 
        placeholder="请输入"
        onChange={(e: any)=>{
          console.log(e.target.value)
        }} />
    </div>

    <div className="mb8">
      禁用：
      <Input 
        disabled
        value={inputVal2}
        onChange={(e: any)=>{
          setInputVal2(e.target.value)
        }} />
    </div>

    <div className="mb8">
      只读：
      <Input 
        readOnly
        value={inputVal3}
        onChange={(e: any)=>{
          setInputVal3(e.target.value)
        }} />
    </div>

    <div className="mb8">
      响应回车：
      <Input onEnterPress={(e: any)=>{
        Message.show({content: e.target.value})
      }} />
    </div>

    <div className="mb8">
      显示清除按钮：
      <Input showClear />
    </div>

    <div className="mb8">
      限制输入的最大长度：
      <Input showCount maxLength={10} />
    </div>
  </>
};

// --
ReactDOM.render(
  <Input1 />,
  document.getElementById('root')
);`}
        >
          <Input1 />
        </CodeViewer>
        <h3 id="密码输入"># 密码输入</h3>
        <CodeViewer
          source={`// <!-- Input2 -->
import {Input} from 'rhino-rc';

// --
const Input2 = ()=>{
  const [inputVal, setInputVal] = useState('init');
  return <>
    <div className="mb8">
      <Input 
        value={inputVal}
        type="password"
        placeholder="输入密码"
        onChange={(e: any)=>{
          setInputVal(e.target.value)
        }} />
    </div>
  </>
};

// --
ReactDOM.render(
  <Input2 />,
  document.getElementById('root')
);`}
        >
          <Input2 />
        </CodeViewer>
        <h3 id="多行输入"># 多行输入</h3>
        <CodeViewer
          source={`// <!-- Input3 -->
import {Input} from 'rhino-rc';

// --
const Input3 = ()=>{
  const [inputVal, setInputVal] = useState('multi');
  return <>
    <div className="mb8">
      <span>受控，可手动调整大小：</span>
      <Input 
        value={inputVal}
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e: any)=>{
          setInputVal(e.target.value)
        }}
        verticalAlign="top"
        resize="both"
         />
    </div>
    <div className="mb8">
      非受控，设置宽高：
      <Input 
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e: any)=>{
          console.log(e.target.value)
        }}
        verticalAlign="middle"
        cols={40}
        rows={6}
         />
    </div>
    <div className="mb8">
      禁用：
      <Input 
        disabled
        value="已禁用"
        type="textarea"
        placeholder="输入多行内容"
        onChange={(e: any)=>{
          console.log(e.target.value)
        }}
        verticalAlign="bottom"
         />
    </div>
  </>
};

// --
ReactDOM.render(
  <Input3 />,
  document.getElementById('root')
);`}
        >
          <Input3 />
        </CodeViewer>
        <h3 id="Input"># Input</h3>
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
              <td>containerClassName</td>
              <td>输入框容器类名</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>className</td>
              <td>输入框类名</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>type</td>
              <td>输入框类型</td>
              <td>"text" | "password" | "textarea"</td>
              <td>"text"</td>
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
              <td>maxLength</td>
              <td>可输入的最大长度</td>
              <td>string | number</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>value</td>
              <td>输入框里的内容</td>
              <td>string</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td>输入框里的内容变化时的回调</td>
              <td>function(e: ChangeEvent)</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>onEnterPress</td>
              <td>按下回车时的回调</td>
              <td>function(e: KeyboardEvent)</td>
              <td>无</td>
              <td>否</td>
            </tr>
            <tr>
              <td>showCount</td>
              <td>显示输入内容的长度（需要同时设置maxLength属性才会显示）</td>
              <td>boolean</td>
              <td>false</td>
              <td>否</td>
            </tr>
            <tr>
              <td>showClear</td>
              <td>显示清除按钮（多行输入框不展示）</td>
              <td>boolean</td>
              <td>false</td>
              <td>否</td>
            </tr>
            <tr>
              <td>rows</td>
              <td>多行输入框的行数（高度）</td>
              <td>string | number</td>
              <td>3</td>
              <td>否</td>
            </tr>
            <tr>
              <td>cols</td>
              <td>多行输入框的列数（宽度）</td>
              <td>string | number</td>
              <td>20</td>
              <td>否</td>
            </tr>
            <tr>
              <td>verticalAlign</td>
              <td>多行输入框对齐属性（前后有文本时）</td>
              <td>css支持的vertical-align属性值</td>
              <td>"top"</td>
              <td>否</td>
            </tr>
            <tr>
              <td>resize</td>
              <td>多行输入框大小调整</td>
              <td>css支持的resize属性值</td>
              <td>"none"</td>
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
              <td>--input-text-color</td>
              <td>输入框文本颜色</td>
            </tr>
            <tr>
              <td>--input-border-color</td>
              <td>输入框边框颜色</td>
            </tr>
            <tr>
              <td>--input-bgColor</td>
              <td>输入框背景颜色</td>
            </tr>
            <tr>
              <td>--disabled-input-text-color</td>
              <td>输入框禁用状态文本颜色</td>
            </tr>
            <tr>
              <td>--disabled-input-border-color</td>
              <td>输入框禁用状态边框颜色</td>
            </tr>
            <tr>
              <td>--disabled-input-bgColor</td>
              <td>输入框禁用状态背景颜色</td>
            </tr>
            <tr>
              <td>--textarea-text-color</td>
              <td>多行输入框文本颜色</td>
            </tr>
            <tr>
              <td>--textarea-border-color</td>
              <td>多行输入框边框颜色</td>
            </tr>
            <tr>
              <td>--textarea-bgColor</td>
              <td>多行输入框背景颜色</td>
            </tr>
            <tr>
              <td>--disabled-textarea-text-color</td>
              <td>多行输入框禁用状态文本颜色</td>
            </tr>
            <tr>
              <td>--disabled-textarea-border-color</td>
              <td>多行输入框禁用状态边框颜色</td>
            </tr>
            <tr>
              <td>--disabled-textarea-bgColor</td>
              <td>多行输入框禁用状态背景颜色</td>
            </tr>
            <tr>
              <td>--input-height</td>
              <td>输入框高度</td>
            </tr>
            <tr>
              <td>--input-font-size</td>
              <td>输入框字体大小</td>
            </tr>
            <tr>
              <td>--textarea-font-size</td>
              <td>多行输入框字体大小</td>
            </tr>
          </tbody>
        </table>
        <div className="right-nav-contain">
          <a className="right-nav" href="#基本使用">
            基本使用
          </a>
          <a className="right-nav" href="#密码输入">
            密码输入
          </a>
          <a className="right-nav" href="#多行输入">
            多行输入
          </a>
          <a className="right-nav" href="#Input">
            Input
          </a>
          <a className="right-nav" href="#css变量">
            css变量
          </a>
        </div>
      </>
    );
  }
}
