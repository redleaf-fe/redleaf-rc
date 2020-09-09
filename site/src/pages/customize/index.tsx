import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class extends React.Component {
  render() {
    return (
      <>
        <h2>定制</h2>
        <h3># 颜色</h3>
        <span className="plain-text-md">
        rihno-rc提供了很多CSS变量，用于对组件的颜色进行定制，每个组件支持的CSS变量在组件的说明中都有列出
        </span>
        <br/>
        <span className="plain-text-md">
        例如想要primary类型的按钮的背景色为黄色，文本颜色为蓝色，可以这样写
        </span>
        <SyntaxHighlighter language="jsx" style={vs} customStyle={{fontSize: 14}}>
          {`.demo {
  --primary-button-bgColor: yellow;
  --colors-button-color: blue
}`}
        </SyntaxHighlighter>
        <span className="plain-text-md">
        也可以用js动态设置
        </span>
        <SyntaxHighlighter language="jsx" style={vs} customStyle={{fontSize: 14}}>
          {`document.body.style.setProperty('--primary-button-bgColor', 'yellow');
document.body.style.setProperty('--colors-button-color', 'blue');`}
        </SyntaxHighlighter>
        <span className="plain-text-md">
        也可以直接对主题色进行设置，但是一个主题色会在很多组件中使用，所以不推荐这样做
        </span>

        <h3># 语言</h3>
        <span className="plain-text-md">
        ConfigProvider组件提供了国际化功能，对于一些组件内置的短语，可以选择中文或英文
        </span>
        <br/>
        <span className="plain-text-md">
        如果需要其他语言，或者需要对某一个短语进行配置，可以使用langText属性，支持该属性的组件在对应的文档内容中有描述
        </span>
        <br/>
        <span className="plain-text-md">
        例如想要Pagination组件
        </span>

        <h3># 其他</h3>
        <span className="plain-text-md">
        除了每种组件最外层的className和style属性，rihno-rc提供了内部每个container标签的className
        </span>
        <br/>
        <span className="plain-text-md">
        可以通过覆盖类名进行样式的修改，例如Pagination组件有itemClassName，Table组件有trClassName、tdClassName等
        </span>
      </>
    );
  }
}
