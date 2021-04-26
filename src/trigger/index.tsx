import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactElement
} from 'react';
import ReactDOM from 'react-dom';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { baseProps, popPosition } from '../types';
import ResizeObserver from '../resize-observer';
import { prefixCls } from '../constants';
import { dealWithPercentOrPx } from '../utils/style';
import { getScroll } from '../utils/dom';
import { useThrottle } from '../utils/hooks';

import '../styles/common.less';
import './style.less';

export interface TriggerProps extends baseProps {
  className?: string;
  type?: 'hover' | 'click';
  visible?: boolean;
  children: ReactNode;
  content: ReactNode;
  leftOffset?: string | number;
  topOffset?: string | number;
  onShow?: () => void;
  onHide?: () => void;
  hideWithoutJudge?: boolean;
  position?: popPosition;
}

const Trigger = (props: TriggerProps): ReactElement => {
  const {
    className,
    type,
    visible,
    children,
    content,
    onShow,
    onHide,
    hideWithoutJudge = false,
    position,
    leftOffset = '0px',
    topOffset = '0px',
    ...restProps
  } = props;

  // hover类型，离开children部分，还没进入content部分的定时
  const hoverLeaveTimer = useRef(-1);
  const containerRef = useRef<HTMLElement | null>(null);
  const [triggerStyle, setTriggerStyle] = useState({});
  const [triggerVisible, setTriggerVisible] = useState(false);

  useEffect(() => {
    // console.log('effect');
    const clickOutside = (e: MouseEvent) => {
      // 点击trigger以外区域，隐藏
      if (triggerVisible) {
        if (
          hideWithoutJudge ||
          !containerRef.current?.contains(e.target as HTMLElement)
        ) {
          setTriggerVisible(false);
          onHide?.();
        }
      }
    };

    type === 'click' && window.addEventListener('click', clickOutside);

    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [type, triggerVisible, hideWithoutJudge, onHide]);

  const setContentPos = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const pos = getPositionStyle(String(position), rect, leftOffset, topOffset);
    setTriggerStyle(pos);
  }, [position, topOffset, leftOffset]);

  const onMouseEnter = useCallback(() => {
    if (type === 'hover') {
      clearTimeout(hoverLeaveTimer.current);
      setTriggerVisible(true);
      setContentPos();
      onShow?.();
    }
  }, [type, setContentPos, onShow]);

  const onMouseLeave = useCallback(() => {
    if (type === 'hover') {
      hoverLeaveTimer.current = window.setTimeout(() => {
        setTriggerVisible(false);
        onHide?.();
      }, 200);
    }
  }, [type, onHide]);

  const onClickContainer = useCallback(() => {
    // 多个trigger（比如有A和B）存在时，A展开情况下点击B，如果禁止冒泡，B会展开，A也会保持展开，
    // e.stopPropagation();
    if (type === 'click') {
      setTriggerVisible(!triggerVisible);
      if (!triggerVisible) {
        setContentPos();
        onShow?.();
      } else {
        onHide?.();
      }
    }
  }, [triggerVisible, type, onShow, onHide, setContentPos]);

  // 点击content部分时，不隐藏content，除非指定hideWithoutJudge
  const onClickContent = useCallback(
    e => {
      !hideWithoutJudge && e.stopPropagation();
    },
    [hideWithoutJudge]
  );

  return (
    <span
      className={cls(`${prefixCls}-trigger-container`, className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickContainer}
      ref={containerRef}
      {...restProps}
    >
      {/* 比如select这样的场景，选中内容以后，children的大小可能会变更，所以一定要监听children的大小 */}
      <ResizeObserver onResize={useThrottle(setContentPos)}>
        {children}
      </ResizeObserver>
      {(visible === undefined ? triggerVisible : visible) &&
        ReactDOM.createPortal(
          <span
            className={`${prefixCls}-trigger-content`}
            style={triggerStyle}
            onClick={onClickContent}
          >
            {content}
          </span>,
          document.body
        )}
    </span>
  );
};

