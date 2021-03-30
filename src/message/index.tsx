import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import cls from 'classnames';

import { prefixCls } from '../constants';
import { IconClose } from '../icon';
import { baseProps } from '../types';
import { getUniqElementByClass } from '../utils/dom';

import '../styles/common.less';
import './style.less';

let defaultDuration = 2000;
let keyArr: string[] = [];

export interface MessageParam extends baseProps {
  className?: string;
  contentClassName?: string;
  content: ReactNode;
  duration?: number;
  key?: string;
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

const show = (param: MessageParam): (() => void) | undefined => {
  const {
    duration,
    content,
    className,
    contentClassName,
    key,
    position = '',
    onClose,
    onMouseEnter,
    onMouseLeave,
    ...restParam
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
    elemType: 'span',
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
    <span
      className={cls('message-content', contentClassName)}
      onMouseEnter={e => {
        clearTimeout(timer);
        onMouseEnter?.(e);
      }}
      onMouseLeave={e => {
        setTimer();
        onMouseLeave?.(e);
      }}
      {...restParam}
    >
      {content}
    </span>,
    elem,
  );

  return closeFunc;
};

const config = (param: { duration: number }): void => {
  if (Number(param.duration) > 0) {
    defaultDuration = Number(param.duration);
  }
};

const notify = (param: MessageParam): (() => void) | undefined => {
  const { content, contentClassName, ...restParam } = param;
  let close: (() => void) | undefined = undefined;
  const notifyContent = (
    <>
      {content}
      <svg
        className="message-notify-close"
        viewBox="0 0 1024 1024"
        onClick={() => {
          close?.();
        }}
      >
        <path d={IconClose} />
      </svg>
    </>
  );

  close = show({
    content: notifyContent,
    contentClassName: cls('message-notify', contentClassName),
    duration: 0,
    ...restParam,
  });

  return close;
};

const Message = {
  show,
  config,
  notify,
};

export default Message;
