```import
import {useState} from "react";
import {Button} from 'rhino-rc';
```
## Button

### 普通形式
```component
import {Button} from 'rhino-rc';

// --
// <!-- Button1 -->
const Button1 = ()=>{
  return <>
    <Button className="mr8" onClick={()=>alert('按下按钮')}>按钮</Button>
    <Button className="mr8" type="default" onClick={()=>alert('按下按钮')}>默认</Button>
    <Button className="mr8" type="primary" onClick={()=>alert('按下按钮')}>蓝色</Button>
    <Button className="mr8" type="success" onClick={()=>alert('按下按钮')}>绿色</Button>
    <Button className="mr8" type="danger" onClick={()=>alert('按下按钮')}>红色</Button>
    <Button className="mr8" type="danger" onClick={()=>alert('按下按钮')}>
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
import {Button} from 'rhino-rc';

// --
// <!-- Button2 -->
const Button2 = ()=>{
  return <>
    <Button className="mr8" bordered onClick={()=>alert('按下按钮')}>按钮</Button>
    <Button className="mr8" bordered type="default" onClick={()=>alert('按下按钮')}>默认</Button>
    <Button className="mr8" bordered type="primary" onClick={()=>alert('按下按钮')}>蓝色</Button>
    <Button className="mr8" bordered type="success" onClick={()=>alert('按下按钮')}>绿色</Button>
    <Button className="mr8" bordered type="danger" onClick={()=>alert('按下按钮')}>红色</Button>
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
import {Button} from 'rhino-rc';

// --
// <!-- Button3 -->
const Button3 = ()=>{
  return <>
    <Button className="mr8" disabled onClick={()=>alert('按下按钮')}>按钮</Button>
    <Button className="mr8" disabled type="default" onClick={()=>alert('按下按钮')}>默认</Button>
    <Button className="mr8" disabled type="primary" onClick={()=>alert('按下按钮')}>蓝色</Button>
    <Button className="mr8" disabled type="success" onClick={()=>alert('按下按钮')}>绿色</Button>
    {/* 注意这最后一个 */}
    <Button className="mr8" disabled type="danger" onMouseDown={()=>alert('按下按钮')}>我是可以点击成功的，不信你试试</Button>
  </>
};

// --
ReactDOM.render(
  <Button3 />,
  document.getElementById('root')
);
```

### 按钮组
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

### loading状态
```component
import {Button} from 'rhino-rc';

// --
// <!-- Button5 -->
const Button5 = ()=>{
  const [isloading, setLoading] = useState(false);
  return <Button loading={isloading} onClick={()=>{
    alert('按下按钮');
    setLoading(true)
    setTimeout(()=>setLoading(false), 3000)
  }}>按钮</Button>
};

// --
ReactDOM.render(
  <Button5 />,
  document.getElementById('root')
);
```

### Button
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
children | 按钮显示的内容 | ReactNode | 无 | 是
disabled | 禁用状态 | boolean | false | 否
type | 按钮颜色 | 'primary' \| 'danger' \| 'success' \| 'default' | 'primary' | 否
bordered | 边框形式 | boolean | false | 否
loading | 加载状态，适合用于按钮点击后发送请求，在请求完成前不能再次点击的情况 | boolean | false | 否

### Button.Group
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
children | 按钮组内的内容 | ReactNode | 无 | 是

### css变量
变量 | 说明 
-- | -- 
--default-button-color | 默认按钮字体颜色
--colors-button-color | 非默认（primary、danger、success）按钮字体颜色
--default-button-bgColor | 默认按钮背景颜色
--primary-button-bgColor | primary按钮背景颜色
--success-button-bgColor | success按钮背景颜色
--danger-button-bgColor | danger按钮背景颜色
--default-button-border-color | 默认按钮边框颜色
--disabled-button-bgColor | 禁用状态背景颜色
--disabled-button-color | 禁用状态字体颜色
--disabled-button-border-color | 禁用状态边框颜色

### 特别说明
disabled中只处理了onClick事件，如果使用onMouseDown等事件，仍会执行

