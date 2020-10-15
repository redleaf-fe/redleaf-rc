```import
import {useState} from 'react';
import {Popover, Button, Bubble} from 'rhino-rc';
```

## Popover
使用了position进行定位，没有使用创建元素的形式，对原本的DOM结构有侵入，定位需要自己调整，不过也因此不需要元素位置的计算

### 基本使用
例子中对content使用了Bubble组件，也可以不用Bubble组件包裹，自定义content展示样式

```component
// <!-- Popover1 -->
import {Popover, Button, Bubble} from 'rhino-rc';

// --
const Popover1 = ()=>{
  document.body.style.setProperty('--bubble-bgColor', 'orange');
  return <>
    <Popover 
      className="mr8" 
      trigger="hover" 
      topOffset="-8" 
      content={<Bubble>121323123</Bubble>}>
      <Button>Hover me</Button>
    </Popover>
    <Popover 
      trigger="click" 
      topOffset={-8} 
      content={<Bubble>121323123</Bubble>}>
      <Button>Click me</Button>
    </Popover>
  </>
};

// --
ReactDOM.render(
  <Popover1 />,
  document.getElementById('root')
);
```

### 手动控制content显示隐藏

```component
// <!-- Popover2 -->
import {Popover, Button, Bubble} from 'rhino-rc';

// --
const Popover2 = ()=>{
  const [show, setShow] = useState(false)
  return <>
    <div className="mb8">
      <Popover 
        trigger="hover" 
        topOffset="-8" 
        visible={show}
        content={<Bubble>121323123</Bubble>}>
        <Button>under control</Button>
      </Popover>
    </div>
    <Button className="mr8" onClick={()=>setShow(true)}>show</Button>
    <Button onClick={()=>setShow(false)}>hide</Button>
  </>
};

// --
ReactDOM.render(
  <Popover2 />,
  document.getElementById('root')
);
```

### 十二种位置
取值和Bubble组件一致

这里没有再用Bubble组件展示，为了防止Bubble的箭头影响判断，这里的位置指的是Popover包裹的子组件为基准，content向基准对齐

```component
// <!-- Popover3 -->
import {Popover, Button} from 'rhino-rc';

// --
const Popover3 = ()=>{
  return <>
    <div className="mb16">
      <Popover 
        className="mr16" 
        position="topCenter" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>topCenter</Button>
      </Popover>
      <Popover
        className="mr16"  
        position="bottomCenter" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>bottomCenter</Button>
      </Popover>
      <Popover 
        className="mr16" 
        position="leftCenter" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>leftCenter</Button>
      </Popover>
      <Popover 
        className="mr16" 
        position="rightCenter" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>rightCenter</Button>
      </Popover>
    </div>

    <div className="mb16">
      <Popover 
        className="mr16"
        position="topLeft" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>topLeft</Button>
      </Popover>
      <Popover 
        className="mr16"
        position="topRight" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>topRight</Button>
      </Popover>
      <Popover 
        className="mr16"
        position="bottomLeft" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>bottomLeft</Button>
      </Popover>
      <Popover 
        className="mr16"
        position="bottomRight" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>bottomRight</Button>
      </Popover>
    </div>

    <div className="mb16">
      <Popover 
        className="mr16"
        position="leftTop" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>leftTop</Button>
      </Popover>
      <Popover 
        className="mr16"
        position="leftBottom" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>leftBottom</Button>
      </Popover>
      <Popover 
        className="mr16"
        position="rightTop" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>rightTop</Button>
      </Popover>
      <Popover 
        className="mr16"
        position="rightBottom" 
        content={<div className="border-1px-black bg-white">121323123</div>}>
        <Button>rightBottom</Button>
      </Popover>
    </div>
  </>
};

// --
ReactDOM.render(
  <Popover3 />,
  document.getElementById('root')
);
```

### Popover
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
contentClassName | popover包裹子组件的容器的类名 | string | 无 | 否
className | popover外层容器类名 | string | 无 | 否
trigger | 触发类型 | "hover" \| "click" | "hover" | 否
onHide | content隐藏时的回调 | function(): void | 无 | 否
onVisible | content显示时的回调 | function(): void | 无 | 否
children | popover包裹的子组件 | ReactNode | 无 | 是
content | popover显示的内容 | ReactNode | 无 | 是
position | content显示位置 | "topCenter" \|<br/> "leftCenter" \|<br/> "rightCenter" \|<br/> "bottomCenter" \|<br/> "topLeft" \|<br/> "topRight" \|<br/> "bottomLeft" \|<br/> "bottomRight" \|<br/> "leftTop" \|<br/> "leftBottom" \|<br/> "rightTop" \|<br/> "rightBottom" | "topCenter" | 否
visible | 控制content是否展示 | boolean | 无 | 否
leftOffset | content的横向偏移，负数表示向左偏移，正数表示向右偏移 | string \| number | '0px' | 否
topOffset | content的纵向偏移，负数表示向上偏移，正数表示向下偏移 | string \| number | '0px' | 否

### css变量
变量 | 说明 
-- | -- 
--popover-z-index | content的z-index
