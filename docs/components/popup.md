## Popup

Popup 是 Trigger 和 Bubble 组合成的，使用场景比较多，所以作为组件之一

### 基础使用

<code src="../demo/popup/popup1.tsx"></code>

### Popup Props

| 参数         | 说明                                                 | 类型                                      | 默认值                                | 必填 |
| ------------ | ---------------------------------------------------- | ----------------------------------------- | ------------------------------------- | ---- |
| children     | Popup 包裹的内容                                     | ReactNode                                 | 无                                    | 是   |
| triggerProps | trigger 的 props 属性，除了 children 和 content 之外 | [TriggerProps](/components/trigger#props) | { type: 'click', topOffset: '-10px' } | 否   |
| bubbleProps  | bubble 的 props 属性，除了 children 之外             | [BubbleProps](/components/bubble#props)   | 无                                    | 否   |
| onOk         | 点击确认的回调                                       | function (): void                         | 无                                    | 否   |
| onCancel     | 点击取消的回调                                       | function (): void                         | 无                                    | 否   |
