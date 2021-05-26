import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactElement,
} from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import ConfigProvider from "../config-provider";
import Input from "../input";
import Select from "../select";
import { IconEllipsis } from "../icon";
import { prefixCls } from "../constants";
import { between } from "../utils/js";
import { baseProps } from "../types";

import "../styles/common.less";
import "./style.less";

export interface PaginationProps extends baseProps {
  className?: string;
  itemClassName?: string;
  type?: "simple" | "complex";
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
  onChange?: ({ page, pageSize }: { page: number; pageSize: number }) => void;
  pageSizeList?: number[];
}

const Pagination = (props: PaginationProps): ReactElement => {
  const {
    className,
    itemClassName,
    currentPage,
    type,
    pageSize,
    totalItems,
    showPageJumper,
    showPageSizeChanger,
    renderTotalItems,
    onChange,
    pageSizeList = [10, 20, 50],
    ...restProps
  } = props;

  const [currentPageState, setCurrentPageState] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(10);
  const [pageJump, setPageJump] = useState("");

  const uncontrolled = useMemo(() => {
    return currentPage === undefined;
  }, [currentPage]);

  const isSimple = useMemo(() => {
    return type === "simple";
  }, [type]);

  useEffect(() => {
    if (Number(currentPage) > 0) {
      setCurrentPageState(Number(currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    if (Number(pageSize) > 0) {
      setPageSizeState(Number(pageSize));
    }
  }, [pageSize]);

  const pages = useMemo(() => {
    return Math.ceil(Number(totalItems) / Number(pageSizeState));
  }, [totalItems, pageSizeState]);

  const itemClass = cls(`${prefixCls}-pagination-item`, itemClassName);

  const changePage = useCallback(
    (page: number) => {
      uncontrolled && setCurrentPageState(page);
      onChange?.({ page, pageSize: pageSizeState });
    },
    [onChange, pageSizeState, uncontrolled]
  );

  const goFirstPage = useCallback(() => {
    changePage(1);
  }, [changePage]);

  const goLastPage = useCallback(() => {
    changePage(pages);
  }, [changePage, pages]);

  const judgePage = useCallback(
    (page) => {
      page = between({ val: page, max: pages, min: 1 });
      uncontrolled && setCurrentPageState(page);
      onChange?.({ page, pageSize: pageSizeState });
    },
    [onChange, pages, uncontrolled, pageSizeState]
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

  const onChangePageJump = useCallback(({ value }) => {
    setPageJump(value);
  }, []);

  const onChangePageSize = useCallback(
    ({ value }) => {
      if (Number(value[0]) > 0) {
        const size = Number(value[0]);
        // 如果当前的每页条数大于之前的，更新当前在第几页，小于不需要
        const newCurrentPage =
          size > pageSizeState
            ? Math.ceil((pageSizeState * currentPageState) / size)
            : currentPageState;
        // 每页size条时，最大的页码
        const maxPage = Math.ceil(Number(totalItems) / Number(size));

        uncontrolled && setCurrentPageState(Math.min(newCurrentPage, maxPage));
        onChange?.({ page: newCurrentPage, pageSize: size });
        setPageSizeState(size);
      }
    },
    [pageSizeState, onChange, uncontrolled, totalItems, currentPageState]
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
    let middleItems: Array<string | number> = [];
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
      middleItems = [
        numCurrentPage - 2,
        numCurrentPage - 1,
        numCurrentPage,
        numCurrentPage + 1,
        numCurrentPage + 2,
      ].filter((v) => {
        return v > 1 && v < pages;
      });
      if (Number(middleItems[0]) > 2) {
        middleItems.unshift("ellipsis");
      }
      if (Number(middleItems[middleItems.length - 1]) + 1 < pages) {
        middleItems.push("ellipsis");
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
      {(value: baseProps) => {
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
            {/* 上一页 */}
            {prevPage && (
              <span className={itemClass} onClick={goPrevPage}>
                {locale.prevPage}
              </span>
            )}
            {isSimple ? (
              totalItems > 0 && (
                <span className={`${prefixCls}-pagination-item-simple`}>
                  {currentPageState} / {pages}
                </span>
              )
            ) : (
              <>
                {/* 第一页 */}
                {frontItem && (
                  <span
                    className={cls(itemClass, {
                      [`${prefixCls}-pagination-item-active`]:
                        currentPageState === 1,
                    })}
                    onClick={goFirstPage}
                  >
                    1
                  </span>
                )}
                {middleItems.length > 0 &&
                  middleItems.map((v, k) =>
                    v === "ellipsis" ? (
                      <svg
                        key={k}
                        className={`${prefixCls}-pagination-ellipsis`}
                        viewBox="0 0 1024 1024"
                      >
                        <path d={IconEllipsis} />
                      </svg>
                    ) : (
                      <span
                        key={k}
                        className={cls(itemClass, {
                          [`${prefixCls}-pagination-item-active`]:
                            currentPageState === v,
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
                      [`${prefixCls}-pagination-item-active`]:
                        currentPageState === pages,
                    })}
                    onClick={goLastPage}
                  >
                    {pages}
                  </span>
                )}
              </>
            )}
            {/* 下一页 */}
            {nextPage && (
              <span className={itemClass} onClick={goNextPage}>
                {locale.nextPage}
              </span>
            )}
            {showPageJumper && (
              <>
                <span className={`${prefixCls}-pagination-jump-text`}>
                  {locale.goto}
                </span>
                <Input
                  className={`${prefixCls}-pagination-page-jump`}
                  type="int"
                  placeholder=""
                  onBlur={onBlurPageJump}
                  onChange={onChangePageJump}
                />
                <span className={`${prefixCls}-pagination-jump-text`}>
                  {locale.page}
                </span>
              </>
            )}
            {showPageSizeChanger && (
              <Select
                className={`${prefixCls}-pagination-size-change`}
                optionsClassName={`${prefixCls}-pagination-size-change-option`}
                placeholder=""
                showSearch={false}
                showClearIcon={false}
                value={[String(pageSizeState)]}
                options={pageSizeList?.map((v) => ({
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

const { string, oneOf, oneOfType, number, bool, func, arrayOf } = PropTypes;

Pagination.propTypes = {
  className: string,
  itemClassName: string,
  type: oneOf(["simple", "complex"]),
  currentPage: oneOfType([string, number]),
  pageSize: oneOfType([string, number]),
  totalItems: oneOfType([string, number]).isRequired,
  showPageJumper: bool,
  showPageSizeChanger: bool,
  renderTotalItems: func,
  onChange: func,
  pageSizeList: arrayOf(number),
};

Pagination.defaultProps = {
  pageSize: 10,
  totalItems: 0,
  type: "simple",
  showPageJumper: false,
  showPageSizeChanger: false,
};

export default Pagination;
