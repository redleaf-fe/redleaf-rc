import React, { ReactElement, ReactNode, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import _ResizeObserver from "resize-observer-polyfill";

export interface ResizeObserverProps extends baseProps {
  children: ReactNode;
  onResize?: (entries: ResizeObserverEntry[]) => void;
}

const ResizeObserver = (props: ResizeObserverProps): ReactElement => {
  const { children, onResize } = props;
  const ro = useRef<_ResizeObserver>();
  const refArray = useRef<Element[]>([]);

  useEffect(() => {
    ro.current = new _ResizeObserver((entries) => {
      onResize?.(entries);
    });
    refArray.current.forEach((v) => {
      ro.current?.observe(v);
    });
    return () => {
      ro.current?.disconnect();
    };
  }, [children, onResize]);

  return (
    <>
      {React.Children.map(children, (child, key) => {
        return React.cloneElement(child as ReactElement, {
          ref: (ref: Element) => {
            refArray.current[key] = ref;
          },
        });
      })}
    </>
  );
};

ResizeObserver.propTypes = {
  children: PropTypes.node.isRequired,
  onResize: PropTypes.func,
};

ResizeObserver.defaultProps = {};

export default ResizeObserver;
