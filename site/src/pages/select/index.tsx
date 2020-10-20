import React from "react";
import {CodeViewer} from "../../common";
import {useState} from 'react';
import {Select, Button} from 'redleaf-rc';
import {ISelection} from 'redleaf-rc/dist/select';


const options = [
  {text: '很长很长的文本很长很长的文本很长很长的文本很长很长的文本很长很长的文本很长很长的文本', value: '1'},
  {text: '2222222222222222222222222222222222222222222222222222222222222222222222', value: '2'},
  {text: '33', value: '3'},
  {text: '44', value: '4'},
  {text: '55', value: '5'},
  {text: '66', value: '6'}
]

const Select1 = ()=>{
  const [selectVal, setSelectVal] = useState<string[]>([]);

  return <>
    <div className="mb8">
      单选：
      <Select 
        options={options} 
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      多选：
      <Select 
        className="mr8"
        type="multi"
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      受控：
      <Select
        className="mr8"
        type="multi"
        value={selectVal}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
          setSelectVal(val);
        }} />
      <Button onClick={()=>{
        const arr = ['1','2','3','4','5','6'];
        const idx = Math.ceil(Math.random()*5);
        const val = arr.slice(idx, idx+3);
        setSelectVal(val);
      }}>设置选项</Button>
    </div>
    <div className="mb8">
      只读：
      <Select
        className="mr8"
        type="multi"
        readOnly
        value={['1', '2']}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      禁用：
      <Select
        className="mr8"
        type="multi"
        disabled
        value={['1', '2']}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
        <Select
        className="mr8"
        disabled
        value={['1']}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      限制多选的个数：
      <Select 
        className="mr8"
        maxNum={4}
        type="multi"
        placeholder="请选择选项"
        searchNodata="查无选项"
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      不带选项搜索：
      <Select 
        className="mr8"
        type="multi"
        showSearch={false}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
  </>
};



const Select2 = ()=>{
  const [options, setOptions] = useState<ISelection[]>([]);
  return <>
    <div className="mb8">
      <Select
        className="mr8"
        type="multi"
        options={options}
        onSearch={(val)=>{
          // 这里用定时器模拟请求，实际使用注意节流
          setTimeout(()=>{
            setOptions([1,2,3,4,5].map(v=>({text: v+val, value: v+val})))
          }, 300);
        }}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
      <Button onClick={()=>{setOptions([])}}>重置选项</Button>
    </div>
  </>
};



