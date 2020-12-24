import React from "react";
import {CodeViewer} from "../../common";
import {useState} from "react";
import {Pagination, Button} from 'redleaf-rc';


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



const Pagination2 = ()=>{
  const [curPage, setCurPage] = useState(1)
  return <>
    <Pagination
      className="block mb8"
      totalItems={186}
      currentPage={curPage}
      onChange={(page)=>{
        console.log("当前是第" + page + "页")
      }}
    />
    <Button onClick={()=>{console.log('change'); setCurPage(3)}}>跳到第3页</Button>
  </>
};



const Pagination3 = ()=>{
  const [items, setItems] = useState(186);
  return <>
    <Pagination
      className="block mb8"
      totalItems={items}
      renderTotalItems={({totalItems, currentPage, pageSize, pages})=>{
        return <span className="mr8">
          共{totalItems}项数据，共{pages}页，每页{pageSize}项，当前第{currentPage}页
        </span>
    }} />
    <Button onClick={()=>{
      setItems(items + 9);
    }}>add items</Button>
  </>
};



const Pagination4 = ()=>{
  return <>
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageJumper
        showPageSizeChanger
        onChange={(page, size)=>{
          console.log(page, size)
        }}
        onPageSizeChange={(page, size)=>{
          console.log(page, size)
        }}
      />
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageJumper
        onChange={(page, size)=>{
          console.log(page, size)
        }}
      />
    自定义每页条数选项：
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageSizeChanger
        onChange={(page, size)=>{
          console.log(page, size)
        }}
        onPageSizeChange={(page, size)=>{
          console.log(page, size)
        }}
        pageSizeList={[30, 60, 100]}
      />
  </>
};



