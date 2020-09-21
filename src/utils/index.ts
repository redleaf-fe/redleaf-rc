export const canbePositiveNumber = (val: number | string | undefined) => {
  return Number(val) > 0;
};

export const isUndefined = (val: any) => {
  return toString.call(val) === "[object Undefined]";
};

export const isFunction = (val: any) => {
  return toString.call(val) === "[object Function]";
};

export const dealWithPercentOrPx = (val: number | string | undefined) => {
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
  return "0px";
};