export default class extends React.Component {
  render(){
    return (<><h2>Select</h2>
<h3 id="基本使用"># 基本使用</h3>
<CodeViewer source={`// <!-- Select1 -->
import {Select} from 'redleaf-rc';

// --
const options = [
  {text: '很长很长的文本很长很长的文本很长很长的文本很长很长的文本很长很长的文本很长很长的文本', value: '1'},
  {text: '2222222222222222222222222222222222222222222222222222222222222222222222', value: '2'},
  {text: '33', value: '3'},
  {text: '44', value: '4'},
  {text: '55', value: '5'},
  {text: '66', value: '6'}
]

const Select1 = ()=>{
  const [selectVal, setSelectVal] = useState<string[]>([]);

  return <>
    <div className="mb8">
      单选：
      <Select 
        options={options} 
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      多选：
      <Select 
        className="mr8"
        type="multi"
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      受控：
      <Select
        className="mr8"
        type="multi"
        value={selectVal}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
          setSelectVal(val);
        }} />
      <Button onClick={()=>{
        const arr = ['1','2','3','4','5','6'];
        const idx = Math.ceil(Math.random()*5);
        const val = arr.slice(idx, idx+3);
        setSelectVal(val);
      }}>设置选项</Button>
    </div>
    <div className="mb8">
      只读：
      <Select
        className="mr8"
        type="multi"
        readOnly
        value={['1', '2']}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      禁用：
      <Select
        className="mr8"
        type="multi"
        disabled
        value={['1', '2']}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
        <Select
        className="mr8"
        disabled
        value={['1']}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      限制多选的个数：
      <Select 
        className="mr8"
        maxNum={4}
        type="multi"
        placeholder="请选择选项"
        searchNodata="查无选项"
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
    <div className="mb8">
      不带选项搜索：
      <Select 
        className="mr8"
        type="multi"
        showSearch={false}
        options={options}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
    </div>
  </>
};

// --
ReactDOM.render(
  <Select1 />,
  document.getElementById('root')
);`}><Select1 /></CodeViewer>
<h3 id="异步请求数据作为options"># 异步请求数据作为options</h3>
<span className="plain-text-md">回调函数没有做节流，需要自己处理</span>
<br />
<CodeViewer source={`// <!-- Select2 -->
import {Select} from 'redleaf-rc';
import {ISelection} from 'redleaf-rc/dist/select';

// --
const Select2 = ()=>{
  const [options, setOptions] = useState<ISelection[]>([]);
  return <>
    <div className="mb8">
      <Select
        className="mr8"
        type="multi"
        options={options}
        onSearch={(val)=>{
          // 这里用定时器模拟请求，实际使用注意节流
          setTimeout(()=>{
            setOptions([1,2,3,4,5].map(v=>({text: v+val, value: v+val})))
          }, 300);
        }}
        onChange={(val, selection)=>{
          console.log(val, selection);
        }} />
      <Button onClick={()=>{setOptions([])}}>重置选项</Button>
    </div>
  </>
};

// --
ReactDOM.render(
  <Select2 />,
  document.getElementById('root')
);`}><Select2 /></CodeViewer>
<h3 id="Select"># Select</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>className</td>
<td>选择框容器类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>itemsClassName</td>
<td>选择框选中选项的容器类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>optionsClassName</td>
<td>选择框选项容器类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>type</td>
<td>选择框类型</td>
<td>"single" | "multi"</td>
<td>"single"</td>
<td>否</td></tr>
<tr><td>disabled</td>
<td>禁用状态</td>
<td>boolean</td>
<td>false</td>
<td>否</td></tr>
<tr><td>readOnly</td>
<td>只读状态</td>
<td>boolean</td>
<td>false</td>
<td>否</td></tr>
<tr><td>maxNum</td>
<td>最多可选的选项个数</td>
<td>string | number</td>
<td>无</td>
<td>否</td></tr>
<tr><td>value</td>
<td>选中的选项值的数组（受控）</td>
<td>string[]</td>
<td>无</td>
<td>否</td></tr>
<tr><td>onChange</td>
<td>选项变化时的回调</td>
<td>function(value: string[], selection: <a href="#ISelection">ISelection</a>[]): void</td>
<td>无</td>
<td>否</td></tr>
<tr><td>onSearch</td>
<td>搜索选项输入框内容变化时的回调</td>
<td>function(value: string): void</td>
<td>无</td>
<td>否</td></tr>
<tr><td>options</td>
<td>选项数据</td>
<td><a href="#ISelectOption">ISelectOption</a>[]</td>
<td>[]</td>
<td>否</td></tr>
<tr><td>placeholder</td>
<td>占位文本</td>
<td>string</td>
<td>"请选择"</td>
<td>否</td></tr>
<tr><td>searchNodata</td>
<td>搜索选项时搜索不到结果时的提示文本</td>
<td>string</td>
<td>"暂无数据"</td>
<td>否</td></tr>
<tr><td>showSearch</td>
<td>是否带选项搜索功能</td>
<td>boolean</td>
<td>true</td>
<td>否</td></tr></tbody>
</table>
<h3 id="ISelection"># ISelection</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>text</td>
<td>选项展示用的文本</td>
<td>string</td>
<td>无</td>
<td>是</td></tr>
<tr><td>value</td>
<td>选项的值</td>
<td>string</td>
<td>无</td>
<td>是</td></tr></tbody>
</table>
<h3 id="ISelectOption"># ISelectOption</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>text</td>
<td>选项展示用的文本</td>
<td>string</td>
<td>无</td>
<td>是</td></tr>
<tr><td>value</td>
<td>选项的值</td>
<td>string</td>
<td>无</td>
<td>是</td></tr>
<tr><td>disabled</td>
<td>选项是否可用</td>
<td>boolean</td>
<td>无</td>
<td>否</td></tr></tbody>
</table>
<h3 id="css变量"># css变量</h3>
<table className="table">
<thead>
<tr><th>变量</th>
<th>说明</th></tr>
</thead>
<tbody><tr><td>--select-items-border</td>
<td>选中选项的容器的边框样式</td></tr>
<tr><td>--select-items-bgColor</td>
<td>选中选项的容器的背景色</td></tr>
<tr><td>--select-items-color</td>
<td>选中选项的容器的文本颜色</td></tr>
<tr><td>--select-items-border-radius</td>
<td>选中选项的容器的圆角大小</td></tr>
<tr><td>--select-items-padding</td>
<td>选中选项的容器的padding</td></tr>
<tr><td>--select-items-font-size</td>
<td>选中选项的容器的字体大小</td></tr>
<tr><td>--select-items-line-height</td>
<td>选中选项的容器的行高</td></tr>
<tr><td>--disabled-select-items-color</td>
<td>选中选项的容器禁用状态的文本颜色</td></tr>
<tr><td>--disabled-select-items-border</td>
<td>选中选项的容器禁用状态的边框样式</td></tr>
<tr><td>--disabled-select-items-bgColor</td>
<td>选中选项的容器禁用状态的背景色</td></tr>
<tr><td>--select-item-bgColor</td>
<td>选中选项的背景色</td></tr>
<tr><td>--select-item-color</td>
<td>选中选项的文本颜色</td></tr>
<tr><td>--select-item-font-size</td>
<td>选中选项的字体大小</td></tr>
<tr><td>--select-item-line-height</td>
<td>选中选项的行高</td></tr>
<tr><td>--select-item-padding</td>
<td>选中选项的padding</td></tr>
<tr><td>--select-item-margin</td>
<td>选中选项的margin</td></tr>
<tr><td>--select-item-border-radius</td>
<td>选中选项的圆角大小</td></tr>
<tr><td>--select-options-z-index</td>
<td>选项容器的z-index</td></tr>
<tr><td>--select-options-bgColor</td>
<td>选项容器的背景色</td></tr>
<tr><td>--select-options-border-radius</td>
<td>选项容器的圆角大小</td></tr>
<tr><td>--select-options-topOffset</td>
<td>选项容器和选择框的距离</td></tr>
<tr><td>--select-options-box-shadow</td>
<td>选项容器的阴影样式</td></tr>
<tr><td>--select-options-maxHeight</td>
<td>选项容器的最大高度</td></tr>
<tr><td>--select-option-font-size</td>
<td>选项的字体大小</td></tr>
<tr><td>--select-option-line-height</td>
<td>选项的行高</td></tr>
<tr><td>--select-option-bgColor</td>
<td>选项的背景色</td></tr>
<tr><td>--select-option-color</td>
<td>选项的文本颜色</td></tr>
<tr><td>--select-option-hover-bgColor</td>
<td>选项hover状态的背景色</td></tr>
<tr><td>--select-option-hover-color</td>
<td>选项hover状态的文本颜色</td></tr>
<tr><td>--select-option-padding</td>
<td>选项的padding</td></tr>
<tr><td>--disabled-select-option-bgColor</td>
<td>禁用选项的背景色</td></tr>
<tr><td>--disabled-select-option-color</td>
<td>禁用选项的文本颜色</td></tr>
<tr><td>--select-width</td>
<td>选择框的宽度</td></tr>
<tr><td>--select-vertical-align</td>
<td>选择框纵向对齐样式</td></tr>
<tr><td>--select-placeholder-color</td>
<td>placeholder文本颜色</td></tr></tbody>
</table>
<h3 id="todo"># todo</h3>
<span className="plain-text-md">optionValue
optionText
单选的点击后隐藏</span>
<div className="right-nav-contain"><a className="right-nav" href="#基本使用">基本使用</a>
<a className="right-nav" href="#异步请求数据作为options">异步请求数据作为options</a>
<a className="right-nav" href="#Select">Select</a>
<a className="right-nav" href="#ISelection">ISelection</a>
<a className="right-nav" href="#ISelectOption">ISelectOption</a>
<a className="right-nav" href="#css变量">css变量</a>
<a className="right-nav" href="#todo">todo</a></div></>)
  }
}