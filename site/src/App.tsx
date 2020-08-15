import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import routers from "./router.jsx";
import { Layout } from "./common";
import "./style.less";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        {routers.map((v, k) => {
          return (
            <Route key={k} path={v.path} component={v.Comp} />
          );
        })}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
