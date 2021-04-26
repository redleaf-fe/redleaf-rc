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
  'Boolean'
].forEach(v => {
  typeJudge[`is${v}`] = (val: any): boolean =>
    toString.call(val) === `[object ${v}]`;
});

export function between({
  val,
  max,
  min
}: {
  val: number | undefined | null;
  max: number;
  min: number;
}): number {
  let ret = Math.max(min, val as number);
  ret = Math.min(max, ret);
  return ret;
}

export interface traverseData extends baseProps {
  children?: traverseData[];
}

// 深度优先遍历，提供一个cb回调
export function deepFirstTraverse(
  data: traverseData[],
  cb: (meta: traverseData) => void
): void {
  function walk(datasets: traverseData[]) {
    datasets.map(v => {
      cb(v);
      if (v.children) {
        walk(v.children);
      }
    });
  }

  walk(data);
}

// 深度优先遍历，用于将对象形式展平
function deepFirstTraverseForPlain(
  data: traverseData[],
  cb: ({
    meta,
    depth,
    id,
    parentId
  }: {
    meta: traverseData;
    depth: number;
    id: number;
    parentId: number[];
  }) => void
): void {
  let depth = 0;
  let id = 0;
  const parentId: number[] = [];

  function walk(datasets: traverseData[]) {
    datasets.map(v => {
      cb({ meta: v, depth, id, parentId: parentId.slice() });
      id += 1;
      if (v.children) {
        parentId.push(id - 1);
        depth += 1;
        walk(v.children);
        depth -= 1;
        parentId.pop();
      }
    });
  }

  walk(data);
}

// 将树形的数据展平成一维数组
export function toPlainArray(data: traverseData[]): traverseData[] {
  const arr: traverseData[] = [];

  deepFirstTraverseForPlain(data, ({ meta, depth, id, parentId }) => {
    meta.__id__ = id;
    meta.__depth__ = depth;
    meta.__parentId__ = parentId;
    // 如果children是个空数组，去掉
    if (meta.children && meta.children.length === 0) {
      arr.push(_omit(meta, 'children'));
    } else {
      arr.push(meta);
    }
  });

  return arr;
}