export default class extends React.Component {
  render(){
    return (<><h2>Pagination</h2>
<h3 id="基本使用"># 基本使用</h3>
<CodeViewer source={`// <!-- Pagination1 -->
import {Pagination} from 'redleaf-rc';

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
);`}><Pagination1 /></CodeViewer>
<h3 id="受控形式"># 受控形式</h3>
<CodeViewer source={`// <!-- Pagination2 -->
import {Pagination} from 'redleaf-rc';

// --
const Pagination2 = ()=>{
  const [curPage, setCurPage] = useState(1)
  return <>
    <Pagination
      className="block mb8"
      totalItems={186}
      currentPage={curPage}
      onChange={(page)=>{
        console.log("当前是第" + page + "页")
      }}
    />
    <Button onClick={()=>{console.log('change'); setCurPage(3)}}>跳到第3页</Button>
  </>
};

// --
ReactDOM.render(
  <Pagination2 />,
  document.getElementById('root')
);`}><Pagination2 /></CodeViewer>
<h3 id="显示分页信息"># 显示分页信息</h3>
<CodeViewer source={`// <!-- Pagination3 -->
import {Pagination, Button} from 'redleaf-rc';

// --
const Pagination3 = ()=>{
  const [items, setItems] = useState(186);
  return <>
    <Pagination
      className="block mb8"
      totalItems={items}
      renderTotalItems={({totalItems, currentPage, pageSize, pages})=>{
        return <span className="mr8">
          共{totalItems}项数据，共{pages}页，每页{pageSize}项，当前第{currentPage}页
        </span>
    }} />
    <Button onClick={()=>{
      setItems(items + 9);
    }}>add items</Button>
  </>
};

// --
ReactDOM.render(
  <Pagination3 />,
  document.getElementById('root')
);`}><Pagination3 /></CodeViewer>
<h3 id="跳页和修改每页条数"># 跳页和修改每页条数</h3>
<CodeViewer source={`// <!-- Pagination4 -->
import {Pagination} from 'redleaf-rc';

// --
const Pagination4 = ()=>{
  return <>
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageJumper
        showPageSizeChanger
        onChange={(page, size)=>{
          console.log(page, size)
        }}
        onPageSizeChange={(page, size)=>{
          console.log(page, size)
        }}
      />
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageJumper
        onChange={(page, size)=>{
          console.log(page, size)
        }}
      />
    自定义每页条数选项：
      <Pagination
        className="block mb8"
        totalItems={186}
        showPageSizeChanger
        onChange={(page, size)=>{
          console.log(page, size)
        }}
        onPageSizeChange={(page, size)=>{
          console.log(page, size)
        }}
        pageSizeList={[30, 60, 100]}
      />
  </>
};

// --
ReactDOM.render(
  <Pagination4 />,
  document.getElementById('root')
);`}><Pagination4 /></CodeViewer>
<h3 id="Pagination"># Pagination</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>className</td>
<td>分页容器的类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>itemClassName</td>
<td>每个分页页码的类名，包含“上一页”和“下一页”</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>currentPage</td>
<td>当前在第几页，受控模式下需要传</td>
<td>string | number</td>
<td>无</td>
<td>否</td></tr>
<tr><td>pageSize</td>
<td>每页条数</td>
<td>string | number</td>
<td>10</td>
<td>否</td></tr>
<tr><td>totalItems</td>
<td>总内容数量</td>
<td>string | number</td>
<td>0</td>
<td>是</td></tr>
<tr><td>onChange</td>
<td>当前页改变时的回调，受控模式下通过它来获取切换到了第几页</td>
<td>function(page: number, pageSize: number): void</td>
<td>无</td>
<td>否</td></tr>
<tr><td>renderTotalItems</td>
<td>总数和当前第几页的渲染方法</td>
<td>{`function({totalItems: number, currentPage: number, pageSize: number, pages: number}): ReactNode`}</td>
<td>无</td>
<td>否</td></tr>
<tr><td>showPageJumper</td>
<td>显示跳页部件</td>
<td>boolean</td>
<td>false</td>
<td>否</td></tr>
<tr><td>showPageSizeChanger</td>
<td>显示切换每页条数的部件</td>
<td>boolean</td>
<td>false</td>
<td>否</td></tr>
<tr><td>onPageSizeChange</td>
<td>每页条数变化时的回调</td>
<td>function(page: number, pageSize: number): void</td>
<td>无</td>
<td>否</td></tr>
<tr><td>pageSizeList</td>
<td>切换每页条数的选项数组</td>
<td>number[]</td>
<td>[10, 20, 50]</td>
<td>否</td></tr></tbody>
</table>
<h3 id="css 变量"># css 变量</h3>
<table className="table">
<thead>
<tr><th>变量</th>
<th>说明</th></tr>
</thead>
<tbody><tr><td>--pagination-item-color</td>
<td>分页页码的文本颜色</td></tr>
<tr><td>--pagination-item-border</td>
<td>分页页码的边框样式</td></tr>
<tr><td>--pagination-item-bgColor</td>
<td>分页页码的背景色</td></tr>
<tr><td>--pagination-item-hover-color</td>
<td>分页页码 hover 状态的文本颜色</td></tr>
<tr><td>--pagination-item-hover-border</td>
<td>分页页码 hover 状态的边框样式</td></tr>
<tr><td>--pagination-item-hover-bgColor</td>
<td>分页页码 hover 状态的背景色</td></tr>
<tr><td>--pagination-item-active-color</td>
<td>分页页码激活状态的文本颜色</td></tr>
<tr><td>--pagination-item-active-border</td>
<td>分页页码激活状态的边框样式</td></tr>
<tr><td>--pagination-item-active-bgColor</td>
<td>分页页码激活状态的背景色</td></tr>
<tr><td>--pagination-font-size</td>
<td>分页文本文本大小</td></tr>
<tr><td>--pagination-line-height</td>
<td>分页文本行高</td></tr>
<tr><td>--pagination-item-padding</td>
<td>分页页码 paddingg</td></tr>
<tr><td>--pagination-item-border-radius</td>
<td>分页页码圆角大小</td></tr>
<tr><td>--pagination-item-margin-right</td>
<td>分页页码 margin-right</td></tr>
<tr><td>--pagination-page-jump-width</td>
<td>跳页输入框宽度</td></tr>
<tr><td>--pagination-size-change-width</td>
<td>每页条数选择框宽度</td></tr></tbody>
</table>
<h3 id="langText 属性"># langText 属性</h3>
<table className="table">
<thead>
<tr><th>属性</th>
<th>说明</th></tr>
</thead>
<tbody><tr><td>prevPage</td>
<td>“上一页”的文本</td></tr>
<tr><td>nextPage</td>
<td>“下一页”的文本</td></tr>
<tr><td>goto</td>
<td>跳页的文本</td></tr>
<tr><td>page</td>
<td>跳页输入框后跟的页码单位，中文为“页”，英文为空字符串</td></tr>
<tr><td>sizeUint</td>
<td>每页条数选择框的单位，中文为“条/页”，英文为"/ page"</td></tr></tbody>
</table>
<div className="right-nav-contain"><a className="right-nav" href="#基本使用">基本使用</a>
<a className="right-nav" href="#受控形式">受控形式</a>
<a className="right-nav" href="#显示分页信息">显示分页信息</a>
<a className="right-nav" href="#跳页和修改每页条数">跳页和修改每页条数</a>
<a className="right-nav" href="#Pagination">Pagination</a>
<a className="right-nav" href="#css 变量">css 变量</a>
<a className="right-nav" href="#langText 属性">langText 属性</a></div></>)
  }
}