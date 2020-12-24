```import
import {Bubble} from 'redleaf-rc';
```

## Bubble

气泡，下面的例子中为了显示明显，设置了 css 变量--bubble-bgColor 为 orange

### 基本使用

topLeft、topRight、bottomLeft、bottomRight、leftTop、rightTop、leftBottom、rightBottom 这几个位置因为三角直接在边缘不好看，所以距离边缘半个三角的宽度

```component
// <!-- Bubble1 -->
import {Bubble} from 'redleaf-rc';

// --

const Bubble1 = ()=>{
  document.body.style.setProperty('--bubble-bgColor', 'orange');
  return <>
    <div className="mb16">
      <Bubble className="mr16" position="topCenter">
        topCenter
      </Bubble>
      <Bubble className="mr16" position="leftCenter">
        leftCenter
      </Bubble>
      <Bubble className="mr16" position="rightCenter">
        rightCenter
      </Bubble>
      <Bubble className="mr16" position="bottomCenter">
        bottomCenter
      </Bubble>
    </div>

    <div className="mb16">
      <Bubble className="mr16" position="topLeft">
        topLeft
      </Bubble>
      <Bubble className="mr16" position="topRight">
        topRight
      </Bubble>
      <Bubble className="mr16" position="bottomLeft">
        bottomLeft
      </Bubble>
      <Bubble className="mr16" position="bottomRight">
        bottomRight
      </Bubble>
    </div>

    <div className="mb16">
      <Bubble className="mr16" position="leftTop">
        <div>leftTop</div>
        <div>leftTop</div>
        <div>leftTop</div>
      </Bubble>
      <Bubble className="mr16" position="rightTop">
        <div>rightTop</div>
        <div>rightTop</div>
        <div>rightTop</div>
      </Bubble>
      <Bubble className="mr16" position="leftBottom">
        <div>leftBottom</div>
        <div>leftBottom</div>
        <div>leftBottom</div>
      </Bubble>
      <Bubble className="mr16" position="rightBottom">
        <div>rightBottom</div>
        <div>rightBottom</div>
        <div>rightBottom</div>
      </Bubble>
    </div>
  </>
};

// --
ReactDOM.render(
  <Bubble1 />,
  document.getElementById('root')
);
```

### 设置小三角和大小和偏移量

leftOffset 为负表示向左偏移，为正表示向右偏移；topOffset 为负数表示向上偏移，为正表示向下偏移

```component
// <!-- Bubble2 -->
import {Bubble} from 'redleaf-rc';

// --
const Bubble2 = ()=>{
  return <>
    <div className="mb16">
      修改小三角的大小：
      <Bubble className="mr16" position="bottomCenter" triangleSize={12}>
        bottomCenter
      </Bubble>
      <Bubble className="mr16" position="bottomCenter">
        bottomCenter
      </Bubble>
      <Bubble className="mr16" position="bottomCenter" triangleSize={4}>
        bottomCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的左右偏移：
      <Bubble className="mr16" position="bottomCenter" leftOffset="4">
        bottomCenter
      </Bubble>
      <Bubble className="mr16" position="bottomCenter" leftOffset="0">
        bottomCenter
      </Bubble>
      <Bubble className="mr16" position="bottomCenter" leftOffset="-4">
        bottomCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的上下偏移：
      <Bubble className="mr16" position="bottomCenter" topOffset="4">
        bottomCenter
      </Bubble>
      <Bubble className="mr16" position="bottomCenter" topOffset="0">
        bottomCenter
      </Bubble>
      <Bubble className="mr16" position="bottomCenter" topOffset="-4">
        bottomCenter
      </Bubble>
    </div>
  </>
};

// --
ReactDOM.render(
  <Bubble2 />,
  document.getElementById('root')
);
```

### Bubble

| 参数             | 说明                                                     | 类型                                                                                                                                                                                                                                          | 默认值         | 必填 |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---- |
| className        | 气泡外层容器类名                                         | string                                                                                                                                                                                                                                        | 无             | 否   |
| triClassName     | 气泡小三角类名                                           | string                                                                                                                                                                                                                                        | 无             | 否   |
| contentClassName | 气泡内容容器类名                                         | string                                                                                                                                                                                                                                        | 无             | 否   |
| children         | 气泡内容                                                 | ReactNode                                                                                                                                                                                                                                     | 无             | 是   |
| position         | 气泡方向                                                 | "topCenter" \|<br/> "leftCenter" \|<br/> "rightCenter" \|<br/> "bottomCenter" \|<br/> "topLeft" \|<br/> "topRight" \|<br/> "bottomLeft" \|<br/> "bottomRight" \|<br/> "leftTop" \|<br/> "leftBottom" \|<br/> "rightTop" \|<br/> "rightBottom" | "bottomCenter" | 否   |
| triangleSize     | 气泡小三角的大小                                         | number                                                                                                                                                                                                                                        | 8              | 否   |
| leftOffset       | 气泡小三角的横向偏移，负数表示向左偏移，正数表示向右偏移 | string \| number                                                                                                                                                                                                                              | '0px'          | 否   |
| topOffset        | 气泡小三角的纵向偏移，负数表示向上偏移，正数表示向下偏移 | string \| number                                                                                                                                                                                                                              | '0px'          | 否   |

### css 变量

| 变量                   | 说明                           |
| ---------------------- | ------------------------------ |
| --bubble-color         | 气泡内文本颜色                 |
| --bubble-bgColor       | 气泡背景色（包含小三角的颜色） |
| --bubble-box-shadow    | 气泡阴影                       |
| --bubble-padding       | 气泡的 padding                 |
| --bubble-border-radius | 气泡圆角大小                   |

### 特别说明

如果设置了气泡外层容器的 display 属性为 block，可能导致小三角的位置偏移，因为小三角是相对 redleaf-rc-bubble-container 计算位置的。

leftOffset 和 topOffset 可以设置成带 px 的值，比如"10px"，也可以设置成单独的数字和字符串，比如 12 和"12"，也可以设置百分比，比如"50%"。

leftOffset 和 topOffset 是用在 calc()中的，所以理论上 css 支持的单位都可以传
