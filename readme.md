### 为什么要用 redleaf-rc

- redleaf-rc 是一个轻量的，方便查看实现的组件库，没有层层封装，专注于满足最常用的功能
- redleaf-rc 提供了很多 CSS 变量，方便对组件进行样式定制，不需要进行复杂的 hack 就可以符合常用的定制需求

### 安装

```
npm install redleaf-rc -S
或
yarn add redleaf-rc -S
```

### 使用示例

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Check } from 'redleaf-rc';

ReactDOM.render(<Check options={[
  { text: '11', value: '1' },
  { text: '22', value: '2' }
]} />, mountNode);
```

### 完整文档

[http://redleaf.fun/rc/#/components/](http://redleaf.fun/rc/#/components/)

或

[https://redleaf-fe.github.io/rc/#/components/](https://redleaf-fe.github.io/rc/#/components/)

### 参与开发

[开发指南](https://github.com/redleaf-fe/redleaf-rc/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.md)
