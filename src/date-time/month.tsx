import React, { useCallback, useEffect, useState, ReactElement } from 'react';
import cls from 'classnames';
import dayjs from 'dayjs';

import ConfigProvider from '../config-provider';
import { IconArrowSingle, IconArrowDouble } from '../icon';
import { PanelProps } from './declaration';
import { between } from '../utils/js';

const monthArr = [
  ['Jan', 'Feb', 'Mar'],
  ['Apr', 'May', 'Jun'],
  ['Jul', 'Aug', 'Sep'],
  ['Oct', 'Nov', 'Dec'],
];
const monthPlainArr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MonthPanel = (props: PanelProps): ReactElement => {
  const { value, setValue, ...restProps } = props;

  const [activeYear, setActiveYear] = useState(2000);
  const [activeMonth, setActiveMonth] = useState(0);

  useEffect(() => {
    const val = dayjs(value);
    setActiveYear(val.year());
    setActiveMonth(val.month());
  }, [value]);

  const changeDate = useCallback(
    ({ year, month }) => {
      const val: any = {
        value: {
          year: between({ val: year, max: 9999, min: 1000 }) || activeYear,
          month: month || activeMonth,
          date: 1,
        },
      };
      if (month) {
        val.panelType = 'month';
      }
      setValue(val);
    },
    [activeYear, activeMonth, setValue],
  );

  const setToday = useCallback(() => {
    const nowTime = dayjs();

    setValue({
      value: {
        year: nowTime.year(),
        month: nowTime.month(),
        date: 1,
      },
      panelType: 'month',
    });
  }, [setValue]);

  return (
    <ConfigProvider.Consumer>
      {(value: baseProps) => {
        const { lang, langText } = value;
        const locale = Object.assign({}, lang.DateTime, langText);
        return (
          <span className="month-panel" {...restProps}>
            {/* 年月选择 */}
            <span className="row-over">
              <svg
                className="change-yymm-icon left"
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear - 10 })}
              >
                <path transform="rotate(180,512,512)" d={IconArrowDouble} />
              </svg>
              <svg
                className="change-yymm-icon left"
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear - 1 })}
              >
                <path transform="rotate(180,512,512)" d={IconArrowSingle} />
              </svg>
              <span
                className="text"
                onClick={() => {
                  setValue({ changeType: 'year' });
                }}
              >
                {activeYear}
              </span>
              <svg
                className="change-yymm-icon right"
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear + 10 })}
              >
                <path d={IconArrowDouble} />
              </svg>
              <svg
                className="change-yymm-icon right"
                viewBox="0 0 1024 1024"
                onClick={() => changeDate({ year: activeYear + 1 })}
              >
                <path d={IconArrowSingle} />
              </svg>
            </span>
            {monthArr.map((v, k) => (
              <span className="row" key={k}>
                {v.map((vv, kk) => (
                  <span
                    className={cls('col', {
                      'active-col': vv === monthPlainArr[activeMonth],
                    })}
                    key={kk}
                    onClick={() =>
                      changeDate({ month: monthPlainArr.indexOf(vv) })
                    }
                  >
                    {locale[vv]}
                  </span>
                ))}
              </span>
            ))}
            <span className="row-bottom" onClick={setToday}>
              {locale.thisMonth}
            </span>
          </span>
        );
      }}
    </ConfigProvider.Consumer>
  );
};

export default MonthPanel;
