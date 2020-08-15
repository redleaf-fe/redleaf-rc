```import
import {useState} from "react";
import {Pagination} from 'rhino-rc';
```
## Pagination
可能分页的“下一页”按钮的位置看上去比较奇怪，放在前部而不是尾部是因为翻页过程中，页码的个数会变化，导致“下一页”会发生位移，如果在尾部，就不适合连续点击

### 基本使用
```component
// <!-- Pagination1 -->
import {Pagination} from 'rhino-rc';

// --
const Pagination1 = ()=>{
  return <>
    {/* totalItems为0时，不渲染出内容，只有一个外层元素 */}
    <Pagination className="block mb8" totalItems={0} />
    <Pagination className="block mb8" totalItems="6" />
    <Pagination className="block mb8" totalItems={16} />
    <Pagination className="block mb8" totalItems={26} />
    <Pagination className="block mb8" totalItems={56} />
    <Pagination className="block mb8" totalItems="66" />
    <Pagination className="block mb8" totalItems={76} />
    <Pagination className="block mb8" totalItems={86} />
  </>
};

// --
ReactDOM.render(
  <Pagination1 />,
  document.getElementById('root')
);
```

### 受控形式
```component
// <!-- Pagination2 -->
import {Pagination} from 'rhino-rc';

// --
const Pagination2 = ()=>{
  const [curPage, setCurPage] = useState(1)
  return <>
    <Pagination
      className="block mb8"
      totalItems={186}
      currentPage={curPage}
      onCurrentPageChange={(page: number)=>{
        {/* 遇到偶数页，往后走一页 */}
        if(page % 2 === 0){
          setCurPage(page + 1)
        }else{
          setCurPage(page)
        }
      }}
    />
  </>
};

// --
ReactDOM.render(
  <Pagination2 />,
  document.getElementById('root')
);
```

### Pagination
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
size | Pagination元素的大小 | number \| string | 20 | 否
color | Pagination元素的颜色 | string(同css中的颜色值) | '#333' | 否

