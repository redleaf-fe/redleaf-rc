import { useCallback, useRef } from 'react';

export const throttleTime = 200;
export const debounceTime = 200;

export function useDebounce(
  fn: () => void,
  delay: number = debounceTime,
): () => void {
  const that = this;
  const timer = useRef(-1);

  return useCallback(
    function() {
      arguments[0]?.persist();
      const args = arguments;
      if (timer.current !== -1) {
        clearTimeout(timer.current);
        timer.current = -1;
      }
      timer.current = window.setTimeout(function() {
        fn.apply(that, args);
      }, delay);
    },
    [fn, delay, that],
  );
}

export function useThrottle(
  fn: () => void,
  delay: number = throttleTime,
): () => void {
  const that = this;
  const timer = useRef(-1);

  return useCallback(
    function() {
      arguments[0]?.persist?.();
      const args = arguments;
      if (timer.current === -1) {
        timer.current = window.setTimeout(function() {
          clearTimeout(timer.current);
          timer.current = -1;
          fn.apply(that, args);
        }, delay);
      }
    },
    [fn, delay, that],
  );
}
