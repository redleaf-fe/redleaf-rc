import React from "react";

import routers from "../../router";
import "./style.less";

const renderMenu = () => {
  const components = routers.filter(
    (v) => !["Customize", "Statement"].includes(v.name)
  );
  return (
    <>
      <div className="title">rhino-rc</div>
      <a href="/statement">说明</a>
      <a href="/customize">定制</a>
      <div className="divide"></div>
      {components.map((v, k) => {
        return (
          <a key={k} href={v.path}>
            {v.name}
          </a>
        );
      })}
    </>
  );
};

export default (props: baseProps) => {
  return (
    <div className="layout">
      <div className="center-part">{props.children}</div>
      <div className="left-menu">{renderMenu()}</div>
    </div>
  );
};
