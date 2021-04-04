## Message

### 基本使用

如果不需要标题，但需要关闭按钮，可以把 content 留空，在 title 里填上内容

<code src="../demo/message/message1.tsx"></code>

### 避免相同内容的 message 弹出多次

<code src="../demo/message/message2.tsx"></code>

### 设置显示时间

单位 ms，不传使用默认时间，传小于等于 0 的数或 NaN 不会自动销毁

<code src="../demo/message/message3.tsx"></code>

### 手动销毁

show 函数返回一个 close 函数，调用该函数可销毁 Message

也可以使用 showCloseIcon 来显示关闭按钮

时间传小于等于 0 的数或 NaN 不会自动销毁

<code src="../demo/message/message4.tsx"></code>

### 位置

<code src="../demo/message/message5.tsx"></code>

### Message 函数

| 函数   | 说明                                                              |
| ------ | ----------------------------------------------------------------- |
| show   | 显示 Message，参数见下文，返回一个 close 函数，可用于销毁 Message |
| config | 用于设置 Message 展示的默认时间，参数 duration，单位 ms           |

### show 函数的参数

| 参数             | 说明                                                                              | 类型                                                     | 默认值 | 必填 |
| ---------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- | ------ | ---- |
| className        | 容器部分的类名（可参考[特别说明](#特别说明)）                                     | string                                                   | 无     | 否   |
| contentClassName | 内容部分的类名                                                                    | string                                                   | 无     | 否   |
| content          | 消息内容                                                                          | ReactNode                                                | 无     | 否   |
| title            | 消息标题                                                                          | ReactNode                                                | 无     | 是   |
| duration         | 消息展示的时间，单位 ms，不传使用默认时间，传一个小于等于 0 的数或 NaN 不自动销毁 | number                                                   | 2000   | 否   |
| key              | 用于保证同内容的 Message 只弹出一次                                               | string                                                   | 无     | 否   |
| position         | Message 展示位置，不填默认在视口中上部展示                                        | "topLeft" \| "topRight" \| "bottomLeft" \| "bottomRight" | 无     | 否   |
| showCloseIcon    | 是否关闭按钮                                                                      | boolean                                                  | false  | 否   |
| onClose          | message 关闭时的回调                                                              | function(): void                                         | 无     | 否   |

### css 变量

| 变量                        | 说明                 |
| --------------------------- | -------------------- |
| --message-color             | 消息内容默认文本颜色 |
| --message-bgColor           | 消息内容背景色       |
| --message-border-radius     | 消息内容的圆角大小   |
| --message-box-shadow        | 消息边框阴影样式     |
| --message-z-index           | 消息容器的 z-index   |
| --message-content-padding   | 消息内容的 padding   |
| --message-title-font-size   | 消息标题的文本大小   |
| --message-title-line-height | 消息标题的行高       |
| --message-font-size         | 消息内容的文本大小   |
| --message-line-height       | 消息内容的行高       |

### 特别说明

Message 的每种位置（对应 props 中的 position）有一个容器，容器是 fixed 定位，z-index 值为 9000，每个位置的容器在页面上是唯一的，一个容器中可以有多个 Message 内容
