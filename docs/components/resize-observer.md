## ResizeObserver

ResizeObserver 监听子组件大小需要获取子组件的实例，原生节点（如 div、span）不需要处理，自定义组件需要 forwardRef 包裹，并在组件内部指定实例，或者使用原生节点进行包裹

React.isValidElement 判断能通过的元素才会作为监听的节点，比如纯文本节点就不会进行监听

### 基本使用

<code src="../demo/resize-observer/resize-observer1.tsx"></code>

### Props

| 参数     | 说明                                               | 类型                                                                   | 默认值 | 必填 |
| -------- | -------------------------------------------------- | ---------------------------------------------------------------------- | ------ | ---- |
| children | 要监听大小变更的元素，只监听一层，不会往更深层遍历 | ReactNode                                                              | 无     | 是   |
| onResize | 大小变更时的回调函数，节流需要自己做               | function(entries: [ResizeObserverEntry](#resizeobserverentry)[]): void | 无     | 是   |

### ResizeObserverEntry

有若干属性，其中比较常用的是 target，contentRect 两个，target 是大小发生变化的元素，contentRect 是描述元素的宽高和位置信息
