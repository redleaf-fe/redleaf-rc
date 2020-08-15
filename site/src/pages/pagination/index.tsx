import React from "react";
import { CodeViewer } from "../../common";
import { useState } from "react";
import { Pagination } from "rhino-rc";

const Pagination1 = () => {
  return (
    <>
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
  );
};

const Pagination2 = () => {
  const [curPage, setCurPage] = useState(1);
  return (
    <>
      <Pagination
        className="block mb8"
        totalItems={186}
        currentPage={curPage}
        onCurrentPageChange={(page: number) => {
          {
            /* 遇到偶数页，往后走一页 */
          }
          if (page % 2 === 0) {
            setCurPage(page + 1);
          } else {
            setCurPage(page);
          }
        }}
      />
    </>
  );
};

export default class extends React.Component {
  render() {
    return (
      <>
        <h2>Pagination</h2>
        <span>
          可能分页的“下一页”按钮的位置看上去比较奇怪，放在前部而不是尾部是因为翻页过程中，页码的个数会变化，导致“下一页”会发生位移，如果在尾部，就不适合连续点击
        </span>
        <br />
        <h3 id="基本使用">基本使用</h3>
        <CodeViewer
          source={`// <!-- Pagination1 -->
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
);`}
        >
          <Pagination1 />
        </CodeViewer>
        <h3 id="受控形式">受控形式</h3>
        <CodeViewer
          source={`// <!-- Pagination2 -->
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
);`}
        >
          <Pagination2 />
        </CodeViewer>
        <h3 id="Pagination">Pagination</h3>
        <table className="table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
              <th>必填</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>size</td>
              <td>Pagination元素的大小</td>
              <td>number | string</td>
              <td>20</td>
              <td>否</td>
            </tr>
            <tr>
              <td>color</td>
              <td>Pagination元素的颜色</td>
              <td>string(同css中的颜色值)</td>
              <td>'#333'</td>
              <td>否</td>
            </tr>
          </tbody>
        </table>
        <div className="right-nav-contain">
          <a className="right-nav" href="#基本使用">
            基本使用
          </a>
          <a className="right-nav" href="#受控形式">
            受控形式
          </a>
          <a className="right-nav" href="#Pagination">
            Pagination
          </a>
        </div>
      </>
    );
  }
}
