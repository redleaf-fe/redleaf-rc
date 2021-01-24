## Message

### 基本使用

<code src="../demo/message/message1.tsx"></code>

### 避免相同内容的 message 弹出多次

<code src="../demo/message/message2.tsx"></code>

### 设置显示时间

单位 ms，不传使用默认时间，传小于等于 0 的数或 NaN 不会自动销毁

<code src="../demo/message/message3.tsx"></code>

### 手动销毁

show 函数返回一个 close 函数，调用该函数可销毁 Message

也可以使用 notify，notify 中使用了 show 函数，并增加了关闭按钮

时间传小于等于 0 的数或 NaN 不会自动销毁

<code src="../demo/message/message4.tsx"></code>

### 位置

<code src="../demo/message/message5.tsx"></code>

### Message 函数

| 函数   | 说明                                                                                               |
| ------ | -------------------------------------------------------------------------------------------------- |
| show   | 显示 Message，参数见下文，返回一个 close 函数，可用于销毁 Message                                  |
| notify | 使用了 show，并添加了关闭按钮，传入 duration 参数无效，notify 使用 show 函数时传入的 duration 为 0 |
| config | 用于设置 Message 展示的默认时间，参数 duration                                                     |

### show 函数的参数

| 参数      | 说明                                                                              | 类型                                                     | 默认值 | 必填 |
| --------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- | ------ | ---- |
| className | 内容部分的类名                                                                    | string                                                   | 无     | 否   |
| content   | 消息内容                                                                          | ReactNode                                                | 无     | 是   |
| duration  | 消息展示的时间，单位 ms，不传使用默认时间，传一个小于等于 0 的数或 NaN 不自动销毁 | number                                                   | 2000   | 否   |
| key       | 用于保证同内容的 Message 只弹出一次                                               | string                                                   | 无     | 否   |
| position  | Message 展示位置，不填默认在视口中上部展示                                        | "topLeft" \| "topRight" \| "bottomLeft" \| "bottomRight" | 无     | 否   |

### css 变量

| 变量                      | 说明               |
| ------------------------- | ------------------ |
| --message-color           | 消息内容文本颜色   |
| --message-bgColor         | 消息内容背景色     |
| --message-box-shadow      | 消息边框阴影颜色   |
| --message-z-index         | 消息 z-index       |
| --message-content-padding | 消息内容的 padding |

### 特别说明

Message 的每种位置有一个容器，容器是 fixed 定位，z-index 值为 9999
