export function dealWithPercentOrPx(
  val: number | string | undefined,
  defaultReturn?: string
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
