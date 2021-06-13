import React, {
  useCallback,
  useRef,
  useState,
  ReactElement,
  useEffect,
} from "react";
import cls from "classnames";
import dayjs from "dayjs";

import { prefixCls } from "../constants";
import { baseProps } from "../types";
import ConfigProvider from "../config-provider";
import { scrollToPos } from "../utils/dom";
import { PanelProps } from "./declaration";

const timeArr = ["hour", "minute", "second"];
export type TimeTypes = "hour" | "minute" | "second";

const TimePanel = (props: PanelProps): ReactElement => {
  const { value, setValue, ...restProps } = props;
  const [state, setState] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const timeRefs: baseProps = useRef({
    hour: {
      container: {},
      children: [],
    },
    minute: {
      container: {},
      children: [],
    },
    second: {
      container: {},
      children: [],
    },
  });

  useEffect(() => {
    let timeVal: baseProps = {};

    if (value) {
      const chosenTime = dayjs(value);
      timeVal = {
        hour: chosenTime.hour(),
        minute: chosenTime.minute(),
        second: chosenTime.second(),
      };
    } else {
      const nowTime = dayjs();
      timeVal = {
        hour: nowTime.hour(),
        minute: nowTime.minute(),
        second: nowTime.second(),
      };
    }

    setState(timeVal as any);

    timeArr.forEach((v) => {
      const { container, children } = timeRefs.current[v];
      const idx = timeVal[v];
      scrollToPos({
        element: container,
        to: children[idx]?.offsetTop,
        duration: 200,
      });
    });
  }, [value]);

  const setNow = useCallback(() => {
    const nowTime = dayjs();
    setValue({
      value: {
        hour: nowTime.hour(),
        minute: nowTime.minute(),
        second: nowTime.second(),
      },
    });
  }, [setValue]);

  const renderCol = useCallback(
    (type: TimeTypes) => {
      let cnt = 60;
      type === "hour" && (cnt = 24);
      const { hour, minute, second } = state;
      return (
        <>
          {Array(cnt)
            .fill(1)
            .map((v, k) => (
              <span
                className={cls(`${prefixCls}-datetime-row`, {
                  [`${prefixCls}-datetime-active-row`]: k === state[type],
                })}
                key={k}
                ref={(ref) => {
                  timeRefs.current[type].children[k] = ref;
                }}
                onClick={() => {
                  setValue({
                    value: {
                      hour,
                      minute,
                      second,
                      // 覆盖上面三个属性中的某一个
                      [type]: k,
                    },
                  });
                }}
              >
                {k}
              </span>
            ))}
          {/* TODO: 补了空白可以解决尾部的一些时间（比如23:56:58）不对齐的问题，但是自定义高度就废了 */}
          {/* 这里的数字这么奇怪是为了防止和上面的key相同 */}
          {[61, 62, 63, 64, 65, 66].map((v, k) => (
            <span className={`${prefixCls}-datetime-row-space`} key={k}></span>
          ))}
        </>
      );
    },
    [state, setValue]
  );

  return (
    <ConfigProvider.Consumer>
      {(value: baseProps) => {
        const { lang, langText } = value;
        const locale = Object.assign({}, lang.DateTime, langText);
        return (
          <span className={`${prefixCls}-datetime-time-panel`} {...restProps}>
            {/* 时分秒 */}
            <span className={`${prefixCls}-datetime-row-tip`}>
              {timeArr.map((v) => (
                <span key={v} className={`${prefixCls}-datetime-row-tip-text`}>
                  {locale[v]}
                </span>
              ))}
            </span>
            {/* 选项 */}
            {timeArr.map((v) => (
              <span
                className={`${prefixCls}-datetime-col`}
                key={v}
                ref={(ref) => {
                  timeRefs.current[v].container = ref;
                }}
              >
                {renderCol(v as TimeTypes)}
              </span>
            ))}
            <span
              className={`${prefixCls}-datetime-row-bottom`}
              onClick={setNow}
            >
              {locale.now}
            </span>
          </span>
        );
      }}
    </ConfigProvider.Consumer>
  );
};

export default TimePanel;
