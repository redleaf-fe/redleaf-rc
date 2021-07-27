import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactElement,
  ReactNode
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { baseProps, cssTextAlign } from '../types';
import { prefixCls } from '../constants';
import { dealWithPercentOrPx } from '../utils/style';
import { useCheck } from '../utils/hooks';
import ResizeObserver from '../resize-observer';
import Loading from '../loading';
import Check, { ICheckOption } from '../check';

import '../styles/common.less';
import './style.less';

/* TODO: 
排序、筛选
onRow
onHeaderRow
onCell
onHeaderCell
拖动排序
拖动调整大小
*/

function dealScrollDistance(val: number | string | undefined) {
  if (typeof val === 'number') {
    if (Number(val) > 0) {
      return val + 'px';
    }
  } else {
    return dealWithPercentOrPx(val);
  }
}

export interface ITableColumns extends baseProps {
  width?: number | string;
  title: ReactNode;
  columnKey: string;
  render?: ({ meta, index }: { meta: baseProps; index: number }) => ReactNode;
  textAlign?: cssTextAlign;
  grow?: number;
}

export interface TableProps extends baseProps {
  className?: string;
  thClassName?: string;
  trClassName?: string;
  tdClassName?: string;
  columns: ITableColumns[];
  datasets: baseProps[];
  colScrollWidth?: string | number;
  rowScrollHeight?: string | number;
  bordered?: 'none' | 'full' | 'row';
  nodataText?: string;
  loading?: boolean;
  checkKey?: string;
  checkable?: boolean;
  checkType?: 'single' | 'multi';
  checkValue?: string[];
  checkDefaultValue?: string[];
  checkMaxNum?: number;
  onCheckChange?: ({
    value,
    meta
  }: {
    value: string[];
    meta: ICheckOption[];
  }) => void;
}

