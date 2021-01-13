---
nav:
  title: Components
  path: /components
---

## ResizeObserver

### 基本使用

```tsx
import React from 'react';
import { ResizeObserver } from 'redleaf-rc';
import '../doc.less';

const ResizeObserver1 = () => {
  return (
    <ResizeObserver
      onResize={entries => {
        entries.forEach(entry => {
          console.log(entry);
        });
      }}
    >
      <div className="inline-block">123</div>
      <br />
      <div className="inline-block">123123</div>
      <br />
      <div className="inline-block">123123123</div>
    </ResizeObserver>
  );
};

export default () => <ResizeObserver1 />;
```

### ResizeObserver

| 参数     | 说明                                               | 类型                                         | 默认值 | 必填 |
| -------- | -------------------------------------------------- | -------------------------------------------- | ------ | ---- |
| children | 要监听大小变更的元素，只监听一层，不会往更深层遍历 | ReactNode                                    | 无     | 是   |
| onResize | 大小变更时的回调函数，节流需要自己做               | function(entries:ResizeObserverEntry[]):void | 无     | 是   |

### ResizeObserverEntry

有若干属性，其中比较常用的是 target，contentRect 两个，target 是大小发生变化的元素，contentRect 是描述元素的宽高和位置信息
