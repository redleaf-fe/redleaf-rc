import React from "react";

import routers from "../../router";
import "./style.less";

const renderMenu = () => {
  return (
    <>
      <div className="title">rhino-rc</div>
      {routers.map((v, k) => {
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