const { node, string, number, bool, func, oneOf, oneOfType } = PropTypes;

Trigger.propTypes = {
  children: node.isRequired,
  content: node.isRequired,
  className: string,
  visible: bool,
  onShow: func,
  onHide: func,
  hideWithoutJudge: bool,
  type: oneOf(['hover', 'click']),
  leftOffset: oneOfType([string, number]),
  topOffset: oneOfType([string, number]),
  position: oneOf([
    'topCenter',
    'leftCenter',
    'rightCenter',
    'bottomCenter',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom'
  ])
};

Trigger.defaultProps = {
  type: 'hover',
  position: 'topCenter',
  leftOffset: '0px',
  topOffset: '0px',
  hideWithoutJudge: false
};

export default Trigger;

// 全部按照top、left来定位，避免参考坐标不一致，逻辑混乱
function getPositionStyle(
  position: string,
  rect: DOMRect | undefined,
  leftOffset: string | number,
  topOffset: string | number
) {
  const { top = 0, left = 0, width = 0, height = 0 } = rect || {};
  const { scrollTop, scrollLeft } = getScroll();
  const topVal = dealWithPercentOrPx(topOffset);
  const leftVal = dealWithPercentOrPx(leftOffset);

  switch (position) {
    case 'leftCenter':
      return {
        top: `calc(${scrollTop + top + height / 2}px + ${topVal})`,
        left: `calc(${scrollLeft + left}px + ${leftVal})`,
        transform: 'translate(-100%, -50%)'
      };
    case 'rightCenter':
      return {
        top: `calc(${scrollTop + top + height / 2}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width}px + ${leftVal})`,
        transform: 'translate(0, -50%)'
      };
    case 'topCenter':
      return {
        top: `calc(${scrollTop + top}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width / 2}px + ${leftVal})`,
        transform: 'translate(-50%, -100%)'
      };
    case 'bottomCenter':
      return {
        top: `calc(${scrollTop + top + height}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width / 2}px + ${leftVal})`,
        transform: 'translate(-50%, 0)'
      };
    case 'topLeft':
      return {
        top: `calc(${scrollTop + top}px + ${topVal})`,
        left: `calc(${scrollLeft + left}px + ${leftVal})`,
        transform: 'translate(0, -100%)'
      };
    case 'topRight':
      return {
        top: `calc(${scrollTop + top}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width}px + ${leftVal})`,
        transform: 'translate(-100%, -100%)'
      };
    case 'bottomLeft':
      return {
        top: `calc(${scrollTop + top + height}px + ${topVal})`,
        left: `calc(${scrollLeft + left}px + ${leftVal})`,
        transform: 'translate(0, 0)'
      };
    case 'bottomRight':
      return {
        top: `calc(${scrollTop + top + height}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width}px + ${leftVal})`,
        transform: 'translate(-100%, 0)'
      };
    case 'leftTop':
      return {
        top: `calc(${scrollTop + top}px + ${topVal})`,
        left: `calc(${scrollLeft + left}px + ${leftVal})`,
        transform: 'translate(-100%, 0)'
      };
    case 'leftBottom':
      return {
        top: `calc(${scrollTop + top + height}px + ${topVal})`,
        left: `calc(${scrollLeft + left}px + ${leftVal})`,
        transform: 'translate(-100%, -100%)'
      };
    case 'rightTop':
      return {
        top: `calc(${scrollTop + top}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width}px + ${leftVal})`,
        transform: 'translate(0, 0)'
      };
    case 'rightBottom':
      return {
        top: `calc(${scrollTop + top + height}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width}px + ${leftVal})`,
        transform: 'translate(0, -100%)'
      };
    default:
      // 默认弹窗在顶部中间
      return {
        top: `calc(${scrollTop + top}px + ${topVal})`,
        left: `calc(${scrollLeft + left + width / 2}px + ${leftVal})`,
        transform: 'translate(-50%, -100%)'
      };
  }
}
