import React, { ReactElement, ReactNode, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ResizeObserver from 'resize-observer-polyfill';

import { baseProps } from '../types';

export interface ResizeObserverProps extends baseProps {
  children: ReactNode;
  onResize?: (entries: ResizeObserverEntry[]) => void;
}

const ResizeObserver = (props: ResizeObserverProps): ReactElement => {
  const { children, onResize } = props;
  const ro = useRef<_ResizeObserver>();
  const refArray = useRef<Element[]>([]);

  useLayoutEffect(() => {
    ro.current = new _ResizeObserver((entries: any) => {
      onResize?.(entries);
    });
    refArray.current.forEach(v => {
      ro.current?.observe(v);
    });
    return () => {
      ro.current?.disconnect();
    };
  }, [children, onResize]);

  return (
    <>
      {React.Children.map(children, (child, key) => {
        return React.isValidElement(child)
          ? React.cloneElement(child as ReactElement, {
              ref: (ref: Element) => {
                refArray.current[key] = ref || child;
              }
            })
          : child;
      })}
    </>
  );
};

ResizeObserver.propTypes = {
  children: PropTypes.node.isRequired,
  onResize: PropTypes.func
};

ResizeObserver.defaultProps = {};

export default ResizeObserver;
