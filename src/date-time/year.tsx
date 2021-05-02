import React, {
  useCallback,
  useEffect,
  useState,
  ReactElement,
  useMemo,
} from "react";
import cls from "classnames";
import dayjs from "dayjs";
import _chunk from "lodash/chunk";

import { prefixCls } from "../constants";
import { baseProps } from "../types";
import ConfigProvider from "../config-provider";
import { IconArrowSingle, IconArrowDouble } from "../icon";
import { PanelProps } from "./declaration";
import { between } from "../utils/js";

const YearPanel = (props: PanelProps): ReactElement => {
  const { value, setValue, ...restProps } = props;

  const [activeYear, setActiveYear] = useState(2000);
  const [activeMonth, setActiveMonth] = useState(0);

  const yearArr = useMemo(() => {
    const arr = [];
    const start = Math.floor(activeYear / 10) * 10;
    for (let i = 0; i <= 9; i++) {
      arr.push({ year: start + i, type: "enable" });
    }
    arr.push({ year: start + 10, type: "disable" });
    arr.push({ year: start + 11, type: "disable" });

    return _chunk(arr, 3);
  }, [activeYear]);

  useEffect(() => {
    const val = dayjs(value);
    setActiveYear(val.year());
    setActiveMonth(val.month());
  }, [value]);

  const changeDate = useCallback(
    ({ year, setSingle }) => {
      const val: baseProps = {
        value: {
          year: between({ val: year, max: 9999, min: 1000 }) || activeYear,
          month: activeMonth,
          date: 1,
        },
      };
      if (setSingle) {
        val.panelType = "year";
      }
      setValue(val);
    },
    [activeYear, activeMonth, setValue]
  );

  const setToday = useCallback(() => {
    setValue({
      value: {
        year: dayjs().year(),
        month: activeMonth,
        date: 1,
      },
      panelType: "year",
    });
  }, [setValue, activeMonth]);

  return (
    <ConfigProvider.Consumer>
      {(value: baseProps) => {
        const { lang, langText } = value;
        const locale = Object.assign({}, lang.DateTime, langText);
        return (
          <span className={`${prefixCls}-datetime-year-panel`} {...restProps}>
            {/* 年份选择 */}
            <span className={`${prefixCls}-datetime-row-over`}>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-left`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear - 100 })}
              >
                <path transform="rotate(180,512,512)" d={IconArrowDouble} />
              </svg>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-left`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear - 10 })}
              >
                <path transform="rotate(180,512,512)" d={IconArrowSingle} />
              </svg>
              <span className={`${prefixCls}-datetime-row-over-text`}>
                {activeYear}
              </span>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-right`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear + 100 })}
              >
                <path d={IconArrowDouble} />
              </svg>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-right`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear + 10 })}
              >
                <path d={IconArrowSingle} />
              </svg>
            </span>
            {yearArr.map((v, k) => (
              <span className={`${prefixCls}-datetime-row`} key={k}>
                {v.map((vv, kk) => (
                  <span
                    className={cls(`${prefixCls}-datetime-col`, {
                      [`${prefixCls}-datetime-disable-col`]:
                        vv.type === "disable",
                      [`${prefixCls}-datetime-active-col`]:
                        vv.year === activeYear,
                    })}
                    key={kk}
                    onClick={() =>
                      vv.type === "enable" &&
                      changeDate({ year: vv.year, setSingle: true })
                    }
                  >
                    {vv.year}
                  </span>
                ))}
              </span>
            ))}
            <span
              className={`${prefixCls}-datetime-row-bottom`}
              onClick={setToday}
            >
              {locale.thisYear}
            </span>
          </span>
        );
      }}
    </ConfigProvider.Consumer>
  );
};

export default YearPanel;
