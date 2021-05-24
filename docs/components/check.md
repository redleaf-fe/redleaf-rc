## Check

### 基本使用

shape 属性和 type 属性可以组合使用，shape 包含 round 和 rect，type 包含 single 和 multi

<code src="../demo/check/check1.tsx"></code>

### 受控、只读、禁用、限制多选的个数

<code src="../demo/check/check2.tsx"></code>

### 选中标记的非填充样式

<code src="../demo/check/check3.tsx"></code>

### 只有勾选标记，没有文本

<code src="../demo/check/check4.tsx"></code>

### Props

| 参数          | 说明                                   | 类型                                                                     | 默认值   | 必填 |
| ------------- | -------------------------------------- | ------------------------------------------------------------------------ | -------- | ---- |
| className     | check 的容器类名                       | string                                                                   | 无       | 否   |
| itemClassName | check 的选项类名                       | string                                                                   | 无       | 否   |
| type          | check 的类型（单选、多选）             | "single" \| "multi"                                                      | "single" | 否   |
| shape         | check 的外形                           | "round" \| "rect"                                                        | "round"  | 否   |
| disabled      | 禁用状态                               | boolean                                                                  | false    | 否   |
| readOnly      | 只读状态                               | boolean                                                                  | false    | 否   |
| maxNum        | 最多可勾选的个数                       | number                                                                   | 无       | 否   |
| options       | 选项                                   | [ICheckOption](#icheckoption)[]                                          | []       | 是   |
| value         | 勾选的选项的值（受控）                 | string[]                                                                 | 无       | 否   |
| defaultValue  | 默认勾选的选项的值（非受控）           | string[]                                                                 | []       | 否   |
| onChange      | 勾选时的回调                           | function({ value: string[]; meta: [ICheckValue](#icheckvalue)[] }): void | 无       | 否   |
| markFill      | 选中标记是否填充显示                   | boolean                                                                  | true     | 否   |
| cancelable    | 单选状态下，选中后再次点击是否允许取消 | boolean                                                                  | true     | 否   |

### ICheckOption

| 参数     | 说明             | 类型    | 默认值 | 必填 |
| -------- | ---------------- | ------- | ------ | ---- |
| text     | 选项展示用的文本 | string  | 无     | 是   |
| value    | 选项的值         | string  | 无     | 是   |
| disabled | 选项是否可用     | boolean | 无     | 否   |

### ICheckValue

| 参数  | 说明             | 类型   | 默认值 | 必填 |
| ----- | ---------------- | ------ | ------ | ---- |
| text  | 选项展示用的文本 | string | 无     | 是   |
| value | 选项的值         | string | 无     | 是   |

### css 变量

| 变量                         | 说明                                   |
| ---------------------------- | -------------------------------------- |
| --check-bgColor              | 背景色                                 |
| --check-border-color         | 勾选标记（label 前的圆形或方形）的颜色 |
| --check-label-color          | label 文本颜色                         |
| --check-label-width          | label 的最大宽度，超过用省略号显示     |
| --check-label-font-size      | label 文本大小                         |
| --check-label-line-height    | label 文本行高                         |
| --check-mark-size            | 勾选标记的大小                         |
| --check-label-margin         | 勾选标记和 label 之间的间距            |
| --check-item-margin          | 两个选项之间的间距                     |
| --check-hover-color          | 勾选标记在 hover 状态的颜色            |
| --check-rect-border-radius   | 方形的勾选标记的圆角大小               |
| --disabled-check-label-color | 禁用状态下的文本颜色                   |
| --check-padding              | check 的 padding                       |