const Table = (props: TableProps): ReactElement => {
  const {
    className,
    thClassName,
    trClassName,
    tdClassName,
    columns = [],
    datasets = [],
    colScrollWidth,
    rowScrollHeight,
    nodataText,
    loading,
    bordered,
    checkKey,
    checkable,
    checkType = 'multi',
    checkDefaultValue,
    checkValue,
    checkMaxNum,
    onCheckChange,
    ...restProps
  } = props;
  const borderedRow = useMemo(() => bordered === 'row', [bordered]);
  const borderedFull = useMemo(() => bordered === 'full', [bordered]);
  const measureRef = useRef<HTMLTableRowElement | null>(null);
  const [colWidths, setColWidths] = useState<number[]>([]);

  // 选中相关
  const {
    isSingle,
    dealCheck,
    checkedValues,
    addAll,
    delAll,
    checkMeta,
    setCheckMeta
  } = useCheck<ICheckOption>({
    type: checkType,
    value: checkValue,
    options: datasets.map(v => ({ value: _get(v, checkKey || ''), text: '' })),
    maxNum: checkMaxNum,
    defaultValue: checkDefaultValue,
    onChange: onCheckChange
  });

  const renderHead = useCallback(() => {
    return (
      <span
        className={cls(
          `${prefixCls}-table-theadtr`,
          {
            [`${prefixCls}-table-bordered-theadtr`]: borderedRow || borderedFull
          },
          trClassName
        )}
        ref={measureRef}
      >
        {checkable && checkKey && (
          <Check
            className={cls(
              `${prefixCls}-table-th`,
              `${prefixCls}-table-th-check`,
              { [`${prefixCls}-table-bordered-th`]: borderedFull },
              thClassName
            )}
            shape="rect"
            options={[{ value: '-', text: '' }]}
            // value={checkMeta.map(v => v.value)}
            onChange={({ meta }) => {
              if (meta.length) {
                addAll();
              } else {
                delAll();
              }
            }}
          />
        )}
        <ResizeObserver
          onResize={entries => {
            const arr: number[] = [];
            entries.forEach((entry, k) => {
              arr[k] = (entry.target as HTMLElement).offsetWidth;
            });
            // 如果出现列宽度有不一致的情况下，才需要进行设置宽度操作
            for (let i = 0; i < arr.length; i++) {
              if (colWidths[i] !== arr[i]) {
                setColWidths(arr);
                break;
              }
            }
          }}
        >
          {columns.map((v, k) => {
            const thStyle: CSSProperties = {};
            const widthVal = dealWithPercentOrPx(v.width, '-');
            widthVal !== '-' && (thStyle.width = widthVal);
            const { grow = 0 } = v;
            thStyle.flexGrow = grow;
            thStyle.textAlign = v.textAlign || 'start';
            return (
              <span
                key={k}
                className={cls(
                  `${prefixCls}-table-th`,
                  { [`${prefixCls}-table-bordered-th`]: borderedFull },
                  thClassName
                )}
                style={thStyle}
              >
                {v.title}
              </span>
            );
          })}
        </ResizeObserver>
      </span>
    );
  }, [
    delAll,
    addAll,
    checkKey,
    checkable,
    borderedFull,
    borderedRow,
    columns,
    thClassName,
    trClassName,
    colWidths
  ]);

  const renderBody = useCallback(() => {
    return (
      <>
        {datasets.length > 0 ? (
          datasets.map((v, k) => {
            const itemOption = { value: _get(v, checkKey || ''), text: '' };
            return (
              <span
                key={k}
                className={cls(
                  `${prefixCls}-table-tbodytr`,
                  {
                    [`${prefixCls}-table-bordered-tbodytr`]:
                      borderedRow || borderedFull
                  },
                  trClassName
                )}
              >
                {checkable && checkKey && (
                  <Check
                    className={cls(
                      `${prefixCls}-table-td`,
                      { [`${prefixCls}-table-bordered-td`]: borderedFull },
                      tdClassName
                    )}
                    shape="rect"
                    options={[itemOption]}
                    value={checkedValues}
                    onChange={({ meta }) => {
                      let val;
                      if (meta.length) {
                        val = isSingle
                          ? [itemOption]
                          : dealCheck(
                              [...checkMeta, itemOption].map(vv => vv.value)
                            );
                      } else {
                        val = checkMeta.filter(
                          vv => vv.value !== itemOption.value
                        );
                      }
                      setCheckMeta(val as ICheckOption[]);
                    }}
                  />
                )}
                {columns.map((vv, kk) => {
                  const tdStyle: CSSProperties = {};
                  // 根据th的宽度来设置td的宽度
                  tdStyle.width = colWidths[kk];
                  tdStyle.textAlign = vv.textAlign || 'start';
                  return (
                    <span
                      key={kk}
                      className={cls(
                        `${prefixCls}-table-td`,
                        { [`${prefixCls}-table-bordered-td`]: borderedFull },
                        tdClassName
                      )}
                      style={tdStyle}
                    >
                      {typeof vv.render === 'function'
                        ? vv.render?.({ meta: v, index: k })
                        : _get(v, vv.columnKey)}
                    </span>
                  );
                })}
              </span>
            );
          })
        ) : (
          <span className={`${prefixCls}-table-nodata`}>
            {nodataText || '暂无数据'}
          </span>
        )}
      </>
    );
  }, [
    isSingle,
    dealCheck,
    checkMeta,
    setCheckMeta,
    checkedValues,
    checkKey,
    checkable,
    borderedFull,
    borderedRow,
    columns,
    datasets,
    tdClassName,
    trClassName,
    colWidths,
    nodataText
  ]);

  console.log(checkedValues);

  return (
    <span
      className={cls(`${prefixCls}-table-container`, className)}
      {...restProps}
    >
      <span
        className={`${prefixCls}-table-thead`}
        style={{ width: dealScrollDistance(colScrollWidth) }}
      >
        {renderHead()}
      </span>
      <span
        className={`${prefixCls}-table-tbody`}
        style={{
          width: dealScrollDistance(colScrollWidth),
          height: dealScrollDistance(rowScrollHeight)
        }}
      >
        {loading ? (
          <span className={`${prefixCls}-table-loading`}>
            <Loading />
          </span>
        ) : (
          renderBody()
        )}
      </span>
    </span>
  );
};

const {
  shape,
  oneOfType,
  bool,
  string,
  number,
  func,
  arrayOf,
  array,
  oneOf,
  node
} = PropTypes;

const columnsShape = shape({
  width: oneOfType([string, number]),
  title: node.isRequired,
  columnKey: string.isRequired,
  render: func,
  textAlign: oneOf(['start', 'end', 'center']),
  grow: number
});

Table.propTypes = {
  className: string,
  thClassName: string,
  trClassName: string,
  tdClassName: string,
  columns: arrayOf(columnsShape).isRequired,
  datasets: array.isRequired,
  colScrollWidth: oneOfType([string, number]),
  rowScrollHeight: oneOfType([string, number]),
  bordered: oneOf(['none', 'full', 'row']),
  nodataText: string,
  loading: bool,
  checkKey: string,
  checkable: bool,
  checkType: oneOf(['single', 'multi']),
  checkValue: arrayOf(string),
  checkDefaultValue: arrayOf(string),
  checkMaxNum: number,
  onCheckChange: func
};

Table.defaultProps = {
  bordered: 'row',
  loading: false,
  colScrollWidth: 0,
  rowScrollHeight: 0,
  checkable: false,
  checkType: 'multi'
};

export default Table;
