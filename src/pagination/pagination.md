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
    设置了背景色：
    <Pagination className="block mb8" totalItems={56} itemClassName="bg-red" />
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
        // 遇到偶数页，往后走一页
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

### 显示分页信息
```component
// <!-- Pagination3 -->
import {Pagination} from 'rhino-rc';

// --
const Pagination3 = ()=>{
  return <>
    <Pagination 
      totalItems={186} 
      renderTotalItems={({totalItems, currentPage, pageSize, pages}: 
      {totalItems: number, currentPage: number, pageSize: number, pages: number})=>{
        return <span className="mr8">
          共{totalItems}项数据，
          共{pages}页，
          每页{pageSize}项，
          当前第{currentPage}页
        </span>
    }} />
  </>
};

// --
ReactDOM.render(
  <Pagination3 />,
  document.getElementById('root')
);
```

### Pagination
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
itemClassName | 每个分页页码的类名，包含“上一页”和“下一页” | string | 无 | 否
onCurrentPageChange | 当前页改变时的回调，受控模式下通过它来获取切换到了第几页 | function(page: number) | 无 | 否
currentPage | 当前在第几页，受控模式下需要传 | string \| number | 无 | 否
pageSize | 每页的内容数量 | string \| number | 10 | 否
onPageSizeChange | 每页的内容数量变化时的回调 | function(size: number) | 无 | 否
totalItems | 总内容数量 | string \| number | 0 | 是
renderTotalItems | 总数和当前第几页的渲染方法 | {`function({totalItems: number, currentPage: number, pageSize: number, pages: number}): ReactNode`} | 无 | 否
showPageJumper | 显示跳页部件 | boolean | false | 否
showPageSizeChanger | 显示切换每页内容数量的部件 | boolean | false | 否

### css变量
变量 | 说明 
-- | -- 
--pagination-item-color | 分页页码的字体颜色
--pagination-item-border-color | 分页页码的边框颜色
--pagination-item-bgColor | 分页页码的背景颜色
--pagination-item-hover-color | 分页页码hover状态的字体颜色
--pagination-item-hover-border-color | 分页页码hover状态的边框颜色
--pagination-item-hover-bgColor | 分页页码hover状态的背景颜色
--pagination-item-active-color | 分页页码激活状态的字体颜色
--pagination-item-active-border-color | 分页页码激活状态的边框颜色
--pagination-item-active-bgColor | 分页页码激活状态的背景颜色

### langText属性
属性 | 说明 
-- | -- 
prevPage | “上一页”的文本
nextPage | “下一页”的文本
goto | 跳页的文本
page | 跳页输入框后跟的页码单位，中文为“页”，英文为空字符串
