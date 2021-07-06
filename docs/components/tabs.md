## Tabs

### 基本使用

<code src="../demo/tabs/tabs1.tsx"></code>

### 受控、初始值

<code src="../demo/tabs/tabs2.tsx"></code>

### 位置

<code src="../demo/tabs/tabs3.tsx"></code>

### 切换 tab 时是否销毁非激活的 content

<code src="../demo/tabs/tabs4.tsx"></code>

### Props

| 参数              | 说明                                | 类型                                                                | 默认值 | 必填 |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------- | ------ | ---- |
| className         | 外层容器类名                        | string                                                              | 无     | 否   |
| contentsClassName | 内容部分容器的类名                  | string                                                              | 无     | 否   |
| titlesClassName   | title 部分容器的类名                | string                                                              | 无     | 否   |
| position          | title 部分的位置                    | 'top' \| 'right' \| 'bottom' \| 'left'                              | 'top'  | 否   |
| options           | 选项                                | [ITabOption](#itaboption)                                           | []     | 是   |
| destroyOnHide     | 切换 tab 时是否销毁非激活的 content | boolean                                                             | false  | 否   |
| onChange          | 选项变化的回调                      | function ({ meta: [ITabOption](#itaboption), value: string }): void | 无     | 否   |
| value             | 选中项的值，设置后认为是受控状态    | string                                                              | 无     | 否   |
| defaultValue      | 选中项的初始值                      | string                                                              | 无     | 否   |

### ITabOption

| 参数        | 说明                            | 类型                                             | 默认值 | 必填 |
| ----------- | ------------------------------- | ------------------------------------------------ | ------ | ---- |
| text        | 选项的文本                      | string                                           | 无     | 是   |
| value       | 选项的值                        | string                                           | 无     | 是   |
| renderTitle | 渲染选项的函数，优先级高于 text | function ({meta: any, index: number}): ReactNode | 无     | 否   |
| disabled    | 选项是否禁用                    | boolean                                          | 无     | 否   |
| content     | 选项对应的内容                  | ReactNode                                        | 无     | 否   |

### css 变量

| 变量                        | 说明                                           |
| --------------------------- | ---------------------------------------------- |
| --tabs-color                | 文本颜色                                       |
| --tabs-bgColor              | 背景色                                         |
| --tabs-font-size            | 文本大小                                       |
| --tabs-line-height          | 文本行高                                       |
| --tabs-title-width          | title 宽度，如果内容是文本，超过部分显示省略号 |
| --tabs-title-padding        | title 部分的 padding                           |
| --tabs-title-active-color   | 激活状态的文本颜色                             |
| --tabs-title-disabled-color | 禁用状态的文本颜色                             |
| --tabs-titles-border        | titles 部分的 border 样式                      |
| --tabs-title-border-active  | 激活状态的 border 样式                         |
