import React from "react";
import {CodeViewer} from "../../common";
import {useReducer, useEffect} from 'react';
import {Table, Pagination} from 'redleaf-rc';


// 模拟数据，可以不看
function genData(len: number) {
  const arr = [];
  for(let i = 0; i < len; i++){
    arr.push({
      nameKey: {data: 'name' + i},
      ageKey: i,
      descKey: '很长很长的文本' + Math.random(),
      heightKey: i,
      weightKey: i,
      scoreKey: i
    });
  }
  return arr;
}

const tableData = genData(166);

function simuFetch({curPage, pageSize}: {curPage: number, pageSize: number}) {
  return Promise.resolve({
    datasets: tableData.slice((curPage-1)*pageSize, curPage*pageSize),
    totalItems: tableData.length
  });
}

function reducer(state: any, action: any) {
  const {datasets, totalItems}  = action;
  return {datasets, totalItems};
}
// 模拟数据结束

const columns1 = [
  // columnKey支持点号分隔
  {title: 'name', columnKey: 'nameKey.data', width: '20%', textAlign: 'left'},
  {title: 'age', columnKey: 'ageKey', textAlign: 'right'},
  {title: 'desc', columnKey: 'descKey', textAlign: 'center', grow: true},
  {title: 'height', columnKey: 'heightKey', width: '100'},
  {title: 'weight', columnKey: 'weightKey'},
  {title: 'score', columnKey: 'scoreKey', bodyRender: (rawData: any)=>{
    return <div>{rawData.scoreKey}</div>
  }},
];

const Table1 = ()=>{
  const [state, dispatch] = useReducer(reducer, {datasets: [], totalItems: 0});

  useEffect(()=>{
    simuFetch({
      curPage: 1,
      pageSize: 5
    }).then((res)=>{
      dispatch(res);
    });
  }, [])

  return <>
    行有边框
    <Table className="mb8" columns={columns1} datasets={state.datasets} bordered="row" />
    行列都有边框
    <Table className="mb8" columns={columns1} datasets={state.datasets} bordered="full" />
    无边框
    <Table className="mb8" columns={columns1} datasets={state.datasets} bordered="none" />
  </>
};



const Table2 = ()=>{
  const [state, dispatch] = useReducer(reducer, {datasets: [], totalItems: 0});

  useEffect(()=>{
    simuFetch({
      curPage: 1,
      pageSize: 5
    }).then((res)=>{
      dispatch(res);
    });
  }, [])

  return <>
    <Table columns={columns1} datasets={state.datasets} />
    <Pagination
      pageSize={5}
      showPageJumper
      className="mt8 float-right"
      totalItems={state.totalItems}
      onChange={(page)=>{
      simuFetch({
        curPage: page,
        pageSize: 5
      }).then((res)=>{
        dispatch(res);
      });
    }} />
  </>
};



const Table3 = ()=>{
  const [state, dispatch] = useReducer(reducer, {datasets: [], totalItems: 0});

  useEffect(()=>{
    simuFetch({
      curPage: 1,
      pageSize: 5
    }).then((res)=>{
      dispatch(res);
    });
  }, [])

  return <>
    列滚动
    <Table
      className="mb8"
      bordered="full"
      colScrollWidth={1000}
      columns={columns1}
      datasets={state.datasets} />
    行滚动
    <Table
      bordered="full"
      rowScrollHeight={100}
      colScrollWidth={1000}
      columns={columns1}
      datasets={state.datasets} />
  </>
};



