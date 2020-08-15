export const canbePositiveInt = (val: number | string | undefined) => {
  return Number(val) > 0;
};
