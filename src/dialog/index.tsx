import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import cls from "classnames";

import { prefixCls } from "../constants";
import { baseProps } from "../types";
import { IconClose } from "../icon";
import { scrollLock } from "../utils/dom";

import "../styles/common.less";
import "./style.less";

export interface DialogParam extends baseProps {
  className?: string;
  innerClassName?: string;
  content?: ReactNode;
  title?: ReactNode;
  maskClosable?: boolean;
  position?: "center" | "top" | "bottom" | "left" | "right";
  showCloseIcon?: boolean;
  onClose?: () => void;
}

const show = (param: DialogParam): (() => void) | undefined => {
  const {
    className,
    innerClassName,
    content,
    title,
    maskClosable = false,
    position = "center",
    showCloseIcon = true,
    onClose,
  } = param;

  let container: HTMLElement | null = document.createElement("span");
  container.className = `${prefixCls}-dialog-container`;
  className && container?.classList.add(className);
  document.body.appendChild(container);

  // 处理滚动穿透
  const unlock = scrollLock();

  let maskRef: HTMLElement | null = null;
  let dlgRef: HTMLElement | null = null;

  const closeFunc = () => {
    dlgRef?.classList.add(`${prefixCls}-dialog-fadeout`);
    setTimeout(() => {
      document.body.removeChild(container as HTMLElement);
      maskRef?.removeEventListener("click", closeFunc);
      dlgRef = null;
      maskRef = null;
      container = null;

      unlock();

      onClose?.();
    }, 280);
  };

  ReactDOM.render(
    <>
      <span
        className={`${prefixCls}-dialog-mask`}
        ref={(ref) => (maskRef = ref)}
      />
      <span
        className={cls(
          `${prefixCls}-dialog ${prefixCls}-dialog-${position}`,
          innerClassName
        )}
        ref={(ref) => (dlgRef = ref)}
      >
        {(showCloseIcon || title) && (
          <span className={`${prefixCls}-dialog-header`}>
            {title && (
              <span className={`${prefixCls}-dialog-title`}>{title}</span>
            )}
            {showCloseIcon && (
              <svg
                className={`${prefixCls}-dialog-close`}
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
        {content && (
          <span className={`${prefixCls}-dialog-content`}>{content}</span>
        )}
      </span>
    </>,
    container
  );

  if (maskClosable && maskRef) {
    (maskRef as HTMLElement).addEventListener("click", closeFunc);
  }

  return closeFunc;
};

const Dialog = {
  show,
};

export default Dialog;
