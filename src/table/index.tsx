import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactElement
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { baseProps, cssTextAlign } from '../types';
import { prefixCls } from '../constants';
import { dealWithPercentOrPx } from '../utils/style';
import ResizeObserver from '../resize-observer';
import Loading from '../loading';

import '../styles/common.less';
import './style.less';

/* TODO: 
排序、筛选
onRow
onHeaderRow
onCell
onHeaderCell
勾选、全选
拖动排序
拖动调整大小
rowKey
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
  title: string;
  columnKey: string;
  render?: ({
    meta,
    index
  }: {
    meta: baseProps;
    index: number;
  }) => ReactElement;
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
  rowKey?: string;
  bordered?: 'none' | 'full' | 'row';
  nodataText?: string;
  loading?: boolean;
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
    rowKey,
    nodataText,
    loading,
    bordered,
    ...restProps
  } = props;
  const borderedRow = useMemo(() => bordered === 'row', [bordered]);
  const borderedFull = useMemo(() => bordered === 'full', [bordered]);
  const measureRef = useRef<HTMLTableRowElement | null>(null);
  const [colWidths, setColWidths] = useState<number[]>([]);

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
  }, [borderedFull, borderedRow, columns, thClassName, trClassName, colWidths]);

  const renderBody = useCallback(() => {
    return (
      <>
        {datasets.length > 0 ? (
          datasets.map((v, k) => {
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
                {columns.map((vv, kk) => {
                  const tdStyle: CSSProperties = {};
                  // 根据th的宽度来设置td的宽度
                  tdStyle.width = colWidths[kk];
                  tdStyle.textAlign = vv.textAlign || 'start';
                  const renderRes = vv.render?.({ meta: v, index: k });
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
                      {renderRes || _get(v, vv.columnKey)}
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
    borderedFull,
    borderedRow,
    columns,
    datasets,
    tdClassName,
    trClassName,
    colWidths,
    nodataText
  ]);

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
  oneOf
} = PropTypes;

const columnsShape = shape({
  width: oneOfType([string, number]),
  title: string.isRequired,
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
  rowKey: string,
  bordered: oneOf(['none', 'full', 'row']),
  nodataText: string,
  loading: bool
};

Table.defaultProps = {
  bordered: 'row',
  loading: false,
  colScrollWidth: 0,
  rowScrollHeight: 0
};

export default Table;
