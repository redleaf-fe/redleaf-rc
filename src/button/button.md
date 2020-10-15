```import
import {useState} from "react";
import {Button, Message} from 'rhino-rc';
```
## Button

### 普通形式
```component
import {Button, Message} from 'rhino-rc';

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
);
```

### 边框形式
```component
import {Button, Message} from 'rhino-rc';

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
);
```

### 禁用状态
```component
import {Button, Message} from 'rhino-rc';

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
);
```

### 按钮组
激活状态可以通过改变type或者设置className等方式

```component
import {Button} from 'rhino-rc';

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
);
```

### Button
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
children | 按钮显示的内容 | ReactNode | 无 | 是
className | 按钮的类名 | string | 无 | 否
disabled | 禁用状态 | boolean | false | 否
type | 按钮颜色 | 'primary' \| 'danger' \| 'success' \| 'default' | 'primary' | 否
bordered | 边框形式 | boolean | false | 否

### Button.Group
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
children | 按钮组内的内容 | ReactNode | 无 | 是
className | 按钮组的类名 | string | 无 | 否

### css变量
变量 | 说明 
-- | -- 
--default-button-color | 默认按钮字体颜色
--colors-button-color | 非默认（primary、danger、success）按钮字体颜色
--default-button-bgColor | 默认按钮背景色
--primary-button-bgColor | primary按钮背景色
--success-button-bgColor | success按钮背景色
--danger-button-bgColor | danger按钮背景色
--default-button-border | 默认按钮边框样式
--disabled-button-bgColor | 禁用状态背景色
--disabled-button-color | 禁用状态字体颜色
--disabled-button-border | 禁用状态边框样式
--button-font-size | 按钮字体大小
--button-line-height | 按钮文本行高
--button-border-radius | 按钮圆角大小
--button-padding | 按钮padding

### 特别说明
disabled中只处理了onClick事件，如果使用onMouseDown等事件，仍会执行

