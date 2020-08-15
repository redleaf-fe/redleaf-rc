```import
import {Loading} from 'rhino-rc';
```
## Loading

### 基本使用
```component
// <!-- Loading1 -->
import {Loading} from 'rhino-rc';

// --
const Loading1 = ()=>{
  return <>
    <Loading />
  </>
};

// --
ReactDOM.render(
  <Loading1 />,
  document.getElementById('root')
);
```

### 设置大小、颜色
```component
// <!-- Loading2 -->
import {Loading} from 'rhino-rc';

// --
const Loading2 = ()=>{
  return <>
    {/* 颜色按照css样式中一样写即可 */}
    <Loading className="mr8" color="red" />
    <Loading className="mr8" color="#0a0" />
    <Loading className="mr8" color="rgb(0 ,0, 200)" />

    <Loading className="mr8" size="25" />
    <Loading className="mr8" size={15} />
  </>
};

// --
ReactDOM.render(
  <Loading2 />,
  document.getElementById('root')
);
```

### Loading
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
size | loading元素的大小 | number \| string | 20 | 否
color | loading元素的颜色 | string(同css中的颜色值) | '#333' | 否
