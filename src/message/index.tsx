import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import cls from 'classnames';

import { prefixCls } from '../constants';
import {
  IconClose,
  IconSuccessFill,
  IconCloseFill,
  IconInfoFill
} from '../icon';
import { baseProps } from '../types';
import { getUniqElementByClass } from '../utils/dom';

import '../styles/common.less';
import './style.less';

let defaultDuration = 2000;
let keyArr: string[] = [];

export interface MessageParam extends baseProps {
  className?: string;
  innerClassName?: string;
  content?: ReactNode;
  title?: ReactNode;
  duration?: number;
  key?: string;
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  showCloseIcon?: boolean;
  onClose?: () => void;
}

const show = (param: MessageParam): (() => void) | undefined => {
  const {
    duration,
    content,
    className,
    innerClassName,
    key,
    position = '',
    title,
    showCloseIcon = false,
    onClose
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
      position ? '-' + position : ''
    }`,
    elemType: 'span'
  });
  className && container.classList.add(className);
  document.body.appendChild(container);

  let timer = -1;

  // 单个message
  let elem: HTMLElement | null = document.createElement('span');
  elem.className = `${prefixCls}-message`;
  container.appendChild(elem);

  const closeFunc = () => {
    container.removeChild(elem as HTMLElement);
    elem = null;
    clearTimeout(timer);
    typeof onClose === 'function' && onClose();
    if (key !== undefined) {
      keyArr = keyArr.filter(v => v !== String(key));
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
    <span className={cls(`${prefixCls}-message-inner`, innerClassName)}>
      {(showCloseIcon || title) && (
        <span className={`${prefixCls}-message-header`}>
          {title && (
            <span className={`${prefixCls}-message-title`}>{title}</span>
          )}
          {showCloseIcon && (
            <svg
              className={`${prefixCls}-message-close`}
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
        <span className={`${prefixCls}-message-content`}>{content}</span>
      )}
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

const genFunc = (icon: string, className: string) => {
  return (msg: string) => {
    const close = show({
      title: (
        <>
          <svg
            className={cls(`${prefixCls}-message-icon`, className)}
            viewBox="0 0 1024 1024"
          >
            <path d={icon} />
          </svg>
          <span className={`${prefixCls}-message-msg`}>{msg}</span>
        </>
      )
    });

    return close;
  };
};

const success = genFunc(IconSuccessFill, `${prefixCls}-message-success-icon`);
const error = genFunc(IconCloseFill, `${prefixCls}-message-error-icon`);
const info = genFunc(IconInfoFill, `${prefixCls}-message-info-icon`);

const Message = {
  show,
  config,
  success,
  error,
  info
};

export default Message;
