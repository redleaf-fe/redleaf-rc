import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  ReactElement
} from 'react';
import cls from 'classnames';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';

import { prefixCls } from '../constants';
import { baseProps } from '../types';
import ConfigProvider from '../config-provider';
import { IconArrowSingle, IconArrowDouble } from '../icon';
import { PanelProps } from './declaration';
import { between } from '../utils/js';

dayjs.extend(objectSupport);

const dateArr = ['year', 'month', 'date'];
const weekDayArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DatePanel = (props: PanelProps): ReactElement => {
  const { value, setValue, ...restProps } = props;

  const [activeYear, setActiveYear] = useState(2000);
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeDate, setActiveDate] = useState(1);

  const actionMap: baseProps = useMemo(
    () => ({
      year: setActiveYear,
      month: setActiveMonth,
      date: setActiveDate
    }),
    []
  );

  useEffect(() => {
    let timeVal: baseProps = {};

    if (value) {
      const chosenTime = dayjs(value);
      timeVal = {
        year: chosenTime.year(),
        month: chosenTime.month(),
        date: chosenTime.date()
      };
    } else {
      const nowTime = dayjs();
      timeVal = {
        year: nowTime.year(),
        month: nowTime.month(),
        date: nowTime.date()
      };
    }

    dateArr.forEach(v => {
      actionMap[v](timeVal[v]);
    });
  }, [value, actionMap]);

  const changeDate = useCallback(
    ({ year, month, date }) => {
      // 年月变化，将日期置1
      const ymChanged = year || month;
      // TODO: 小于4位的年份？
      year = between({ val: year, max: 9999, min: 1000 }) || activeYear;
      date = ymChanged ? 1 : date;
      // month的加减需要验证要不要跨年
      if (month !== undefined) {
        const calcDate = dayjs({
          year,
          month: activeMonth,
          date
        } as any).add(month, 'month');

        setValue({
          value: {
            year: calcDate.year(),
            month: calcDate.month(),
            date
          }
        });
      } else {
        setValue({
          value: {
            year,
            month: activeMonth,
            date
          }
        });
      }
    },
    [activeYear, activeMonth, setValue]
  );

  const setToday = useCallback(() => {
    const nowTime = dayjs();
    setValue({
      value: {
        year: nowTime.year(),
        month: nowTime.month(),
        date: nowTime.date()
      }
    });
  }, [setValue]);

  const renderDate = useCallback(() => {
    // 显示一个月的所有日期
    const arr: Array<Array<{ type: 'enable' | 'disable'; date: number }>> = [
      []
    ];
    let idx = 0;
    const nowDay = dayjs(`${activeYear}-${activeMonth + 1}-${activeDate}`);
    const startDay = nowDay.startOf('month');
    const daysInMonth = nowDay.daysInMonth();
    let startDayOfWeek = startDay.day();
    // 补全头部日期
    for (let i = 1; i <= startDayOfWeek; i++) {
      arr[idx].unshift({
        date: startDay.subtract(i, 'day').date(),
        type: 'disable'
      });
    }
    // 本月日期
    for (let i = 1; i <= daysInMonth; i++) {
      arr[idx].push({ date: i, type: 'enable' });
      startDayOfWeek++;
      if (startDayOfWeek > 6) {
        startDayOfWeek = 0;
        arr.push([]);
        idx++;
      }
    }
    // 补全尾部日期
    for (let i = 1; startDayOfWeek <= 6; i++) {
      startDayOfWeek++;
      arr[idx].push({ date: i, type: 'disable' });
    }
    // 补的最后一个日期
    let start = arr[idx][6].date;
    // 小于6行补全
    while (arr.length < 6) {
      arr.push([]);
      idx++;
      for (let i = 1; i <= 7; i++) {
        arr[idx].push({ date: ++start, type: 'disable' });
      }
    }

    return arr.map((v, k) => (
      <span className={`${prefixCls}-datetime-row`} key={k}>
        {v.map((vv, kk) => (
          <span
            className={cls(`${prefixCls}-datetime-col`, {
              [`${prefixCls}-datetime-disable-col`]: vv.type === 'disable',
              [`${prefixCls}-datetime-active-col`]: vv.date === activeDate
            })}
            key={kk}
            onClick={() =>
              vv.type === 'enable' && changeDate({ date: vv.date })
            }
          >
            {vv.date}
          </span>
        ))}
      </span>
    ));
  }, [activeYear, activeMonth, activeDate, changeDate]);

  return (
    <ConfigProvider.Consumer>
      {(value: baseProps) => {
        const { lang, langText } = value;
        const locale = Object.assign({}, lang.DateTime, langText);
        return (
          <span className={`${prefixCls}-datetime-date-panel`} {...restProps}>
            {/* 年月选择 */}
            <span className={`${prefixCls}-datetime-row-over`}>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-left`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear - 1 })}
              >
                <path transform="rotate(180,512,512)" d={IconArrowDouble} />
              </svg>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-left`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ month: -1 })}
              >
                <path transform="rotate(180,512,512)" d={IconArrowSingle} />
              </svg>
              <span
                className={`${prefixCls}-datetime-row-over-text`}
                onClick={() => {
                  setValue({ changeType: 'month' });
                }}
              >
                {activeYear}-{activeMonth + 1}
              </span>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-right`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear + 1 })}
              >
                <path d={IconArrowDouble} />
              </svg>
              <svg
                className={`${prefixCls}-datetime-change-yymm-icon ${prefixCls}-datetime-right`}
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ month: 1 })}
              >
                <path d={IconArrowSingle} />
              </svg>
            </span>
            {/* 周一至周日 */}
            <span className={`${prefixCls}-datetime-row-tip`}>
              {weekDayArr.map(v => (
                <span key={v} className={`${prefixCls}-datetime-row-tip-text`}>
                  {locale[v]}
                </span>
              ))}
            </span>
            {renderDate()}
            <span
              className={`${prefixCls}-datetime-row-bottom`}
              onClick={setToday}
            >
              {locale.today}
            </span>
          </span>
        );
      }}
    </ConfigProvider.Consumer>
  );
};

export default DatePanel;
