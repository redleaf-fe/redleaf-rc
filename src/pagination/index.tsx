import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactElement,
} from "react";
import cls from "classnames";
import PropTypes from "prop-types";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _last from "lodash/last";

import ConfigProvider from "../config-provider";
import Input from "../input";
import Select from "../select";
import { prefixCls } from "../constants";
import { canbePositiveNumber, isUndefined } from "../utils";
import "../styles/common.css";
import "./style.css";

export interface PaginationProps extends baseProps {
  className?: string;
  itemClassName?: string;
  currentPage?: string | number;
  pageSize?: string | number;
  totalItems: string | number;
  renderTotalItems?: ({
    totalItems,
    currentPage,
    pageSize,
    pages,
  }: {
    totalItems: string | number;
    currentPage: string | number;
    pageSize: string | number;
    pages: string | number;
  }) => ReactElement;
  showPageJumper?: boolean;
  showPageSizeChanger?: boolean;
  onCurrentPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (page: number, pageSize: number) => void;
  pageSizeList?: number[];
}

const Pagination = (props: PaginationProps): ReactElement => {
  const {
    className,
    itemClassName,
    currentPage,
    pageSize = 10,
    totalItems,
    showPageJumper,
    showPageSizeChanger,
    renderTotalItems,
    onCurrentPageChange,
    onPageSizeChange,
    pageSizeList,
    ...restProps
  } = props;

  const [currentPageState, setCurrentPageState] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(10);
  const [pageJump, setPageJump] = useState("");

  const uncontrolled = useMemo(() => {
    return isUndefined(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (canbePositiveNumber(currentPage)) {
      setCurrentPageState(Number(currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    if (canbePositiveNumber(pageSize)) {
      setPageSizeState(Number(pageSize));
    }
  }, [pageSize]);

  const pages = useMemo(() => {
    return Math.ceil(Number(totalItems) / Number(pageSizeState));
  }, [totalItems, pageSizeState]);

  const itemClass = cls("pagination-item", itemClassName);

  const changePage = useCallback(
    (page: number) => {
      uncontrolled && setCurrentPageState(page);
      onCurrentPageChange?.(page, pageSizeState);
    },
    [onCurrentPageChange, pageSizeState, uncontrolled]
  );

  const goFirstPage = useCallback(() => {
    changePage(1);
  }, [changePage]);

  const goLastPage = useCallback(() => {
    changePage(pages);
  }, [changePage, pages]);

  const judgePage = useCallback(
    (page) => {
      page = Math.min(pages, page);
      page = Math.max(1, page);
      uncontrolled && setCurrentPageState(page);
      onCurrentPageChange?.(page, pageSizeState);
    },
    [onCurrentPageChange, pages, uncontrolled, pageSizeState]
  );

  const goPrevPage = useCallback(() => {
    judgePage(currentPageState - 1);
  }, [currentPageState, judgePage]);

  const goNextPage = useCallback(() => {
    judgePage(currentPageState + 1);
  }, [currentPageState, judgePage]);

  const onBlurPageJump = useCallback(() => {
    // 没输入内容不跳
    if (pageJump) {
      judgePage(Number(pageJump));
    }
  }, [pageJump, judgePage]);

  const onChangePageJump = useCallback((e, val) => {
    setPageJump(val);
  }, []);

  const onChangePageSize = useCallback(
    (val) => {
      if (canbePositiveNumber(val[0])) {
        const size = Number(val[0]);
        // 如果当前的每页条数大于之前的，更新当前在第几页，小于不需要
        const newCurrentPage =
          size > pageSizeState
            ? Math.ceil((pageSizeState * currentPageState) / size)
            : currentPageState;
        // 每页size条时，最大的页码
        const maxPage = Math.ceil(Number(totalItems) / Number(size));

        uncontrolled && setCurrentPageState(Math.min(newCurrentPage, maxPage));
        onPageSizeChange?.(newCurrentPage, size);
        setPageSizeState(size);
      }
    },
    // currentPageState不作为依赖，避免循环更新
    [
      pageSizeState,
      onPageSizeChange,
      uncontrolled,
      currentPageState,
      totalItems,
    ]
  );

  const {
    prevPage = true,
    frontItem = false,
    middleItems = [],
    backItem = false,
    nextPage = true,
  } = useMemo(() => {
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
    return {
      prevPage,
      frontItem,
      middleItems,
      backItem,
      nextPage,
    };
  }, [pages, currentPageState]);

  return (
    <ConfigProvider.Consumer>
      {(value: any) => {
        const { lang, langText } = value;
        const locale = Object.assign({}, lang.Pagination, langText);
        return (
          <span
            className={cls(`${prefixCls}-pagination`, className)}
            {...restProps}
          >
            {/* 分页信息 */}
            {renderTotalItems?.({
              totalItems,
              currentPage: currentPageState,
              pageSize: pageSizeState,
              pages,
            })}
            {prevPage && (
              <span className={itemClass} onClick={goPrevPage}>
                {locale.prevPage}
              </span>
            )}
            {/* 放在这里是为了狂点下一页的时候，下一页的按钮位置不会因为item个数的变更而偏移 */}
            {nextPage && (
              <span className={itemClass} onClick={goNextPage}>
                {locale.nextPage}
              </span>
            )}
            {/* 第一页 */}
            {frontItem && (
              <span
                className={cls(itemClass, {
                  "active-pagination": currentPageState === 1,
                })}
                onClick={goFirstPage}
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
                onClick={goLastPage}
              >
                {pages}
              </span>
            )}
            {showPageJumper && (
              <>
                <span className="pagination-jump-text">{locale.goto}</span>
                <Input
                  className="pagination-page-jump"
                  type="int"
                  onBlur={onBlurPageJump}
                  onChange={onChangePageJump}
                />
                <span className="pagination-jump-text">{locale.page}</span>
              </>
            )}
            {showPageSizeChanger && (
              <Select
                className="pagination-size-change"
                placeholder=""
                showSearch={false}
                options={_map(pageSizeList, (v) => ({
                  text: v + locale.sizeUnit,
                  value: String(v),
                }))}
                onChange={onChangePageSize}
              />
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
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalItems: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  showPageJumper: PropTypes.bool,
  showPageSizeChanger: PropTypes.bool,
  renderTotalItems: PropTypes.func,
  onCurrentPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  pageSizeList: PropTypes.arrayOf(PropTypes.number),
};

Pagination.defaultProps = {
  pageSize: 10,
  totalItems: 0,
  showPageJumper: false,
  showPageSizeChanger: false,
  pageSizeList: [10, 20, 50],
};

export default Pagination;
