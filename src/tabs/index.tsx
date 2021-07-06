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
  onChange?: ({ meta, value }: { meta: ITabOption; value: string }) => void;
  value?: string;
  defaultValue?: string;
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
    position = 'top',
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
  }, [options, activeIndex]);

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
    <span
      className={cls(
        `${prefixCls}-tabs`,
        `${prefixCls}-tabs-${position}`,
        className
      )}
      {...restProps}
    >
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
                [`${prefixCls}-tabs-title-active`]: activeIndex === k,
                [`${prefixCls}-tabs-title-disabled`]: v.disabled
              })}
            >
              {typeof v.renderTitle === 'function'
                ? v.renderTitle({ meta: v, index: k })
                : v.text}
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
          options.map((v, k) => {
            return (
              <span
                key={v.value}
                className={cls(`${prefixCls}-tabs-content`, {
                  [`${prefixCls}-tabs-content-active`]: activeIndex === k
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

const { string, oneOf, shape, arrayOf, bool, func, node } = PropTypes;

const optionShape = shape({
  disabled: bool,
  renderTitle: func,
  text: string.isRequired,
  value: string.isRequired,
  content: node
});

Tabs.propTypes = {
  className: string,
  contentsClassName: string,
  titlesClassName: string,
  position: oneOf(['top', 'right', 'bottom', 'left']),
  options: arrayOf(optionShape).isRequired,
  destroyOnHide: bool,
  onChange: func,
  value: string,
  defaultValue: string
};

Tabs.defaultProps = {
  destroyOnHide: false,
  position: 'top',
  options: []
};

export default Tabs;
