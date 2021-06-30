// @ts-nocheck
import { useCallback, useRef, useEffect, useState } from 'react';

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

  // useEffect(() => {
  //   ref.current.fn = fn;
  // }, [fn]);

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

  // useEffect(() => {
  //   ref.current.fn = fn;
  // }, [fn]);

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

export function useMount(fn?: (...args) => any): boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    typeof fn === 'function' && fn();
    isMounted.current = true;
  }, []);

  return isMounted.current;
}

export function useUnmount(fn?: (...args) => any): boolean {
  const isUnmounted = useRef(false);

  useEffect(
    () => () => {
      typeof fn === 'function' && fn();
      isUnmounted.current = true;
    },
    []
  );

  return isUnmounted.current;
}

export function useSafeState(initialState?: any): [any, (...args) => void] {
  const [state, _setState] = useState(initialState);
  const isUnmounted = useUnmount();

  const setState = useCallback(newState => {
    if (isUnmounted) {
      return;
    }
    _setState(prevState => ({
      ...prevState,
      ...(typeof newState === 'function' ? newState(prevState) : newState)
    }));
  }, []);

  return [state, setState];
}
