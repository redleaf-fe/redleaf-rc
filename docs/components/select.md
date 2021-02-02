## Select

### 基本使用

<code src="../demo/select/select1.tsx"></code>

### 异步请求数据作为 options

回调函数没有做节流，需要自己处理

<code src="../demo/select/select2.tsx"></code>

### Select

| 参数             | 说明                               | 类型                                                       | 默认值     | 必填 |
| ---------------- | ---------------------------------- | ---------------------------------------------------------- | ---------- | ---- |
| className        | 选择框容器类名                     | string                                                     | 无         | 否   |
| itemsClassName   | 选择框选中选项的容器类名           | string                                                     | 无         | 否   |
| optionsClassName | 选择框选项容器类名                 | string                                                     | 无         | 否   |
| type             | 选择框类型                         | "single" \| "multi"                                        | "single"   | 否   |
| disabled         | 禁用状态                           | boolean                                                    | false      | 否   |
| readOnly         | 只读状态                           | boolean                                                    | false      | 否   |
| maxNum           | 最多可选的选项个数                 | number                                                     | 无         | 否   |
| value            | 选中的选项值的数组（受控）         | string[]                                                   | 无         | 否   |
| onChange         | 选项变化时的回调                   | function({value: string[], selection: ISelection[]}): void | 无         | 否   |
| onSearch         | 搜索选项输入框内容变化时的回调     | function(value: string): void                              | 无         | 否   |
| options          | 选项数据                           | ISelectOption[]                                            | []         | 否   |
| placeholder      | 占位文本                           | string                                                     | "请选择"   | 否   |
| searchNodata     | 搜索选项时搜索不到结果时的提示文本 | string                                                     | "暂无数据" | 否   |
| showSearch       | 是否带选项搜索功能                 | boolean                                                    | true       | 否   |
| showClearIcon    | 是否显示清除按钮                   | boolean                                                    | true       | 否   |

### ISelection

| 参数  | 说明             | 类型   | 默认值 | 必填 |
| ----- | ---------------- | ------ | ------ | ---- |
| text  | 选项展示用的文本 | string | 无     | 是   |
| value | 选项的值         | string | 无     | 是   |

### ISelectOption

| 参数     | 说明             | 类型    | 默认值 | 必填 |
| -------- | ---------------- | ------- | ------ | ---- |
| text     | 选项展示用的文本 | string  | 无     | 是   |
| value    | 选项的值         | string  | 无     | 是   |
| disabled | 选项是否可用     | boolean | 无     | 否   |

### css 变量

| 变量                             | 说明                             |
| -------------------------------- | -------------------------------- |
| --select-items-border            | 选中选项的容器的边框样式         |
| --select-items-bgColor           | 选中选项的容器的背景色           |
| --select-items-color             | 选中选项的容器的文本颜色         |
| --select-items-border-radius     | 选中选项的容器的圆角大小         |
| --select-items-padding           | 选中选项的容器的 padding         |
| --select-items-font-size         | 选中选项的容器的文本大小         |
| --select-items-line-height       | 选中选项的容器的行高             |
| --disabled-select-items-color    | 选中选项的容器禁用状态的文本颜色 |
| --disabled-select-items-border   | 选中选项的容器禁用状态的边框样式 |
| --disabled-select-items-bgColor  | 选中选项的容器禁用状态的背景色   |
| --select-item-bgColor            | 选中选项的背景色                 |
| --select-item-color              | 选中选项的文本颜色               |
| --select-item-font-size          | 选中选项的文本大小               |
| --select-item-line-height        | 选中选项的行高                   |
| --select-item-padding            | 选中选项的 padding               |
| --select-item-margin             | 选中选项的 margin                |
| --select-item-border-radius      | 选中选项的圆角大小               |
| --select-options-z-index         | 选项容器的 z-index               |
| --select-options-bgColor         | 选项容器的背景色                 |
| --select-options-border-radius   | 选项容器的圆角大小               |
| --select-options-topOffset       | 选项容器和选择框的距离           |
| --select-options-box-shadow      | 选项容器的阴影样式               |
| --select-options-maxHeight       | 选项容器的最大高度               |
| --select-option-font-size        | 选项的文本大小                   |
| --select-option-line-height      | 选项的行高                       |
| --select-option-bgColor          | 选项的背景色                     |
| --select-option-color            | 选项的文本颜色                   |
| --select-option-hover-bgColor    | 选项 hover 状态的背景色          |
| --select-option-hover-color      | 选项 hover 状态的文本颜色        |
| --select-option-padding          | 选项的 padding                   |
| --disabled-select-option-bgColor | 禁用选项的背景色                 |
| --disabled-select-option-color   | 禁用选项的文本颜色               |
| --select-width                   | 选择框的宽度                     |
| --select-vertical-align          | 选择框纵向对齐样式               |
| --select-placeholder-color       | placeholder 文本颜色             |

### todo

optionValue
optionText
