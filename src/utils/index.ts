export const canbePositiveNumber = (val: number | string | undefined) => {
  return Number(val) > 0;
};

export const isUndefined = (val: any) => {
  return toString.call(val) === "[object Undefined]";
};

export const isFunction = (val: any) => {
  return toString.call(val) === "[object Function]";
};
