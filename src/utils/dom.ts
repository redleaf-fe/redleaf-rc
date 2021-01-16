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
