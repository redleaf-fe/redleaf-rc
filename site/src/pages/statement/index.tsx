import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class extends React.Component {
  render() {
    return (
      <>
        <h2>说明</h2>
        <span className="plain-text-md">
        rihno-rc是一个轻量的react组件库，没有很多性能优化，也没有很多交互动画，主打特性是能快速看懂组件实现，和便利的组件定制
        </span>
        <br/>
        <span className="plain-text-md">
        如果厌倦了antd的层层封装，以及定制一个组件的颜色时需要写一大堆的样式覆盖，可以来试一试
        </span>
        <br/>
        <span className="plain-text-md">
        目前尚有很多不完善之处，欢迎提PR和Issue，
        <a href="https://github.com/rhino-fe/rhino-rc" target="_blank" rel="noopener noreferrer">github地址</a>
        </span>

        <h3># 安装和使用</h3>
        <SyntaxHighlighter language="jsx" style={vs} customStyle={{fontSize: 14}}>
          {`document.body.style.setProperty('--primary-button-bgColor', 'yellow');
document.body.style.setProperty('--colors-button-color', 'blue');`}
        </SyntaxHighlighter>
      </>
    );
  }
}
