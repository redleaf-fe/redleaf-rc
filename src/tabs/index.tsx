import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useRef,
  useEffect,
  useMemo
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { scrollToPos } from '../utils/dom';
import { useSingleValue } from '../utils/hooks';
import { baseProps } from '../types';
import { prefixCls } from '../constants';

import '../styles/common.less';
import './style.less';

/**
 * TODO
 *
 * 受控、默认值
 * 自定义渲染title
 * 位置，上下左右
 * destroyOnHide，隐藏时是否卸载
 */

export interface ITabOption {
  text: string;
  value: string;
  renderTitle?: ({
    meta,
    index
  }: {
    meta: baseProps;
    index: number;
  }) => ReactNode;
  disabled?: boolean;
  content?: ReactNode;
}

export interface TabsProps extends baseProps {
  className?: string;
  contentsClassName?: string;
  titlesClassName?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  options: ITabOption[];
  destroyOnHide?: boolean;
}

const Tabs = (props: TabsProps): ReactElement => {
  const {
    className,
    titlesClassName,
    contentsClassName,
    options = [],
    defaultValue,
    value,
    onChange,
    position,
    destroyOnHide,
    ...restProps
  } = props;

  const titleRefs: baseProps = useRef({
    container: {},
    children: []
  });

  const { state, setState, uncontrolled } = useSingleValue({
    defaultValue,
    value
  });

  const activeIndex = useMemo(() => {
    const idx = options.findIndex(v => v.value === state.activeValue);
    return idx < 0 ? 0 : idx;
  }, [options, state.activeValue]);

  useEffect(() => {
    if (activeIndex > 0) {
      scrollToPos({
        dir: 'horizontal',
        element: titleRefs.current.container,
        to: titleRefs.current.children[activeIndex]?.offsetLeft
      });
    }
  }, [state.activeValue, options, activeIndex]);

  const onClickTitle = useCallback(
    val => {
      if (val.disabled) {
        return;
      }
      uncontrolled && setState({ activeValue: val.value });
      onChange?.({ meta: val, value: val.value });
    },
    [uncontrolled, setState, onChange]
  );

  return (
    <span className={cls(`${prefixCls}-tabs`, className)} {...restProps}>
      <span
        className={cls(`${prefixCls}-tabs-titles`, titlesClassName)}
        ref={ref => {
          titleRefs.current.container = ref;
        }}
      >
        {options.map((v, k) => {
          return (
            <span
              key={v.value}
              onClick={() => onClickTitle(v)}
              ref={ref => {
                titleRefs.current.children[k] = ref;
              }}
              className={cls(`${prefixCls}-tabs-title`, {
                [`${prefixCls}-tabs-title-active`]:
                  state.activeValue === v.value,
                [`${prefixCls}-tabs-title-disabled`]: v.disabled
              })}
            >
              {v.text}
            </span>
          );
        })}
      </span>
      <span className={cls(`${prefixCls}-tabs-contents`, contentsClassName)}>
        {destroyOnHide ? (
          <span
            className={`${prefixCls}-tabs-content ${prefixCls}-tabs-content-active`}
          >
            {options[activeIndex].content}
          </span>
        ) : (
          options.map(v => {
            return (
              <span
                key={v.value}
                className={cls(`${prefixCls}-tabs-content`, {
                  [`${prefixCls}-tabs-content-active`]:
                    state.activeValue === v.value
                })}
              >
                {v.content}
              </span>
            );
          })
        )}
      </span>
    </span>
  );
};

Tabs.propTypes = {
  // className: PropTypes.string,
};

Tabs.defaultProps = {
  destroyOnHide: false
};

export default Tabs;
