## Badge

### 基本使用

<code src="../demo/badge/badge1.tsx"></code>

### 最大值、显示圆点

<code src="../demo/badge/badge2.tsx"></code>

### Props

| 参数      | 说明                                                                                   | 类型                                            | 默认值    | 必填 |
| --------- | -------------------------------------------------------------------------------------- | ----------------------------------------------- | --------- | ---- |
| className | 徽标类名                                                                               | string                                          | 无        | 否   |
| num       | 徽标内容，可以填数字、字符串、自定义元素等                                             | ReactNode                                       | 无        | 是   |
| type      | 徽标预置颜色                                                                           | "primary" \| "danger" \| "success" \| "default" | 'primary' | 否   |
| bordered  | 边框形式                                                                               | string                                          | false     | 否   |
| disabled  | 禁用状态                                                                               | string                                          | false     | 否   |
| dotted    | 圆点状态                                                                               | string                                          | false     | 否   |
| maxNum    | 最大显示数值，用大于号比较，所以自定义元素、不能转换成数字的字符串等使用该属性不会生效 | string                                          | 无        | 否   |

### css 变量

| 变量                     | 说明                                       |
| ------------------------ | ------------------------------------------ |
| --default-badge-color    | 默认文本颜色                               |
| --colors-badge-color     | 非默认（primary、danger、success）文本颜色 |
| --default-badge-bgColor  | 默认背景色                                 |
| --primary-badge-bgColor  | primary 背景色                             |
| --success-badge-bgColor  | success 背景色                             |
| --danger-badge-bgColor   | danger 背景色                              |
| --default-badge-border   | 默认边框样式                               |
| --disabled-badge-bgColor | 禁用状态背景色                             |
| --disabled-badge-color   | 禁用状态文本颜色                           |
| --dotted-badge-size      | 圆点状态的大小                             |
| --badge-font-size        | 文本大小                                   |
| --badge-line-height      | 文本行高                                   |
| --badge-padding          | padding 样式                               |
