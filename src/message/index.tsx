import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

import { prefixCls } from "../constants";
import { IconClose } from "../icon";
import { baseProps } from "../types";
import { getUniqElementByClass } from "../utils/dom";

import "../styles/common.less";
import "./style.less";

let defaultDuration = 2000;
let keyArr: string[] = [];

export interface MessageParam extends baseProps {
  className?: string;
  content?: ReactNode;
  title: ReactNode;
  duration?: number;
  key?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  showCloseIcon?: boolean;
  onClose?: () => void;
}

const show = (param: MessageParam): (() => void) | undefined => {
  const {
    duration,
    content,
    className,
    key,
    position = "",
    title,
    showCloseIcon = false,
    onClose,
  } = param;

  if (key !== undefined) {
    if (keyArr.includes(String(key))) {
      return;
    } else {
      keyArr.push(String(key));
    }
  }

  // 所有message的容器
  const container = getUniqElementByClass({
    className: `${prefixCls}-message-container${
      position ? "-" + position : ""
    }`,
    elemType: "span",
  });
  className && container.classList.add(className);
  document.body.appendChild(container);

  let timer = -1;

  // 单个message
  let elem: HTMLElement | null = document.createElement("span");
  elem.className = `${prefixCls}-message`;
  container.appendChild(elem);

  const closeFunc = () => {
    container.removeChild(elem as HTMLElement);
    elem = null;
    clearTimeout(timer);
    typeof onClose === "function" && onClose();
    if (key !== undefined) {
      keyArr = keyArr.filter((v) => v !== String(key));
    }
  };

  const setTimer = () => {
    // 不传duration，认为是使用默认时间
    // 传非正数，认为不需要自动隐藏
    if (duration !== undefined) {
      if (Number(duration) > 0) {
        timer = window.setTimeout(closeFunc, Number(duration));
      }
    } else {
      timer = window.setTimeout(closeFunc, defaultDuration);
    }
  };

  setTimer();

  ReactDOM.render(
    <span className="message-inner">
      {(showCloseIcon || title) && (
        <span className="message-header">
          {title && <span className="message-title">{title}</span>}
          {showCloseIcon && (
            <svg
              className="message-close"
              viewBox="0 0 1024 1024"
              onClick={() => {
                closeFunc?.();
              }}
            >
              <path d={IconClose} />
            </svg>
          )}
        </span>
      )}
      {content && <span className="message-content">{content}</span>}
    </span>,
    elem
  );

  return closeFunc;
};

const config = (param: { duration: number }): void => {
  if (Number(param.duration) > 0) {
    defaultDuration = Number(param.duration);
  }
};

const Message = {
  show,
  config,
};

export default Message;
