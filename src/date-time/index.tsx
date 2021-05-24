import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  ReactElement
} from 'react';
import cls from 'classnames';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import PropTypes from 'prop-types';

import { baseProps } from '../types';
import { prefixCls } from '../constants';
import Trigger from '../trigger';
import { IconCloseFill, IconClock } from '../icon';
import TimePanel from './time';
import DatePanel from './date';
import MonthPanel from './month';
import YearPanel from './year';

import '../styles/common.less';
import './style.less';

dayjs.extend(objectSupport);

const dateArr = ['year', 'month', 'date'];

const placeholderMap = {
  date: '请选择日期',
  month: '请选择月份',
  year: '请选择年份',
  time: '请选择时间',
  'date-time': '请选择日期和时间'
};

const formatMap = {
  'date-time': 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  year: 'YYYY'
};

export interface DateTimeProps extends baseProps {
  className?: string;
  panelClassName?: string;
  itemClassName?: string;
  placeholder?: string;
  value?: string | Date | dayjs.Dayjs | baseProps;
  defaultValue?: string | Date | dayjs.Dayjs | baseProps;
  onChange?: ({ value }: { value: string; meta: dayjs.Dayjs }) => void;
  type?: 'date' | 'month' | 'year' | 'time' | 'date-time';
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
    defaultValue = '',
    onChange,
    type = 'date-time',
    format,
    disabled,
    readOnly,
    showClearIcon,
    placeholder,
    ...restProps
  } = props;

  // 时间值，用于组件之间传递，便于解析
  const [dateTimeMeta, setDateTimeMeta] = useState(dayjs());
  // 时间值，用于显示
  const [dateTimeShow, setDateTimeShow] = useState('');
  // singleType，去除横杠后面的部分，留下的类型，date、month、year、time四个
  // withTime，横杠后面是否带time
  const [singleType, withTime] = useMemo(() => type.split('-'), [type]);
  // typeState用于表示当前所处的panel类型，比如从date切换到month，但最终还要跳回date
  const [typeState, setTypeState] = useState(singleType);

  const uncontrolled = useMemo(() => {
    return value === undefined;
  }, [value]);

  const dealInput = useCallback(val => {
    // 如果输入只有时间，添加一个年份做兼容
    if (typeof val === 'string') {
      const ret = val?.trim();
      if (/^\d{1,2}:\d{1,2}:\d{1,2}$/.test(ret)) {
        return `${dayjs().year()} ${ret}`;
      }
    }
    return val;
  }, []);

  useEffect(() => {
    if (defaultValue) {
      const val = dayjs(dealInput(defaultValue));
      setDateTimeMeta(val);
      setDateTimeShow(val.format(format || formatMap[type]));
    }
    // WARN: 初始化，不需要添加依赖
  }, []);

  useEffect(() => {
    if (!uncontrolled) {
      const val = dayjs(dealInput(value || undefined));
      setDateTimeMeta(val);
      setDateTimeShow(val.format(format || formatMap[type]));
    }
  }, [value, format, type, dealInput, uncontrolled]);

  const onClickClear = useCallback(
    e => {
      e.stopPropagation();
      if (uncontrolled) {
        setDateTimeShow('');
        setDateTimeMeta({} as any);
      }
      onChange?.({ value: '', meta: {} as any });
    },
    [uncontrolled, onChange]
  );

  const onClickItem = useCallback(() => {
    setTypeState(singleType);
  }, [singleType]);

  // 各个panel设置值
  const setValue = useCallback(
    ({ value, panelType, changeType }) => {
      if (changeType) {
        // 切换panel类型
        setTypeState(changeType);
      } else if (panelType && panelType !== singleType) {
        // panel类型切换回上一级
        setTypeState(dateArr[dateArr.indexOf(panelType) + 1]);
      }

      if (!disabled && !readOnly) {
        // 设置时间值
        const val = dayjs(
          Object.assign(
            {},
            {
              // 用toObject代替？
              year: dateTimeMeta?.year?.(),
              month: dateTimeMeta?.month?.(),
              date: dateTimeMeta?.date?.(),
              hour: dateTimeMeta?.hour?.(),
              minute: dateTimeMeta?.minute?.(),
              second: dateTimeMeta?.second?.()
            },
            value || undefined
          )
        );
        const valShow = val.format(format || formatMap[type]);

        if (uncontrolled) {
          setDateTimeMeta(val);
          setDateTimeShow(valShow);
        }
        onChange?.({ value: valShow, meta: val });
      }
    },
    [
      onChange,
      dateTimeMeta,
      singleType,
      type,
      format,
      disabled,
      readOnly,
      uncontrolled
    ]
  );

  const renderPanel = useCallback(() => {
    const panelProps = {
      value: dateTimeMeta,
      setValue
    };

    function renderSinglePanel() {
      switch (typeState) {
        case 'time':
          return <TimePanel {...panelProps} />;
        case 'date':
          return <DatePanel {...panelProps} />;
        case 'month':
          return <MonthPanel {...panelProps} />;
        case 'year':
          return <YearPanel {...panelProps} />;
      }
    }
    return (
      <>
        {renderSinglePanel()}
        {withTime && typeState !== 'time' && <TimePanel {...panelProps} />}
      </>
    );
  }, [typeState, setValue, dateTimeMeta, withTime]);

  return (
    <span
      className={cls(`${prefixCls}-datetime-container`, className)}
      {...restProps}
    >
      <Trigger
        type="click"
        position="bottomCenter"
        topOffset={8}
        onShow={onClickItem}
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
          {dateTimeShow || (
            <span className={`${prefixCls}-datetime-placeholder`}>
              {placeholder || placeholderMap[type]}&nbsp;
            </span>
          )}
          {!disabled && !readOnly && showClearIcon && dateTimeShow ? (
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

const valueType = (props: any) => {
  const type = typeof props.value;
  if (!['string', 'undefined', 'object'].includes(type)) {
    return new Error('value must be type of String, Undefined or Object');
  }
};

DateTime.propTypes = {
  className: string,
  panelClassName: string,
  itemClassName: string,
  type: oneOf(['date', 'month', 'year', 'time', 'date-time']),
  format: string,
  value: valueType,
  defaultValue: valueType,
  placeholder: string,
  onChange: func,
  disabled: bool,
  readOnly: bool,
  showClearIcon: bool
};

DateTime.defaultProps = {
  type: 'date-time',
  defaultValue: '',
  disabled: false,
  readOnly: false,
  showClearIcon: true
};

DateTime.dayjs = dayjs;

export default DateTime;

export { PanelProps } from './declaration';