export default class extends React.Component {
  render(){
    return (<><h2>Table</h2>
<h3 id="基本使用"># 基本使用</h3>
<CodeViewer source={`// <!-- Table1 -->
import {Table} from 'redleaf-rc';

// --
// 模拟数据，可以不看
function genData(len: number) {
  const arr = [];
  for(let i = 0; i < len; i++){
    arr.push({
      nameKey: {data: 'name' + i},
      ageKey: i,
      descKey: '很长很长的文本' + Math.random(),
      heightKey: i,
      weightKey: i,
      scoreKey: i
    });
  }
  return arr;
}

const tableData = genData(166);

function simuFetch({curPage, pageSize}: {curPage: number, pageSize: number}) {
  return Promise.resolve({
    datasets: tableData.slice((curPage-1)*pageSize, curPage*pageSize),
    totalItems: tableData.length
  });
}

function reducer(state: any, action: any) {
  const {datasets, totalItems}  = action;
  return {datasets, totalItems};
}
// 模拟数据结束

const columns1 = [
  // columnKey支持点号分隔
  {title: 'name', columnKey: 'nameKey.data', width: '20%', textAlign: 'left'},
  {title: 'age', columnKey: 'ageKey', textAlign: 'right'},
  {title: 'desc', columnKey: 'descKey', textAlign: 'center', grow: true},
  {title: 'height', columnKey: 'heightKey', width: '100'},
  {title: 'weight', columnKey: 'weightKey'},
  {title: 'score', columnKey: 'scoreKey', bodyRender: (rawData: any)=>{
    return <div>{rawData.scoreKey}</div>
  }},
];

const Table1 = ()=>{
  const [state, dispatch] = useReducer(reducer, {datasets: [], totalItems: 0});

  useEffect(()=>{
    simuFetch({
      curPage: 1,
      pageSize: 5
    }).then((res)=>{
      dispatch(res);
    });
  }, [])

  return <>
    行有边框
    <Table className="mb8" columns={columns1} datasets={state.datasets} bordered="row" />
    行列都有边框
    <Table className="mb8" columns={columns1} datasets={state.datasets} bordered="full" />
    无边框
    <Table className="mb8" columns={columns1} datasets={state.datasets} bordered="none" />
  </>
};

// --
ReactDOM.render(
  <Table1 />,
  document.getElementById('root')
);`}><Table1 /></CodeViewer>
<h3 id="分页"># 分页</h3>
<span className="plain-text-md">为了灵活，没有将分页组件直接集成在 Table 内</span>
<br />
<CodeViewer source={`// <!-- Table2 -->
import {Table, Pagination} from 'redleaf-rc';

// --
const Table2 = ()=>{
  const [state, dispatch] = useReducer(reducer, {datasets: [], totalItems: 0});

  useEffect(()=>{
    simuFetch({
      curPage: 1,
      pageSize: 5
    }).then((res)=>{
      dispatch(res);
    });
  }, [])

  return <>
    <Table columns={columns1} datasets={state.datasets} />
    <Pagination
      pageSize={5}
      showPageJumper
      className="mt8 float-right"
      totalItems={state.totalItems}
      onChange={(page)=>{
      simuFetch({
        curPage: page,
        pageSize: 5
      }).then((res)=>{
        dispatch(res);
      });
    }} />
  </>
};

// --
ReactDOM.render(
  <Table2 />,
  document.getElementById('root')
);`}><Table2 /></CodeViewer>
<h3 id="行列滚动"># 行列滚动</h3>
<span className="plain-text-md">行滚动需要设置 rowScrollHeight，作为列表除了表头以外的区域的高度</span>
<br />
<span className="plain-text-md">列滚动需要设置 colScrollWidth，作为整个表格完全展示时的宽度</span>
<br />
<CodeViewer source={`// <!-- Table3 -->
import {Table} from 'redleaf-rc';

// --
const Table3 = ()=>{
  const [state, dispatch] = useReducer(reducer, {datasets: [], totalItems: 0});

  useEffect(()=>{
    simuFetch({
      curPage: 1,
      pageSize: 5
    }).then((res)=>{
      dispatch(res);
    });
  }, [])

  return <>
    列滚动
    <Table
      className="mb8"
      bordered="full"
      colScrollWidth={1000}
      columns={columns1}
      datasets={state.datasets} />
    行滚动
    <Table
      bordered="full"
      rowScrollHeight={100}
      colScrollWidth={1000}
      columns={columns1}
      datasets={state.datasets} />
  </>
};

// --
ReactDOM.render(
  <Table3 />,
  document.getElementById('root')
);`}><Table3 /></CodeViewer>
<h3 id="Table"># Table</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>className</td>
<td>表格的类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>thClassName</td>
<td>表格头部单元格类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>tbodyClassName</td>
<td>表格内容容器类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>trClassName</td>
<td>表格内容中一行内容的容器类名（包括表头）</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>tdClassName</td>
<td>表格内容单元格类名</td>
<td>string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>columns</td>
<td>列数据结构</td>
<td><a href="#ITableColumns">ITableColumns</a></td>
<td>[]</td>
<td>是</td></tr>
<tr><td>datasets</td>
<td>表格数据</td>
<td>object[]</td>
<td>[]</td>
<td>是</td></tr>
<tr><td>brodered</td>
<td>带边框</td>
<td>'row' | 'full' | 'row'</td>
<td>'none'</td>
<td>否</td></tr>
<tr><td>colScrollWidth</td>
<td>列滚动宽度</td>
<td>string | number</td>
<td>0</td>
<td>否</td></tr>
<tr><td>rowScrollHeight</td>
<td>行滚动高度</td>
<td>string | number</td>
<td>0</td>
<td>否</td></tr></tbody>
</table>
<h3 id="ITableColumns"># ITableColumns</h3>
<table className="table">
<thead>
<tr><th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
<th>必填</th></tr>
</thead>
<tbody><tr><td>width</td>
<td>每列宽度</td>
<td>number | string</td>
<td>无</td>
<td>否</td></tr>
<tr><td>title</td>
<td>列名，显示在表格头部</td>
<td>string</td>
<td>无</td>
<td>是</td></tr>
<tr><td>columnKey</td>
<td>列信息的 key，用于内容渲染、排序和筛选</td>
<td>string</td>
<td>无</td>
<td>是</td></tr>
<tr><td>bodyRender</td>
<td>单元格渲染方法</td>
<td>function(rowData: any, index: number):ReactNode</td>
<td>无</td>
<td>否</td></tr>
<tr><td>textAlign</td>
<td>对齐方式</td>
<td>'left' | 'right' | 'center'</td>
<td>无</td>
<td>否</td></tr>
<tr><td>grow</td>
<td>已设置宽度的列没有填满表格时是否需要增加此列宽度</td>
<td>'left' | 'right' | 'center'</td>
<td>无</td>
<td>否</td></tr></tbody>
</table>
<h3 id="css 变量"># css 变量</h3>
<table className="table">
<thead>
<tr><th>变量</th>
<th>说明</th></tr>
</thead>
<tbody><tr><td>--table-color</td>
<td>表格文本颜色</td></tr>
<tr><td>--table-thead-bgColor</td>
<td>表头背景色</td></tr>
<tr><td>--table-tbody-bgColor</td>
<td>表格主体背景色</td></tr>
<tr><td>--table-border</td>
<td>表格边框样式</td></tr>
<tr><td>--table-cell-padding</td>
<td>单元格 padding</td></tr>
<tr><td>--table-font-size</td>
<td>表格文本大小</td></tr>
<tr><td>--table-line-height</td>
<td>表格文本行高</td></tr>
<tr><td>--table-overflow-wrap</td>
<td>表格 overflow-wrap 样式</td></tr></tbody>
</table>
<h3 id="特别说明"># 特别说明</h3>
<span className="plain-text-md">colScrollWidth、rowScrollHeight 和 columns 的 width 可以设置单独的数字和字符串值，也可以设置带 px 和带%的值，和 Bubble、Trigger 相似</span>
<br />
<span className="plain-text-md">没有对表格单元格的换行进行处理，如果有很长的连续字符可能将表格的宽度撑变形，如果需要展示完整的内容，可以使用 overflow-wrap 或 word-break，也可以在设置单元格宽度后结合 overflow、text-overflow、white-space 来展示省略号</span>
<br />
<h3 id="todo"># todo</h3>
<span className="plain-text-md">列中的某一些固定
loading
排序、筛选
nodata text
onRow
onHeaderRow
onCell
onHeaderCell</span>
<br />
<span className="plain-text-md">勾选、单选==
拖动排序，拖动调整大小</span>
<div className="right-nav-contain"><a className="right-nav" href="#基本使用">基本使用</a>
<a className="right-nav" href="#分页">分页</a>
<a className="right-nav" href="#行列滚动">行列滚动</a>
<a className="right-nav" href="#Table">Table</a>
<a className="right-nav" href="#ITableColumns">ITableColumns</a>
<a className="right-nav" href="#css 变量">css 变量</a>
<a className="right-nav" href="#特别说明">特别说明</a>
<a className="right-nav" href="#todo">todo</a></div></>)
  }
}