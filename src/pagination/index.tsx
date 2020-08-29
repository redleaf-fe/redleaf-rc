import React, { CSSProperties, useState, useEffect, useCallback } from "react";
import cls from "classnames";
import PropTypes from "prop-types";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _last from "lodash/last";

import ConfigProvider from "../config-provider";
import { prefixCls } from "../constants";
import { canbePositiveNumber } from "../utils";
import "../styles/common.css";
import "./style.css";

export interface IProps extends baseProps {
  className?: string;
  itemClassName?: string;
  style?: CSSProperties;
  currentPage?: string | number;
  pageSize?: string | number;
  totalItems: string | number;
  renderTotalItems?: Function;
  showPageJumper?: boolean;
  showPageSizeChanger?: boolean;
  onCurrentPageChange?: Function;
  onPageSizeChange?: Function;
}

const Pagination = (props: IProps) => {
  const {
    className,
    itemClassName,
    style,
    currentPage,
    pageSize,
    totalItems,
    showPageJumper,
    showPageSizeChanger,
    renderTotalItems,
    onCurrentPageChange,
    onPageSizeChange,
    ...restProps
  } = props;

  const [currentPageState, setCurrentPageState] = useState(1);

  useEffect(() => {
    if (canbePositiveNumber(currentPage)) {
      setCurrentPageState(Number(currentPage));
    }
  }, [currentPage]);

  const pages = Math.ceil(Number(totalItems) / Number(pageSize));

  const itemClass = cls("pagination-item", itemClassName);

  const changePage = useCallback((page: number) => {
    // currentPage属性没有传数字，认为是非受控形式
    if (!canbePositiveNumber(currentPage)) {
      setCurrentPageState(page);
    }
    onCurrentPageChange?.(page);
  }, [currentPage]);

  const goPrevNextPage = useCallback((direct: number) => {
    let page = currentPageState + direct;
    page = Math.min(pages, page);
    page = Math.max(1, page);
    if (!canbePositiveNumber(currentPage)) {
      setCurrentPageState(page);
    }
    onCurrentPageChange?.(page);
  }, [currentPageState, pages]);

  // 分页展示item计算
  let prevPage = true;
  let frontItem = false;
  let middleItems: Array<number | string> = [];
  let backItem = false;
  let nextPage = true;
  // 页数少于7个时，按照数量展示
  // 页数大于7个时，第一页和最后一页固定展示，中间按照当前页左右两个均摊，左右两边超过第一页和最后一页时截掉
  if (pages === 0) {
    prevPage = false;
    nextPage = false;
  } else if (pages === 1) {
    frontItem = true;
    prevPage = false;
    nextPage = false;
  } else if (pages < 8) {
    frontItem = true;
    backItem = true;
    for (let i = 2; i < pages; i++) {
      middleItems.push(i);
    }
  } else if (pages >= 8) {
    frontItem = true;
    backItem = true;
    const numCurrentPage = Number(currentPageState);
    middleItems = _filter(
      [
        numCurrentPage - 2,
        numCurrentPage - 1,
        numCurrentPage,
        numCurrentPage + 1,
        numCurrentPage + 2,
      ],
      (v) => {
        return v > 1 && v < pages;
      }
    );
    if (Number(middleItems[0]) > 2) {
      middleItems.unshift("•••");
    }
    if (Number(_last(middleItems)) + 1 < pages) {
      middleItems.push("•••");
    }
  }
  // 分页展示item计算 end

  return (
    <ConfigProvider.Consumer>
      {(value: any) => {
        const { lang, langText } = value;
        const locale = Object.assign({}, lang.Pagination, langText);
        return (
          <span
            className={cls(`${prefixCls}-pagination`, className)}
            style={style}
            {...restProps}
          >
            {renderTotalItems &&
              renderTotalItems({
                totalItems,
                currentPage: currentPageState,
                pageSize,
                pages,
              })}
            {prevPage && (
              <span
                className={itemClass}
                onClick={() => {
                  goPrevNextPage(-1);
                }}
              >
                {locale.prevPage}
              </span>
            )}
            {/* 放在这里是为了狂点下一页的时候，下一页的按钮位置不会因为item个数的变更而偏移 */}
            {nextPage && (
              <span
                className={itemClass}
                onClick={() => {
                  goPrevNextPage(1);
                }}
              >
                {locale.nextPage}
              </span>
            )}
            {/* 第一页 */}
            {frontItem && (
              <span
                className={cls(itemClass, {
                  "active-pagination": currentPageState === 1,
                })}
                onClick={() => {
                  changePage(1);
                }}
              >
                1
              </span>
            )}
            {middleItems.length > 0 &&
              _map(middleItems, (v, k) =>
                v === "•••" ? (
                  <span key={k} className="pagination-ellipsis">
                    •••
                  </span>
                ) : (
                  <span
                    key={k}
                    className={cls(itemClass, {
                      "active-pagination": currentPageState === v,
                    })}
                    onClick={() => {
                      changePage(Number(v));
                    }}
                  >
                    {v}
                  </span>
                )
              )}
            {/* 最后一页 */}
            {backItem && (
              <span
                className={cls(itemClass, {
                  "active-pagination": currentPageState === pages,
                })}
                onClick={() => {
                  changePage(Number(pages));
                }}
              >
                {pages}
              </span>
            )}
          </span>
        );
      }}
    </ConfigProvider.Consumer>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  style: PropTypes.object,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalItems: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  showPageJumper: PropTypes.bool,
  showPageSizeChanger: PropTypes.bool,
  renderTotalItems: PropTypes.func,
  onCurrentPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

Pagination.defaultProps = {
  pageSize: 10,
  totalItems: 0,
  showPageJumper: false,
  showPageSizeChanger: false,
};

export default Pagination;
