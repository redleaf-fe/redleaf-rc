import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './style.less'

export default (props: baseProps)=>{
  return <div className="code-viewer">
    <div className="preview-area">
      {props.children}
    </div>
    {/* <div className="show-code" onClick={()=>{

    }}>
      show me the code
    </div> */}
    <SyntaxHighlighter language="jsx" style={vs} customStyle={{fontSize: 14}}>
      {props.source}
    </SyntaxHighlighter>
  </div>
}
