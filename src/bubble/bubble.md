```import
import {Bubble} from 'redleaf-rc';
```
## Bubble
气泡，下面的例子中为了显示明显，设置了css变量--bubble-bgColor为orange

### 基本使用
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
      </Bubble>
      <Bubble className="mr16" position="rightTop">
        <div>rightTop</div>
        <div>rightTop</div>
      </Bubble>
      <Bubble className="mr16" position="leftBottom">
        <div>leftBottom</div>
        <div>leftBottom</div>
      </Bubble>
      <Bubble className="mr16" position="rightBottom">
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
```component
// <!-- Bubble2 -->
import {Bubble} from 'redleaf-rc';

// --
const Bubble2 = ()=>{
  return <>
    <div className="mb16">
      <Bubble position="topCenter">
        topCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的大小：
      <Bubble className="mr16" position="topCenter" triangleSize="12">
        topCenter
      </Bubble>
      <Bubble className="mr16" position="topCenter" triangleSize="4">
        topCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的左右偏移：
      <Bubble className="mr16" position="topCenter" leftOffset="20">
        topCenter
      </Bubble>
      <Bubble className="mr16" position="topCenter" leftOffset="-20">
        topCenter
      </Bubble>
    </div>

    <div className="mb16">
      修改小三角的上下偏移：
      <Bubble className="mr16" position="topCenter" topOffset="4">
        topCenter
      </Bubble>
      <Bubble className="mr16" position="topCenter" topOffset="-4">
        topCenter
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
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
className | 气泡外层容器类名 | string | 无 | 否
triClassName | 气泡小三角类名 | string | 无 | 否
contentClassName | 气泡内容容器类名 | string | 无 | 否
children | 气泡内容 | ReactNode | 无 | 是
position | 气泡方向 |  "topCenter" \|<br/> "leftCenter" \|<br/> "rightCenter" \|<br/> "bottomCenter" \|<br/> "topLeft" \|<br/> "topRight" \|<br/> "bottomLeft" \|<br/> "bottomRight" \|<br/> "leftTop" \|<br/> "leftBottom" \|<br/> "rightTop" \|<br/> "rightBottom" | "bottomCenter" | 否
triangleSize | 气泡小三角的大小 | string \| number | 8 | 否
leftOffset | 气泡小三角的横向偏移，负数表示向左偏移，正数表示向右偏移 | string \| number | '0px' | 否
topOffset | 气泡小三角的纵向偏移，负数表示向上偏移，正数表示向下偏移 | string \| number | '0px' | 否

### css变量
变量 | 说明 
-- | -- 
--bubble-color | 气泡内文本颜色
--bubble-bgColor | 气泡背景色（包含小三角的颜色）
--bubble-box-shadow | 气泡阴影
--bubble-padding | 气泡的padding
 --bubble-border-radius | 气泡圆角大小

### 特别说明
如果设置了气泡外层容器的display属性为block，可能导致小三角的位置偏移

leftOffset和topOffset还可以设置百分比，比如"50%"，也可以设置成带px的值，比如"10px"，也可以设置成单独的数字和字符串，比如12和"12"；

triangleSize只能设置成单独的数字和字符串；
