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
