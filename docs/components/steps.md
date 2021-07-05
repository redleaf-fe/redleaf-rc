## Steps

### 基本使用

<code src="../demo/steps/steps1.tsx"></code>

### 受控

<code src="../demo/steps/steps2.tsx"></code>

### Props

| 参数         | 说明               | 类型                                                                   | 默认值       | 必填 |
| ------------ | ------------------ | ---------------------------------------------------------------------- | ------------ | ---- |
| className    | 类名               | string                                                                 | 无           | 否   |
| layout       | 方向               | 'horizontal' \| 'vertical'                                             | 'horizontal' | 否   |
| options      | 选项               | [IStepOption](#istepoption)                                            | []           | 是   |
| value        | 选中的步骤的值     | string                                                                 | 无           | 否   |
| defaultValue | 默认的选中值       | string                                                                 | 无           | 否   |
| onChange     | 选中值改变时的回调 | function ({ meta: [IStepOption](#istepoption), value: string }) : void | 无           | 否   |

### IStepOption

| 参数   | 说明                            | 类型                                               | 默认值 | 必填 |
| ------ | ------------------------------- | -------------------------------------------------- | ------ | ---- |
| text   | 选项的文本                      | string                                             | 无     | 是   |
| value  | 选项的值                        | string                                             | 无     | 是   |
| render | 选项的渲染函数，优先级高于 text | function ({ meta: any, index: number }): ReactNode | 无     | 否   |

### css 变量

| 变量                 | 说明                       |
| -------------------- | -------------------------- |
| --steps-color        | 文本颜色                   |
| --steps-bgColor      | 背景色                     |
| --steps-font-size    | 文本大小                   |
| --steps-line-height  | 文本行高                   |
| --steps-joint-color  | 步骤之间的连接线的颜色     |
| --steps-joint-length | 连接线的长度               |
| --steps-margin       | 步骤序号和连接线之间的间距 |

### 特别说明

步骤的序号使用的是 badge 组件，如果需要改颜色，需要改 badge 对应的 CSS 变量
