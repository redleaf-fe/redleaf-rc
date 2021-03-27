import React, {
  ChangeEvent,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactElement,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _uniqBy from 'lodash/uniqBy';

import { baseProps } from '../types';
import { prefixCls } from '../constants';
import { IconClose, IconCloseFill, IconSearch, IconArrowSingle } from '../icon';
import Trigger from '../trigger';

import '../styles/common.less';
import './style.less';

/* TODO: 
下拉框和选中的内容支持自定义展示
可输入内容作为选中项
*/

export interface ISelection extends baseProps {
  text: string;
  value: string;
}

export interface ISelectOption extends ISelection {
  disabled?: boolean;
}

export interface SelectProps extends baseProps {
  className?: string;
  itemsClassName?: string;
  optionsClassName?: string;
  type?: 'single' | 'multi';
  disabled?: boolean;
  readOnly?: boolean;
  maxNum?: number;
  value?: string[];
  defaultValue?: string[];
  onChange?: ({ value, meta }: { value: string[]; meta: ISelection[] }) => void;
  onSearch?: (value: string) => void;
  options: ISelectOption[];
  placeholder?: string;
  searchNodata?: string;
  showSearch?: boolean;
  showClearIcon?: boolean;
}

const Select = (props: SelectProps): ReactElement => {
  const {
    className,
    itemsClassName,
    optionsClassName,
    type,
    disabled,
    readOnly,
    maxNum,
    value,
    defaultValue = [],
    onChange,
    onSearch,
    options = [],
    placeholder,
    searchNodata,
    showSearch,
    showClearIcon,
    ...restProps
  } = props;

  const [selectValue, setSelectValue] = useState<ISelection[]>([]);
  // 因为有搜索过滤功能，所以需要单独设置一个options的state
  const [optionsState, setOptionsState] = useState<ISelectOption[]>([]);
  const [searchVal, setSearchVal] = useState('');

  const isSingle = useMemo(() => {
    return type === 'single';
  }, [type]);

  const uncontrolled = useMemo(() => {
    return value === undefined;
  }, [value]);

  const dealInput = useCallback(
    val => {
      // 从options中过滤value
      let ret = _uniqBy(
        options.filter(v => val?.includes(v.value)),
        'value',
      );

      if (Number(maxNum) > 0) {
        ret = ret.slice(0, Number(maxNum));
      }
      return ret;
    },
    [options, maxNum],
  );

  useEffect(() => {
    defaultValue.length > 0 && setSelectValue(dealInput(defaultValue));
    // WARN: 初始化，不需要添加依赖
  }, []);

  useEffect(() => {
    if (!uncontrolled) {
      setSelectValue(dealInput(value));
    }
  }, [value, dealInput, uncontrolled]);

  useEffect(() => {
    // 处理options变更
    searchVal
      ? setOptionsState(options.filter(v => v.text.includes(searchVal)))
      : setOptionsState(options);
  }, [options, searchVal]);

  const onClickItems = useCallback(() => {
    setSearchVal('');
  }, []);

  const onClickOptions = useCallback(
    v => {
      if (!readOnly && !disabled && !v.disabled) {
        if (isSingle) {
          uncontrolled && setSelectValue([v]);
          onChange?.({ value: [v.value], meta: [v] });
        } else {
          let val = _uniqBy([...selectValue, v], 'value');
          if (Number(maxNum) > 0) {
            val = val.slice(0, Number(maxNum));
          }
          uncontrolled && setSelectValue(val);
          onChange?.({ value: val.map(vv => vv.value), meta: val });
        }
      }
    },
    [isSingle, onChange, maxNum, selectValue, readOnly, disabled, uncontrolled],
  );

  const onClickClose = useCallback(
    (e, v) => {
      e.stopPropagation();
      // readOnly, disabled不用处理，因为渲染的时候判断了
      const val = selectValue.filter(vv => vv.value !== v.value);
      uncontrolled && setSelectValue(val);
      onChange?.({ value: val.map(vv => vv.value), meta: val });
    },
    [selectValue, onChange, uncontrolled],
  );

  const onClickClear = useCallback(
    e => {
      e.stopPropagation();
      // readOnly, disabled不用处理，因为渲染的时候判断了
      uncontrolled && setSelectValue([]);
      onChange?.({ value: [], meta: [] });
    },
    [uncontrolled, onChange],
  );

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchVal(val);
      setOptionsState(options.filter(v => v.text.includes(val)));
      onSearch?.(val);
    },
    [options, onSearch],
  );

  const renderOptions = useCallback(() => {
    const arr = searchVal ? optionsState : options;
    return (
      <>
        {showSearch && (
          <span className="select-search-container">
            <input
              type="text"
              className="select-search"
              onChange={onChangeSearch}
              value={searchVal}
            />
            <svg className="select-search-icon" viewBox="0 0 1024 1024">
              <path d={IconSearch} />
            </svg>
          </span>
        )}
        {arr.length > 0 ? (
          arr.map(v => {
            return (
              <span
                className={cls('select-option', {
                  'select-disabled-option': v.disabled,
                })}
                key={v.value}
                onClick={() => onClickOptions(v)}
              >
                {v.text}
              </span>
            );
          })
        ) : (
          <span className="select-option">{searchNodata}</span>
        )}
      </>
    );
  }, [
    optionsState,
    options,
    searchVal,
    onChangeSearch,
    searchNodata,
    onClickOptions,
    showSearch,
  ]);

  const renderItems = useCallback(() => {
    return (
      <>
        {isSingle ? (
          <span className="select-item select-item-single">
            <span className="select-item-text select-single-item-text">
              {selectValue[0].text}
            </span>
          </span>
        ) : (
          selectValue.map(v => {
            return (
              <span className="select-item" key={v.value}>
                <span className="select-item-text">{v.text}</span>
                {!disabled && !readOnly && (
                  <svg
                    className="select-item-close-icon"
                    viewBox="0 0 1024 1024"
                    onClick={e => {
                      onClickClose(e, v);
                    }}
                  >
                    <path d={IconClose} />
                  </svg>
                )}
              </span>
            );
          })
        )}
      </>
    );
  }, [selectValue, isSingle, disabled, readOnly, onClickClose]);

  return (
    <span
      className={cls(`${prefixCls}-select-container`, className)}
      {...restProps}
    >
      <Trigger
        type="click"
        position="bottomCenter"
        topOffset={8}
        content={
          <span className={cls('select-options', optionsClassName)}>
            {renderOptions()}
          </span>
        }
      >
        <span
          className={cls(
            'select-items',
            { 'select-disabled-items': disabled },
            { 'select-readOnly-items': readOnly },
            itemsClassName,
          )}
          onClick={onClickItems}
        >
          {selectValue.length > 0 ? (
            renderItems()
          ) : (
            <span className="select-placeholder">{placeholder}&nbsp;</span>
          )}
          {!disabled && !readOnly && showClearIcon && selectValue.length > 0 ? (
            <svg
              className="select-clear-icon"
              viewBox="0 0 1024 1024"
              onClick={onClickClear}
            >
              <path d={IconCloseFill} />
            </svg>
          ) : (
            <svg className="select-clear-icon" viewBox="0 0 1024 1024">
              <path transform="rotate(90,512,512)" d={IconArrowSingle} />
            </svg>
          )}
        </span>
      </Trigger>
    </span>
  );
};

const { shape, string, bool, oneOf, number, arrayOf, func } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string.isRequired,
  value: string.isRequired,
});

Select.propTypes = {
  className: string,
  itemsClassName: string,
  optionsClassName: string,
  type: oneOf(['single', 'multi']),
  disabled: bool,
  readOnly: bool,
  maxNum: number,
  value: arrayOf(string),
  defaultValue: arrayOf(string),
  onChange: func,
  onSearch: func,
  options: arrayOf(optionShape).isRequired,
  placeholder: string,
  searchNodata: string,
  showSearch: bool,
  showClearIcon: bool,
};

Select.defaultProps = {
  type: 'single',
  disabled: false,
  readOnly: false,
  showSearch: true,
  options: [],
  defaultValue: [],
  placeholder: '请选择',
  searchNodata: '暂无数据',
  showClearIcon: true,
};

export default Select;
