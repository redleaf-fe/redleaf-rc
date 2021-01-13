---
nav:
  title: Components
  path: /components
---

## Loading

### 基本使用

```tsx
import React from 'react';
import { Loading } from 'redleaf-rc';
import '../doc.less';

const Loading1 = () => {
  return (
    <>
      <Loading />
    </>
  );
};

export default () => <Loading1 />;
```

### 设置大小、颜色

```tsx
import React from 'react';
import { Loading } from 'redleaf-rc';
import '../doc.less';

const Loading2 = () => {
  return (
    <>
      {/* 颜色按照css样式中一样写即可 */}
      <Loading className="mr8" color="red" />
      <Loading className="mr8" color="#0a0" />
      <Loading className="mr8" color="rgb(0 ,0, 200)" />
      <Loading className="mr8" size={15} />
    </>
  );
};

export default () => <Loading2 />;
```

### Loading

| 参数      | 说明               | 类型                      | 默认值 | 必填 |
| --------- | ------------------ | ------------------------- | ------ | ---- |
| className | 类名               | string                    | 无     | 否   |
| size      | loading 元素的大小 | number                    | 20     | 否   |
| color     | loading 元素的颜色 | string(同 css 中的颜色值) | '#333' | 否   |
