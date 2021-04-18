import { baseProps } from "../types";

export const typeJudge: baseProps = {};

[
  "Null",
  "Undefined",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Object",
  "Number",
  "String",
  "Boolean",
].forEach((v) => {
  typeJudge[`is${v}`] = (val: any): boolean =>
    toString.call(val) === `[object ${v}]`;
});

export function between({
  val,
  max,
  min,
}: {
  val: number | undefined | null;
  max: number;
  min: number;
}): number {
  let ret = Math.max(min, val as number);
  ret = Math.min(max, ret);
  return ret;
}
