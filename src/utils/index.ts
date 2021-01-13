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

export function dealWithPercentOrPx(
  val: number | string | undefined,
  defaultReturn?: string,
): string {
  if (typeof val === 'number') {
    return val + 'px';
  }
  if (typeof val === 'string') {
    const lastTwo = val.slice(val.length - 2);
    if (val.endsWith('%') || lastTwo.toUpperCase() === 'PX') {
      return val;
    } else {
      return val + 'px';
    }
  }
  return defaultReturn || '0px';
}

// 获取页面滚动距离
export function getScroll(): { scrollLeft: number; scrollTop: number } {
  return {
    scrollLeft: Math.max(
      document.documentElement.scrollLeft,
      document.body.scrollLeft,
    ),
    scrollTop: Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    ),
  };
}
