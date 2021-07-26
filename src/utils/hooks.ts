// @ts-nocheck
import { useCallback, useRef, useEffect, useState, useMemo } from 'react';

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

  const setState = useCallback(
    newState => {
      if (isUnmounted) {
        return;
      }
      _setState(prevState => ({
        ...prevState,
        ...(typeof newState === 'function' ? newState(prevState) : newState)
      }));
    },
    [isUnmounted]
  );

  return [state, setState];
}

export function useSingleValue({
  defaultValue,
  value,
  mountFn
}: {
  defaultValue: any;
  value: any;
  mountFn?: (...args) => void;
}): any {
  const [state, setState] = useSafeState({
    activeValue: ''
  });

  const uncontrolled = useMemo(() => {
    return value === undefined;
  }, [value]);

  useMount(() => {
    if (typeof defaultValue !== undefined) {
      setState({ activeValue: defaultValue });
      mountFn?.();
    }
  });

  useEffect(() => {
    if (!uncontrolled) {
      setState({ activeValue: value });
    }
  }, [value, uncontrolled, setState]);

  return { state, setState, uncontrolled };
}

interface ValueText {
  text: string;
  value: string;
}

function uniqCheck(arr) {
  const obj = {};
  const ret = [];
  arr.forEach(v => {
    if (!obj[v.value]) {
      ret.push(v);
      obj[v.value] = 1;
    }
  });
  return ret;
}

export function useCheck<T extends ValueText>({
  type,
  value,
  options,
  maxNum,
  defaultValue = [],
  onChange
}: {
  type?: 'single' | 'multi';
  value?: string[];
  options: T[];
  maxNum?: number;
  defaultValue?: string[];
  onChange?: ({ value, meta }: { value: string[]; meta: T[] }) => void;
}): {
  isSingle: boolean;
  uncontrolled: boolean;
  dealCheck: (val: string[]) => T[];
  checkedValues: string[];
  checkMeta: T[];
  setCheckMeta: React.Dispatch<React.SetStateAction<T[]>>;
  addItem: (v: T) => void;
  delItem: (v: T) => void;
  addAll: () => void;
  delAll: () => void;
} {
  const [checkMeta, setCheckMeta] = useState<T[]>([]);

  const isSingle = useMemo(() => {
    return type === 'single';
  }, [type]);

  const uncontrolled = useMemo(() => {
    return value === undefined;
  }, [value]);

  const checkedValues = useMemo(() => checkMeta.map((v: T) => v.value), [
    checkMeta
  ]);

  const dealCheck = useCallback(
    val => {
      // 不能从options中过滤value，会破坏val的顺序，只能从val中过滤
      // 在限制多选个数的情况下会有问题，选排在前面的值可以替换后面的值，但是选后面的值选不中
      let ret = uniqCheck(
        val.map(v => options.find(vv => vv.value === v)).filter(v => !!v)
      );

      if (isSingle) {
        ret = ret.slice(0, 1);
      } else if (Number(maxNum) > 0) {
        ret = ret.slice(0, Number(maxNum));
      }

      return ret;
    },
    [options, maxNum, isSingle]
  );

  useMount(() => {
    defaultValue.length > 0 && setCheckMeta(dealCheck(defaultValue));
  });

  useEffect(() => {
    if (!uncontrolled) {
      setCheckMeta(dealCheck(value));
    }
  }, [value, dealCheck, uncontrolled]);

  const addItem = useCallback(
    v => {
      const val = isSingle
        ? [v]
        : dealCheck([...checkMeta, v].map(v => v.value));
      uncontrolled && setCheckMeta(val);
      onChange?.({ value: val.map((vv: T) => vv.value), meta: val });
    },
    [checkMeta, onChange, uncontrolled, dealCheck, isSingle]
  );

  const delItem = useCallback(
    v => {
      const val = checkMeta.filter(vv => vv.value !== v.value);
      uncontrolled && setCheckMeta(val);
      onChange?.({ value: val.map(vv => vv.value), meta: val });
    },
    [uncontrolled, onChange, checkMeta]
  );

  // readOnly、disabled等需要自己判断
  const addAll = useCallback(() => {
    const val = dealCheck(options.map(v => v.value));
    uncontrolled && setCheckMeta(val);
    onChange?.({ value: val.map(vv => vv.value), meta: val });
  }, [options, onChange, uncontrolled, dealCheck]);

  const delAll = useCallback(() => {
    uncontrolled && setCheckMeta([]);
    onChange?.({ value: [], meta: [] });
  }, [onChange, uncontrolled]);

  return {
    isSingle,
    uncontrolled,
    dealCheck,
    checkedValues,
    checkMeta,
    setCheckMeta,
    addItem,
    delItem,
    addAll,
    delAll
  };
}
