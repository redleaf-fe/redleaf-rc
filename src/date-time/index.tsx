import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  ReactElement,
} from "react";
import cls from "classnames";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import PropTypes from "prop-types";

import { baseProps } from "../types";
import { prefixCls } from "../constants";
import { useMount } from "../utils/hooks";
import Trigger from "../trigger";
import { IconCloseFill, IconClock } from "../icon";
import TimePanel from "./time";
import DatePanel from "./date";
import MonthPanel from "./month";
import YearPanel from "./year";

import "../styles/common.less";
import "./style.less";

dayjs.extend(objectSupport);

const dateArr = ["year", "month", "date"];

const placeholderMap = {
  date: "请选择日期",
  month: "请选择月份",
  year: "请选择年份",
  time: "请选择时间",
  "date-time": "请选择日期和时间",
};

const formatMap = {
  "date-time": "YYYY-MM-DD HH:mm:ss",
  time: "HH:mm:ss",
  date: "YYYY-MM-DD",
  month: "YYYY-MM",
  year: "YYYY",
};

export interface DateTimeProps extends baseProps {
  className?: string;
  panelClassName?: string;
  itemClassName?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ({ value }: { value: string; meta: dayjs.Dayjs }) => void;
  type?: "date" | "month" | "year" | "time" | "date-time";
  format?: string;
  disabled?: boolean;
  readOnly?: boolean;
  showClearIcon?: boolean;
}

const DateTime = (props: DateTimeProps): ReactElement => {
  const {
    className,
    panelClassName,
    itemClassName,
    value,
    // 空字符串表示当前没有值，用于判断是否需要placeholder
    defaultValue = "",
    onChange,
    type = "date-time",
    format,
    disabled,
    readOnly,
    showClearIcon,
    placeholder,
    ...restProps
  } = props;

  // singleType，去除横杠后面的部分，留下的类型，date、month、year、time四个
  // withTime，横杠后面是否带time
  const [singleType, withTime] = useMemo(() => type.split("-"), [type]);
  const [state, setState] = useState({
    // 时间值，用于组件之间传递，便于解析
    meta: dayjs(),
    // 时间值，用于显示
    show: "",
    // type用于表示当前所处的panel类型，比如从date切换到month，但最终还要跳回date
    type: singleType,
  });

  const uncontrolled = useMemo(() => {
    return value === undefined;
  }, [value]);

  const dealInput = useCallback(
    (val) => {
      if (val) {
        // 如果输入只有时间，添加一个年份做兼容
        let ret = val?.trim();
        if (/^\d{1,2}:\d{1,2}:\d{1,2}$/.test(ret)) {
          ret = `${dayjs().year()} ${ret}`;
        }

        const meta = dayjs(ret);
        setState((t) => ({
          ...t,
          meta,
          show: meta.format(format || formatMap[type]),
        }));
      } else {
        setState((t) => ({ ...t, meta: {} as any, show: "" }));
      }
    },
    [format, type]
  );

  useMount(() => {
    if (defaultValue) {
      dealInput(defaultValue);
    }
  });

  useEffect(() => {
    if (!uncontrolled) {
      dealInput(value);
    }
  }, [value, dealInput, uncontrolled]);

  useEffect(() => {
    setState((t) => ({ ...t, type: singleType }));
  }, [singleType]);

  const onClickClear = useCallback(
    (e) => {
      e.stopPropagation();
      if (uncontrolled) {
        setState((t) => ({ ...t, meta: {} as any, show: "" }));
      }
      onChange?.({ value: "", meta: {} as any });
    },
    [uncontrolled, onChange]
  );

  // 各个panel设置值
  const setValue = useCallback(
    ({ value, panelType, changeType }) => {
      if (changeType) {
        // 切换panel类型
        setState((t) => ({ ...t, type: changeType }));
      } else if (panelType && panelType !== singleType) {
        // panel类型切换回上一级
        setState((t) => ({
          ...t,
          type: dateArr[dateArr.indexOf(panelType) + 1],
        }));
      }

      if (!disabled && !readOnly) {
        // 设置时间值
        const val = dayjs(
          Object.assign(
            {},
            {
              // 用toObject代替？
              // 这里猜测dayjs有类似this.xx的写法，解构出来调用会报错
              year: state.meta.year?.(),
              month: state.meta.month?.(),
              date: state.meta.date?.(),
              hour: state.meta.hour?.(),
              minute: state.meta.minute?.(),
              second: state.meta.second?.(),
            },
            value || undefined
          )
        );
        const valShow = val.format(format || formatMap[type]);

        if (uncontrolled) {
          setState((t) => ({ ...t, meta: val, show: valShow }));
        }
        onChange?.({ value: valShow, meta: val });
      }
    },
    [
      onChange,
      state.meta,
      singleType,
      type,
      format,
      disabled,
      readOnly,
      uncontrolled,
    ]
  );

  const renderPanel = useCallback(() => {
    const panelProps = {
      value: state.meta,
      setValue,
    };

    function renderSinglePanel() {
      switch (state.type) {
        case "time":
          return <TimePanel {...panelProps} />;
        case "date":
          return <DatePanel {...panelProps} />;
        case "month":
          return <MonthPanel {...panelProps} />;
        case "year":
          return <YearPanel {...panelProps} />;
      }
    }
    return (
      <>
        {renderSinglePanel()}
        {withTime && state.type !== "time" && <TimePanel {...panelProps} />}
      </>
    );
  }, [setValue, state.type, state.meta, withTime]);

  return (
    <span
      className={cls(`${prefixCls}-datetime-container`, className)}
      {...restProps}
    >
      <Trigger
        type="click"
        position="bottomCenter"
        topOffset={8}
        content={
          <span
            className={cls(
              `${prefixCls}-datetime-panel-container`,
              panelClassName
            )}
          >
            {renderPanel()}
          </span>
        }
      >
        <span
          className={cls(
            `${prefixCls}-datetime-item`,
            { [`${prefixCls}-datetime-disabled-item`]: disabled },
            itemClassName
          )}
        >
          {state.show || (
            <span className={`${prefixCls}-datetime-placeholder`}>
              {placeholder || placeholderMap[type]}&nbsp;
            </span>
          )}
          {!disabled && !readOnly && showClearIcon && state.show ? (
            <svg
              className={`${prefixCls}-datetime-clear-icon`}
              viewBox="0 0 1024 1024"
              onClick={onClickClear}
            >
              <path d={IconCloseFill} />
            </svg>
          ) : (
            <svg
              className={`${prefixCls}-datetime-clear-icon`}
              viewBox="0 0 1024 1024"
            >
              <path d={IconClock} />
            </svg>
          )}
        </span>
      </Trigger>
    </span>
  );
};

const { bool, string, func, oneOf } = PropTypes;

DateTime.propTypes = {
  className: string,
  panelClassName: string,
  itemClassName: string,
  type: oneOf(["date", "month", "year", "time", "date-time"]),
  format: string,
  value: string,
  defaultValue: string,
  placeholder: string,
  onChange: func,
  disabled: bool,
  readOnly: bool,
  showClearIcon: bool,
};

DateTime.defaultProps = {
  type: "date-time",
  defaultValue: "",
  disabled: false,
  readOnly: false,
  showClearIcon: true,
};

DateTime.dayjs = dayjs;

export default DateTime;

export { PanelProps } from "./declaration";
