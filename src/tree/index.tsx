import React, {
  useCallback,
  ReactElement,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import cls from "classnames";
import PropTypes from "prop-types";

import { prefixCls } from "../constants";
import { baseProps } from "../types";
import { toPlainArray, deepFirstTraverse } from "../utils/js";
import { IconArrowSingle } from "../icon";
import Check from "../check";

import "../styles/common.less";
import "./style.less";

/* TODO:

展开全部，收起全部
disabled，readonly
onOpen，onClose，onChange menu对应修改
showMark
type: single multi
parentCheckable

*/

export interface ITreeItemOption extends baseProps {
  text?: string;
  render?: () => ReactNode;
  value: string;
  disabled?: boolean;
}

export type TreeItemChangeType = "open" | "close" | "active";

export interface TreeProps extends baseProps {
  className?: string;
  options: ITreeItemOption[];
  onChange?: ({ meta }: { meta: ITreeItemOption }) => void;
  onOpen?: ({ meta }: { meta: ITreeItemOption }) => void;
  onClose?: ({ meta }: { meta: ITreeItemOption }) => void;
  value?: string;
  defaultValue?: string;
  checkable?: boolean;
  checkShape?: "round" | "rect";
}

const Tree = (props: TreeProps): ReactElement => {
  const {
    className,
    options = [],
    onChange,
    onOpen,
    onClose,
    value,
    defaultValue,
    checkable = false,
    checkShape = "rect",
    ...restProps
  } = props;

  const [activeItem, setActiveItem] = useState<baseProps>({});
  const [checkedItem, setCheckedItem] = useState<baseProps[]>([]);
  // openId代表点击过的项，showId代表展示的项，展示的项比点击的要多一级
  // openId包含一级（带子级）的项，showId不包含一级项
  const [openId, setOpenId] = useState<number[]>([]);
  const [showId, setShowId] = useState<number[]>([]);

  const treeData = useMemo(() => toPlainArray(options), [options]);

  useEffect(() => {
    function getChildrenArr(ids: number[] = []) {
      let ret: number[] = [];
      ids.forEach((v) => {
        const item = treeData.find((vv) => vv.__id__ === v) || {
          __parentId__: [],
        };
        ret = ret.concat((item.children || []).map((v: baseProps) => v.__id__));
      });
      return ret;
    }

    if (defaultValue) {
      const item = treeData.find((v) => v.value === defaultValue) || {
        __parentId__: [],
      };
      const arr = getChildrenArr(item.__parentId__);

      if (item.children) {
        setOpenId(item.__parentId__.concat(item.__id__));
        const arr2 = arr.concat(item.children.map((v: baseProps) => v.__id__));
        setShowId(arr2);
        onChange?.({ meta: item as ITreeItemOption });
        onOpen?.({ meta: item as ITreeItemOption });
      } else {
        setOpenId(item.__parentId__);
        setShowId(arr);
        setActiveItem(item);
        onChange?.({ meta: item as ITreeItemOption });
      }
    }
    // WARN: 初始化，不需要添加依赖
  }, []);

  const renderItem = useCallback(() => {
    return treeData.map((val) => (
      <span
        key={val.__id__}
        className={cls(
          `${prefixCls}-tree-item`,
          `${prefixCls}-tree-item-indent-${val.__depth__}`,
          {
            [`${prefixCls}-tree-item-disabled`]: val.disabled,
            [`${prefixCls}-tree-item-hidden`]:
              val.__depth__ !== 0 && !showId.includes(val.__id__),
          }
        )}
      >
        {val.children ? (
          <svg
            className={cls(`${prefixCls}-tree-arrow-icon`, {
              [`${prefixCls}-tree-arrow-icon-down`]: openId.includes(
                val.__id__
              ),
            })}
            viewBox="0 0 1024 1024"
            onClick={() => {
              if (val.disabled) {
                return;
              }
              if (val.children) {
                // 点击已展开的项，openId中要去除，showId中要保留
                if (openId.includes(val.__id__)) {
                  // 当前点击项的所有后代项
                  const childrenId: number[] = [];
                  deepFirstTraverse(val.children, (v) => {
                    childrenId.push(v.__id__);
                  });
                  const arr = openId.filter((v) => !childrenId.includes(v));
                  setOpenId(arr.filter((v) => v !== val.__id__));
                  const arr2 = showId.filter((v) => !childrenId.includes(v));
                  setShowId(arr2);
                  onChange?.({ meta: val as ITreeItemOption });
                  onClose?.({ meta: val as ITreeItemOption });
                } else {
                  const arr = openId.concat(val.__id__);
                  setOpenId(arr);
                  const arr2 = showId.concat(
                    val.children.map((v: baseProps) => v.__id__)
                  );
                  setShowId(arr2);
                  onChange?.({ meta: val as ITreeItemOption });
                  onOpen?.({ meta: val as ITreeItemOption });
                }
              } else {
                setActiveItem(val);
                onChange?.({ meta: val as ITreeItemOption });
              }
            }}
          >
            <path d={IconArrowSingle} />
          </svg>
        ) : (
          <span className={`${prefixCls}-tree-arrow-placeholder`} />
        )}
        {checkable && (
          <Check
            options={[{ value: "1", text: "" }]}
            disabled
            shape={checkShape}
          />
        )}
        <span className={`${prefixCls}-tree-item-text`}>
          {typeof val.render === "function" ? val.render({}) : val.text}
        </span>
      </span>
    ));
  }, [
    openId,
    showId,
    treeData,
    onChange,
    onOpen,
    onClose,
    checkable,
    checkShape,
  ]);

  return (
    <span className={cls(`${prefixCls}-tree`, className)} {...restProps}>
      {renderItem()}
    </span>
  );
};

const { shape, string, bool, arrayOf, func } = PropTypes;

const optionShape = shape({
  disabled: bool,
  text: string,
  value: string.isRequired,
  render: func,
});

Tree.propTypes = {
  className: string,
  options: arrayOf(optionShape).isRequired,
  onOpen: func,
  onClose: func,
  onChange: func,
  defaultValue: string,
};

Tree.defaultProps = {
  options: [],
  checkable: false,
  checkShape: "rect",
};

export default Tree;
