import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { prefixCls } from '../constants';
import { baseProps } from '../types';
import { IconClose } from '../icon';
import { scrollLock } from '../utils/dom';

import '../styles/common.less';
import './style.less';

/*
todo: 
position: center right left top bottom 增加其他几种位置的demo
*/
export interface DialogParam extends baseProps {
  className?: string;
  content?: ReactNode;
  title: ReactNode;
  maskClosable?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  showCloseIcon?: boolean;
  onClose?: () => void;
}

const show = (param: DialogParam): (() => void) | undefined => {
  const {
    className,
    content,
    title,
    maskClosable = false,
    position = 'center',
    showCloseIcon = false,
    onClose,
  } = param;

  let container: HTMLElement | null = document.createElement('span');
  container.className = `${prefixCls}-dialog-container`;
  className && container?.classList.add(className);
  document.body.appendChild(container);

  // 处理滚动穿透
  const unlock = scrollLock();

  let maskRef: HTMLElement | null = null;

  const closeFunc = () => {
    document.body.removeChild(container as HTMLElement);
    maskRef?.removeEventListener('click', closeFunc);
    container = null;
    maskRef = null;

    unlock();

    typeof onClose === 'function' && onClose();
  };

  ReactDOM.render(
    <>
      <span className="dialog-mask" ref={ref => (maskRef = ref)} />
      <span className={`dialog dialog-${position}`}>
        {(showCloseIcon || title) && (
          <span className="dialog-header">
            {title && <span className="dialog-title">{title}</span>}
            {showCloseIcon && (
              <svg
                className="dialog-close"
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
        {content && <span className="dialog-content">{content}</span>}
      </span>
    </>,
    container,
  );

  if (maskClosable && maskRef) {
    (maskRef as HTMLElement).addEventListener('click', closeFunc);
  }

  return closeFunc;
};

const Dialog = {
  show,
};

export default Dialog;