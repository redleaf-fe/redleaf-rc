## Trigger

### 基本使用

例子中对 content 使用了 Bubble 组件，也可以不用 Bubble 组件包裹，自定义 content 展示样式

```tsx
import React from 'react';
import { Trigger, Button, Bubble } from 'redleaf-rc';
import '../doc.less';

const Trigger1 = () => {
  document.body.style.setProperty('--bubble-bgColor', 'orange');
  return (
    <>
      <Trigger
        className="mr8"
        type="hover"
        topOffset="-8"
        content={<Bubble>121323123</Bubble>}
      >
        <Button>Hover me</Button>
      </Trigger>
      <Trigger type="click" topOffset={-8} content={<Bubble>121323123</Bubble>}>
        <Button>Click me</Button>
      </Trigger>
    </>
  );
};

export default () => <Trigger1 />;
```

### 手动控制 content 显示隐藏

```tsx
import React, { useState } from 'react';
import { Trigger, Button, Bubble } from 'redleaf-rc';
import '../doc.less';

const Trigger2 = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="mb8">
        <Trigger
          type="hover"
          topOffset="-8"
          visible={show}
          content={<Bubble>121323123</Bubble>}
        >
          <Button>under control</Button>
        </Trigger>
      </div>
      <Button className="mr8" onClick={() => setShow(true)}>
        show
      </Button>
      <Button onClick={() => setShow(false)}>hide</Button>
    </>
  );
};

export default () => <Trigger2 />;
```

### 十二种位置

取值和 Bubble 组件一致

这里没有再用 Bubble 组件展示，为了防止 Bubble 的箭头影响判断，这里的位置指的是 Trigger 包裹的子组件为基准，content 向基准对齐

```tsx
import React from 'react';
import { Trigger, Button } from 'redleaf-rc';
import '../doc.less';

const Trigger3 = () => {
  return (
    <>
      <div className="mb16">
        <Trigger
          className="mr16"
          position="topCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>topCenter</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="bottomCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>bottomCenter</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="leftCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>leftCenter</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="rightCenter"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>rightCenter</Button>
        </Trigger>
      </div>

      <div className="mb16">
        <Trigger
          className="mr16"
          position="topLeft"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>topLeft</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="topRight"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>topRight</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="bottomLeft"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>bottomLeft</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="bottomRight"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>bottomRight</Button>
        </Trigger>
      </div>

      <div className="mb16">
        <Trigger
          className="mr16"
          position="leftTop"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>leftTop</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="leftBottom"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>leftBottom</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="rightTop"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>rightTop</Button>
        </Trigger>
        <Trigger
          className="mr16"
          position="rightBottom"
          content={
            <div className="border-1px-black bg-white">121323123asdasdasd</div>
          }
        >
          <Button>rightBottom</Button>
        </Trigger>
      </div>
    </>
  );
};

export default () => <Trigger3 />;
```

### Trigger

| 参数             | 说明                                                   | 类型                                                                                                                                                                                                                                          | 默认值      | 必填 |
| ---------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---- |
| contentClassName | trigger 包裹子组件的容器的类名                         | string                                                                                                                                                                                                                                        | 无          | 否   |
| className        | trigger 外层容器类名                                   | string                                                                                                                                                                                                                                        | 无          | 否   |
| type             | 触发类型                                               | "hover" \| "click"                                                                                                                                                                                                                            | "hover"     | 否   |
| onHide           | content 隐藏时的回调                                   | function(): void                                                                                                                                                                                                                              | 无          | 否   |
| onVisible        | content 显示时的回调                                   | function(): void                                                                                                                                                                                                                              | 无          | 否   |
| children         | trigger 包裹的子组件                                   | ReactNode                                                                                                                                                                                                                                     | 无          | 是   |
| content          | trigger 显示的内容                                     | ReactNode                                                                                                                                                                                                                                     | 无          | 是   |
| position         | content 显示位置                                       | "topCenter" \|<br/> "leftCenter" \|<br/> "rightCenter" \|<br/> "bottomCenter" \|<br/> "topLeft" \|<br/> "topRight" \|<br/> "bottomLeft" \|<br/> "bottomRight" \|<br/> "leftTop" \|<br/> "leftBottom" \|<br/> "rightTop" \|<br/> "rightBottom" | "topCenter" | 否   |
| visible          | 控制 content 是否展示                                  | boolean                                                                                                                                                                                                                                       | 无          | 否   |
| leftOffset       | content 的横向偏移，负数表示向左偏移，正数表示向右偏移 | string \| number                                                                                                                                                                                                                              | '0px'       | 否   |
| topOffset        | content 的纵向偏移，负数表示向上偏移，正数表示向下偏移 | string \| number                                                                                                                                                                                                                              | '0px'       | 否   |

### css 变量

| 变量              | 说明               |
| ----------------- | ------------------ |
| --trigger-z-index | content 的 z-index |

### 特别说明

leftOffset 和 topOffset 可以设置成带 px 的值，比如"10px"，也可以设置成单独的数字和字符串，比如 12 和"12"，也可以设置百分比，比如"50%"，但是要注意，trigger 的弹出层挂在 doucument.body 上面，所以百分比是相对于 doucument.body 的。

leftOffset 和 topOffset 是用在 calc()中的，所以理论上 css 支持的单位都可以传
