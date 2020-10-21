import React, {
  ChangeEvent,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  ReactElement,
} from "react";
import cls from "classnames";
import PropTypes from "prop-types";
import _map from "lodash/map";
import _uniqBy from "lodash/uniqBy";
import _filter from "lodash/filter";

import { prefixCls } from "../constants";
import { canbePositiveNumber, isUndefined, isArray } from "../utils";
import { IconClose, IconCloseFill, IconSearch, IconArrowDown } from "../icon";
import "../styles/common.css";
import "./style.css";

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
  type?: "single" | "multi";
  disabled?: boolean;
  readOnly?: boolean;
  maxNum?: number | string;
  value?: string[];
  onChange?: (value: string[], selection: ISelection[]) => void;
  onSearch?: (value: string) => void;
  options?: ISelectOption[];
  placeholder?: string;
  searchNodata?: string;
  showSearch?: boolean;
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
    onChange,
    onSearch,
    options,
    placeholder,
    searchNodata,
    showSearch,
    ...restProps
  } = props;

  const [selectValue, setSelectValue] = useState<ISelection[]>([]);
  // 因为有搜索过滤功能，所以需要单独设置一个options的state
  const [optionsState, setOptionsState] = useState<ISelectOption[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const containerRef = useRef<HTMLElement | null>(null);

  const isSingle = useMemo(() => {
    return type === "single";
  }, [type]);

  const uncontrolled = useMemo(() => {
    return isUndefined(value);
  }, [value]);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      // 点击select以外区域，隐藏
      if (!containerRef.current?.contains(e.target as HTMLElement)) {
        setSearchVal("");
        setShowOptions(false);
      }
    };
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, []);

  useEffect(() => {
    // 处理value和maxNum变更
    if (isArray(value)) {
      // 从options和selectValue中过滤value
      let val = _uniqBy(
        [
          ..._filter(selectValue, (v) => value?.includes(v.value)),
          ..._filter(options, (v) => value?.includes(v.value)),
        ],
        "value"
      ) as ISelection[];
      if (canbePositiveNumber(maxNum)) {
        val = val.slice(0, Number(maxNum));
      }
      setSelectValue(val);
    }

    // 处理options变更
    searchVal
      ? setOptionsState(_filter(options, (v) => v.text.includes(searchVal)))
      : setOptionsState(options || []);

    // 这里不能添加selectValue作为依赖，不然循环更新
  }, [value, maxNum, options, searchVal]);

  const onClickItems = useCallback(() => {
    if (showOptions) {
      setSearchVal("");
      setShowOptions(false);
    } else {
      !disabled && !readOnly && setShowOptions(true);
    }
  }, [showOptions, disabled, readOnly]);

  const onClickOptions = useCallback(
    (v) => {
      if (!v.disabled) {
        if (isSingle) {
          uncontrolled && setSelectValue([v]);
          onChange?.([v.value], [v]);
          setShowOptions(false);
        } else {
          let val = _uniqBy([...selectValue, v], "value");
          if (canbePositiveNumber(maxNum)) {
            val = val.slice(0, Number(maxNum));
          }
          uncontrolled && setSelectValue(val);
          onChange?.(
            _map(val, (vv) => vv.value),
            val
          );
        }
      }
    },
    [isSingle, onChange, setSelectValue, maxNum, selectValue, uncontrolled]
  );

  const onClickClose = useCallback(
    (e, v) => {
      const val = _filter(selectValue, (vv) => vv.value !== v.value);
      uncontrolled && setSelectValue(val);
      onChange?.(
        _map(val, (vv) => vv.value),
        val
      );
      e.stopPropagation();
    },
    [selectValue, setSelectValue, onChange, uncontrolled]
  );

  const onClickClear = useCallback(
    (e) => {
      uncontrolled && setSelectValue([]);
      onChange?.([], []);
      e.stopPropagation();
    },
    [setSelectValue, uncontrolled, onChange]
  );

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchVal(val);
      setOptionsState(_filter(options, (v) => v.text.includes(val)));
      onSearch?.(val);
    },
    [options, onSearch]
  );

  const renderOptions = useCallback(() => {
    const arr = (searchVal ? optionsState : options) || [];
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
              <path d={IconSearch} fill="#bbb" />
            </svg>
          </span>
        )}
        {arr.length > 0 ? (
          _map(arr, (v) => {
            return (
              <span
                className={cls("select-option", {
                  "select-disabled-option": v.disabled,
                })}
                key={v.value}
                onClick={() => {
                  onClickOptions(v);
                }}
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
            <span className="select-item-text">{selectValue[0].text}</span>
          </span>
        ) : (
          _map(selectValue, (v) => {
            return (
              <span className="select-item" key={v.value}>
                <span className="select-item-text">{v.text}</span>
                {!disabled && !readOnly && (
                  <svg
                    className="select-item-close-icon"
                    viewBox="0 0 1024 1024"
                    onClick={(e) => {
                      onClickClose(e, v);
                    }}
                  >
                    <path d={IconClose} fill="#bbb" />
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
      ref={containerRef}
    >
      <span
        className={cls(
          "select-options",
          { "select-options-hidden": !showOptions },
          optionsClassName
        )}
      >
        {renderOptions()}
      </span>
      <span
        className={cls(
          "select-items",
          { "select-disabled-items": disabled },
          itemsClassName
        )}
        onClick={onClickItems}
        {...restProps}
      >
        {selectValue.length > 0 ? (
          renderItems()
        ) : (
          <span className="select-placeholder">{placeholder}&nbsp;</span>
        )}
        {!disabled && !readOnly && selectValue.length > 0 ? (
          <svg
            className="select-clear-icon"
            viewBox="0 0 1024 1024"
            onClick={onClickClear}
          >
            <path d={IconCloseFill} fill="#bbb" />
          </svg>
        ) : (
          <svg className="select-clear-icon" viewBox="0 0 1024 1024">
            <path d={IconArrowDown} fill="#bbb" />
          </svg>
        )}
      </span>
    </span>
  );
};

const optionShape = PropTypes.shape({
  className: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

Select.propTypes = {
  className: PropTypes.string,
  itemsClassName: PropTypes.string,
  optionsClassName: PropTypes.string,
  type: PropTypes.oneOf(["single", "multi"]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  options: PropTypes.arrayOf(optionShape),
  placeholder: PropTypes.string,
  searchNodata: PropTypes.string,
  showSearch: PropTypes.bool,
};

Select.defaultProps = {
  type: "single",
  disabled: false,
  readOnly: false,
  showSearch: true,
  options: [],
  placeholder: "请选择",
  searchNodata: "暂无数据",
};

export default Select;
