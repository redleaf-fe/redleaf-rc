import { baseProps } from '../types';
import _omit from 'lodash/omit';

export const typeJudge: baseProps = {};

[
  'Null',
  'Undefined',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Object',
  'Number',
  'String',
  'Boolean',
].forEach(v => {
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

interface traverseData extends baseProps {
  children?: traverseData[];
}

// 深度优先遍历，提供一个cb回调，参数是当前数据的深度和唯一id
export function deepFirstTraverse(
  data: traverseData[],
  cb: ({
    meta,
    depth,
    id,
  }: {
    meta: traverseData;
    depth: number;
    id: number;
  }) => void,
): void {
  let depth = 0;
  let id = 0;

  function walk(datasets: traverseData[]) {
    datasets.map(v => {
      cb({ meta: v, depth, id });
      id += 1;
      if (v.children) {
        depth += 1;
        walk(v.children);
        depth -= 1;
      }
    });
  }

  walk(data);
}

// 将树形的数据展平成一维数组
export function toPlainArray(data: traverseData[]): traverseData[] {
  let arr: traverseData[] = [];

  deepFirstTraverse(data, ({ meta, depth, id }) => {
    meta.__id__ = id;
    meta.__depth__ = depth;
    arr.push(_omit(meta, 'children'));
  });

  return arr;
}
