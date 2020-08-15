import _kebabCase from "lodash/kebabCase";
import * as pages from "./pages";

export default Object.keys(pages).map((v, k) => {
  return {
    path: '/' + _kebabCase(v),
    Comp: pages[v],
    name: v,
  };
});
