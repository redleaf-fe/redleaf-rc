## Input

### 基本使用

<code src="../demo/input/input1.tsx"></code>

### 密码输入、整数输入

整数输入只留下 0-9 的数字

<code src="../demo/input/input2.tsx"></code>

### 多行输入

<code src="../demo/input/input3.tsx"></code>

### Input

| 参数           | 说明                                                      | 类型                                            | 默认值 | 必填 |
| -------------- | --------------------------------------------------------- | ----------------------------------------------- | ------ | ---- |
| className      | 输入框容器类名                                            | string                                          | 无     | 否   |
| inputClassName | 输入框类名（textarea 也适用）                             | string                                          | 无     | 否   |
| type           | 输入框类型                                                | "text" \| "password" \| "textarea" \| "int"     | "text" | 否   |
| disabled       | 禁用状态                                                  | boolean                                         | false  | 否   |
| maxLength      | 可输入的最大长度                                          | number                                          | 无     | 否   |
| value          | 输入框里的内容（受控）                                    | string                                          | 无     | 否   |
| onChange       | 输入框里的内容变化时的回调                                | function({e: ChangeEvent, value: string}): void | 无     | 否   |
| showCount      | 显示输入内容的长度（需要同时设置 maxLength 属性才会显示） | boolean                                         | false  | 否   |
| rows           | 多行输入框的行数（高度）                                  | number                                          | 3      | 否   |

### css 变量

| 变量                     | 说明                                        |
| ------------------------ | ------------------------------------------- |
| --input-color            | 输入框文本颜色                              |
| --input-border           | 输入框边框样式                              |
| --input-bgColor          | 输入框背景色                                |
| --disabled-input-color   | 输入框禁用状态文本颜色                      |
| --disabled-input-border  | 输入框禁用状态边框样式                      |
| --disabled-input-bgColor | 输入框禁用状态背景色                        |
| --input-width            | 输入框宽度                                  |
| --input-font-size        | 输入框文本大小                              |
| --input-line-height      | 输入框行高                                  |
| --input-border-radius    | 输入框圆角大小                              |
| --input-padding          | 输入框 padding                              |
| --input-vertical-align   | 纵向对齐样式                                |
| --textarea-font-size     | 多行输入框文本大小                          |
| --textarea-line-height   | 多行输入框行高                              |
| --textarea-resize        | 多行输入框是否带调整大小功能（resize 属性） |

### 特别说明

input 和 textarea 原生支持的属性，如 placeholder 等，都可以使用

showCount 只有设置了 maxLength 的时候才生效

### todo

前缀
后缀
