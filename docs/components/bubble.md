## Bubble

### 基本使用

topLeft、topRight、bottomLeft、bottomRight、leftTop、rightTop、leftBottom、rightBottom 这几个位置因为三角直接在边缘不好看，所以距离边缘半个三角的宽度

<code src="../demo/bubble/bubble1.tsx"></code>

### 设置小三角和大小和偏移量

leftOffset 为负表示向左偏移，为正表示向右偏移；topOffset 为负数表示向上偏移，为正表示向下偏移

<code src="../demo/bubble/bubble2.tsx"></code>

### Props

| 参数             | 说明                                                     | 类型                                                                                                                                                                                   | 默认值         | 必填 |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---- |
| className        | 气泡外层容器类名                                         | string                                                                                                                                                                                 | 无             | 否   |
| triClassName     | 气泡小三角类名                                           | string                                                                                                                                                                                 | 无             | 否   |
| contentClassName | 气泡内容容器类名                                         | string                                                                                                                                                                                 | 无             | 否   |
| children         | 气泡内容                                                 | ReactNode                                                                                                                                                                              | 无             | 是   |
| position         | 气泡方向                                                 | "topCenter" \| "leftCenter" \| "rightCenter" \| "bottomCenter" \| "topLeft" \| "topRight" \| "bottomLeft" \| "bottomRight" \| "leftTop" \| "leftBottom" \| "rightTop" \| "rightBottom" | "bottomCenter" | 否   |
| triangleSize     | 气泡小三角的大小                                         | number                                                                                                                                                                                 | 8              | 否   |
| leftOffset       | 气泡小三角的横向偏移，负数表示向左偏移，正数表示向右偏移 | string \| number                                                                                                                                                                       | "0px"          | 否   |
| topOffset        | 气泡小三角的纵向偏移，负数表示向上偏移，正数表示向下偏移 | string \| number                                                                                                                                                                       | "0px"          | 否   |

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
