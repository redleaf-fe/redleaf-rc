## Button

### 普通形式

<code src="../demo/button/button1.tsx"></code>

### 边框形式

<code src="../demo/button/button2.tsx"></code>

### 禁用状态

<code src="../demo/button/button3.tsx"></code>

### 按钮组

激活状态可以通过改变 type 或者设置 className 等方式

<code src="../demo/button/button4.tsx"></code>

### Button Props

| 参数      | 说明           | 类型                                            | 默认值    | 必填 |
| --------- | -------------- | ----------------------------------------------- | --------- | ---- |
| children  | 按钮显示的内容 | ReactNode                                       | 无        | 是   |
| className | 按钮的类名     | string                                          | 无        | 否   |
| disabled  | 禁用状态       | boolean                                         | false     | 否   |
| type      | 按钮颜色       | "primary" \| "danger" \| "success" \| "default" | "primary" | 否   |
| bordered  | 边框形式       | boolean                                         | false     | 否   |

### Button.Group Props

| 参数      | 说明           | 类型      | 默认值 | 必填 |
| --------- | -------------- | --------- | ------ | ---- |
| children  | 按钮组内的内容 | ReactNode | 无     | 是   |
| className | 按钮组的类名   | string    | 无     | 否   |

### css 变量

| 变量                      | 说明                                           |
| ------------------------- | ---------------------------------------------- |
| --default-button-color    | 默认按钮文本颜色                               |
| --colors-button-color     | 非默认（primary、danger、success）按钮文本颜色 |
| --default-button-bgColor  | 默认按钮背景色                                 |
| --primary-button-bgColor  | primary 按钮背景色                             |
| --success-button-bgColor  | success 按钮背景色                             |
| --danger-button-bgColor   | danger 按钮背景色                              |
| --default-button-border   | 默认按钮边框样式                               |
| --disabled-button-bgColor | 禁用状态背景色                                 |
| --disabled-button-color   | 禁用状态文本颜色                               |
| --button-font-size        | 按钮文本大小                                   |
| --button-line-height      | 按钮文本行高                                   |
| --button-border-radius    | 按钮圆角大小                                   |
| --button-padding          | 按钮 padding                                   |

### 特别说明

disabled 中只处理了 onClick 事件，如果使用 onMouseDown 等事件，仍会执行
