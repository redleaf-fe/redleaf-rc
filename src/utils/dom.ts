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

// 将元素滚动到容器的起始位置（最顶部和最左边），duration: 单位ms
export function scrollToPos({
  dir = 'vertical',
  element,
  to,
  from,
  duration = 200,
}: {
  dir?: 'vertical' | 'horizontal';
  element: any;
  to: number;
  from?: number;
  duration?: number;
}): void {
  const posMap = { vertical: 'scrollTop', horizontal: 'scrollLeft' };
  const pos = posMap[dir];
  const innerDistanceMap = {
    vertical: 'clientHeight',
    horizontal: 'clientWidth',
  };
  const innerDistance = innerDistanceMap[dir];
  const totalDistanceMap = {
    vertical: 'scrollHeight',
    horizontal: 'scrollWidth',
  };
  const totalDistance = totalDistanceMap[dir];

  if (!element) {
    return;
  }

  // scrollTop和scrollLeft一定大于0，而且赋值的时候要给整数
  if (from === undefined || from < 0) {
    from = element[pos];
  }

  const distance = to - Number(from);
  // 这个16是预估的requestAnimationFrame的执行时间
  const step = Math.ceil((distance / duration) * 16);

  function goScroll() {
    requestAnimationFrame(() => {
      if (duration <= 0 || step === 0) {
        element[pos] = to;
        return;
      }
      // 超过滚动可达到的距离
      if (
        (element[pos] <= 0 && step < 0) ||
        (element[pos] + element[innerDistance] >= element[totalDistance] &&
          step > 0)
      ) {
        return;
      }

      element[pos] += step;

      if (Math.abs(to - element[pos]) > Math.abs(step)) {
        goScroll();
      } else {
        element[pos] = to;
      }
    });
  }

  goScroll();
}

export function getUniqElementByClass({
  className,
  elemType,
}: {
  className: string;
  elemType: string;
}): HTMLElement {
  let ele;
  ele = document.querySelector(`.${className}`) as HTMLElement;
  if (!ele) {
    ele = document.createElement(elemType);
    ele.className = className;
  }
  return ele;
}
