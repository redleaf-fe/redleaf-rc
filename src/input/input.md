```import
import {useState} from "react";
import {Input, Message} from 'rhino-rc';
```
## Input
包含text、password、textarea三种形式

### 基本使用
```component
// <!-- Input1 -->
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
);
```

### 密码输入
```component
// <!-- Input2 -->
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
);
```

### 多行输入
```component
// <!-- Input3 -->
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
);
```

### Input
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
containerClassName | 输入框容器类名 | string | 无 | 否
className | 输入框类名 | string | 无 | 否
type | 输入框类型 | "text" \| "password" \| "textarea" | "text" | 否
disabled | 禁用状态 | boolean | false | 否
maxLength | 可输入的最大长度 | string \| number | 无 | 否
value | 输入框里的内容 | string | 无 | 否
onChange | 输入框里的内容变化时的回调 | function(e: ChangeEvent) | 无 | 否
onEnterPress | 按下回车时的回调 | function(e: KeyboardEvent) | 无 | 否
showCount | 显示输入内容的长度（需要同时设置maxLength属性才会显示） | boolean | false | 否
showClear| 显示清除按钮（多行输入框不展示） | boolean | false | 否
rows | 多行输入框的行数（高度）| string \| number | 3 | 否
cols | 多行输入框的列数（宽度）| string \| number | 20 | 否
verticalAlign | 多行输入框对齐属性（前后有文本时） | css支持的vertical-align属性值 | "top" | 否
resize | 多行输入框大小调整 | css支持的resize属性值 | "none" | 否

### css变量
变量 | 说明 
-- | -- 
--input-text-color | 输入框文本颜色
--input-border| 输入框边框样式
--input-bgColor| 输入框背景颜色
--disabled-input-text-color| 输入框禁用状态文本颜色
--disabled-input-border| 输入框禁用状态边框样式
--disabled-input-bgColor| 输入框禁用状态背景颜色
--textarea-text-color| 多行输入框文本颜色
--textarea-border| 多行输入框边框样式
--textarea-bgColor| 多行输入框背景颜色
--disabled-textarea-text-color| 多行输入框禁用状态文本颜色
--disabled-textarea-border| 多行输入框禁用状态边框样式
--disabled-textarea-bgColor| 多行输入框禁用状态背景颜色
--input-height| 输入框高度
--input-font-size| 输入框字体大小
--textarea-font-size| 多行输入框字体大小
--input-border-radius | 输入框圆角大小
--textarea-border-radius | 多行输入框圆角大小
--input-padding | 输入框padding
--textarea-padding | 多行输入框padding