import React from "react";
import PropTypes from "prop-types";
import * as zh from "./zh-CN";
import * as en from "./en-US";

const langMap: baseProps = {
  "zh-CN": zh,
  "en-US": en,
};

const context = React.createContext({ lang: "zh-CN" });

export interface IProps extends baseProps {
  lang?: "zh-CN" | "en-US";
}

const Provider = (props: IProps) => {
  const { lang = "zh-CN", children, ...restProps } = props;
  return (
    <context.Provider value={{ lang, ...restProps }}>
      {children}
    </context.Provider>
  );
};

Provider.propTypes = {
  lang: PropTypes.oneOf(["zh-CN", "en-US"]),
};

Provider.defaultProps = {
  lang: "zh-CN",
};

const Consumer = (props: baseProps) => {
  const { children, ...restProps } = props;
  return (
    <context.Consumer>
      {(value) => {
        const { lang, ...restVal } = value;
        return children({ lang: langMap[lang], ...restVal, ...restProps });
      }}
    </context.Consumer>
  );
};

export default {
  Provider,
  Consumer,
};
