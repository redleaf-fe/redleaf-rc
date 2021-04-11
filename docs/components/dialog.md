## Dialog

### 基本使用

<code src="../demo/dialog/dialog1.tsx"></code>

### 位置

<code src="../demo/dialog/dialog2.tsx"></code>

### 更新对话框中的内容

<code src="../demo/dialog/dialog3.tsx"></code>

### 对话框层叠

<code src="../demo/dialog/dialog4.tsx"></code>

### show 函数的参数

| 参数          | 说明                 | 类型                                               | 默认值   | 必填 |
| ------------- | -------------------- | -------------------------------------------------- | -------- | ---- |
| className     |                      | string                                             | 无       | 否   |
| title         | 对话框的标题         | ReactNode                                          | 无       | 是   |
| content       | 对话框里的内容       | ReactNode                                          | 无       | 否   |
| maskClosable  | 点击遮罩是否可以关闭 | boolean                                            | false    | 否   |
| position      | 对话框显示位置       | "center" \| "top" \| "bottom" \| "left" \| "right" | "center" | 否   |
| showCloseIcon | 是否显示关闭按钮     | boolean                                            | true     | 否   |
| onClose       | 对话框关闭时的回调   | function(): void                                   | 无       | 否   |

### css 变量

| 变量                       | 说明                 |
| -------------------------- | -------------------- |
| --dialog-mask-bgColor      | 对话框遮罩的背景色   |
| --dialog-mask-z-index      | 对话框的 z-index     |
| --dialog-color             | 对话框文本颜色       |
| --dialog-bgColor           | 对话框背景色         |
| --dialog-padding           | 对话框的 padding     |
| --dialog-border-radius     | 对话框的圆角大小     |
| --dialog-title-font-size   | 对话框标题的文本大小 |
| --dialog-title-line-height | 对话框标题的行高     |
| --dialog-font-size         | 对话框内容的文本大小 |
| --dialog-line-height       | 对话框内容的行高     |
