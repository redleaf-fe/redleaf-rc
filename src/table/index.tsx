import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactElement,
} from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import _map from 'lodash/map';
import _get from 'lodash/get';

import { prefixCls } from '../constants';
import { dealWithPercentOrPx } from '../utils';
import ResizeObserver from '../resize-observer';

import '../styles/common.less';
import './style.less';

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
  bodyRender?: (rowData: baseProps, index: number) => ReactElement;
  textAlign?: cssTextAlign;
  grow?: boolean;
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
}

const Table = (props: TableProps): ReactElement => {
  const {
    className,
    thClassName,
    trClassName,
    tdClassName,
    columns,
    datasets,
    colScrollWidth,
    rowScrollHeight,
    rowKey,
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
          `table-${borderedRow || borderedFull ? 'bordered-' : ''}theadtr`,
          trClassName,
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
          {_map(columns, (v, k) => {
            const thStyle: CSSProperties = {};
            const widthVal = dealWithPercentOrPx(v.width, '-');
            widthVal !== '-' && (thStyle.width = widthVal);
            v.grow && (thStyle.flexGrow = 1);
            thStyle.textAlign = v.textAlign || 'start';
            return (
              <span
                key={k}
                className={cls(
                  `table-${borderedFull ? 'bordered-' : ''}th`,
                  thClassName,
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
        {_map(datasets, (v, k) => {
          return (
            <span
              key={k}
              className={cls(
                `table-${
                  borderedRow || borderedFull ? 'bordered-' : ''
                }tbodytr`,
                trClassName,
              )}
            >
              {_map(columns, (vv, kk) => {
                const tdStyle: CSSProperties = {};
                // 根据th的宽度来设置td的宽度
                tdStyle.width = colWidths[kk];
                tdStyle.textAlign = vv.textAlign || 'start';
                const bodyRenderRes = vv.bodyRender?.(v, k);
                return (
                  <span
                    key={kk}
                    className={cls(
                      `table-${borderedFull ? 'bordered-' : ''}td`,
                      tdClassName,
                    )}
                    style={tdStyle}
                  >
                    {bodyRenderRes || _get(v, vv.columnKey)}
                  </span>
                );
              })}
            </span>
          );
        })}
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
  ]);

  return (
    <span
      className={cls(`${prefixCls}-table-container`, className)}
      {...restProps}
    >
      <span
        className={cls(`${prefixCls}-thead`)}
        style={{ width: dealScrollDistance(colScrollWidth) }}
      >
        {renderHead()}
      </span>
      <span
        className={cls(`${prefixCls}-tbody`)}
        style={{
          width: dealScrollDistance(colScrollWidth),
          height: dealScrollDistance(rowScrollHeight),
        }}
      >
        {renderBody()}
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
} = PropTypes;

const columnsShape = shape({
  width: oneOfType([string, number]),
  title: string.isRequired,
  columnKey: string.isRequired,
  bodyRender: func,
  textAlign: string,
  grow: bool,
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
};

Table.defaultProps = {
  columns: [],
  datasets: [],
  bordered: 'row',
  colScrollWidth: 0,
  rowScrollHeight: 0,
};

export default Table;
