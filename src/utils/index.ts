export const canbePositiveNumber = (
  val: number | string | undefined
): boolean => {
  return Number(val) > 0;
};

export const isUndefined = (val: any): boolean => {
  return toString.call(val) === "[object Undefined]";
};

export const isFunction = (val: any): boolean => {
  return toString.call(val) === "[object Function]";
};

export const isArray = (val: any): boolean => {
  return toString.call(val) === "[object Array]";
};

export const dealWithPercentOrPx = (
  val: number | string | undefined,
  defaultReturn?: string
): string => {
  if (typeof val === "number") {
    return val + "px";
  }
  if (typeof val === "string") {
    if (
      val.endsWith("%") ||
      val.endsWith("px") ||
      val.endsWith("Px") ||
      val.endsWith("pX") ||
      val.endsWith("PX")
    ) {
      return val;
    } else {
      return val + "px";
    }
  }
  return defaultReturn || "0px";
};
