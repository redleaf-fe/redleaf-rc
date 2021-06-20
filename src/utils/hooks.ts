// @ts-nocheck
import { useCallback, useRef, useEffect } from 'react';

export const throttleTime = 50;
export const debounceTime = 50;

export function useDebounce(
  fn: (...args) => any,
  delay: number = debounceTime,
  that: any
): () => void {
  const ref = useRef({
    timer: -1,
    fn
  });

  useEffect(() => {
    ref.current.fn = fn;
  }, [fn]);

  return useCallback(
    function() {
      arguments[0]?.persist?.();
      const args = arguments;
      if (ref.current.timer !== -1) {
        clearTimeout(ref.current.timer);
        ref.current.timer = -1;
      }
      ref.current.timer = window.setTimeout(() => {
        ref.current.fn.apply(that, args);
      }, delay);
    },
    [delay, that]
  );
}

export function useThrottle(
  fn: (...args) => any,
  delay?: number = throttleTime,
  that?: any = {}
): () => void {
  const ref = useRef({
    timer: -1,
    fn
  });

  useEffect(() => {
    ref.current.fn = fn;
  }, [fn]);

  return useCallback(
    function() {
      arguments[0]?.persist?.();
      const args = arguments;
      if (ref.current.timer === -1) {
        ref.current.timer = window.setTimeout(() => {
          clearTimeout(ref.current.timer);
          ref.current.timer = -1;
          ref.current.fn.apply(that, args);
        }, delay);
      }
    },
    [delay, that]
  );
}
