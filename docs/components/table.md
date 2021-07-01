## Table

### 基本使用

<code src="../demo/table/table1.tsx"></code>

### 分页

为了灵活，没有将分页组件直接集成在 Table 内

<code src="../demo/table/table2.tsx"></code>

### loading 和无数据状态

<code src="../demo/table/table4.tsx"></code>

### 行列滚动

行滚动需要设置 rowScrollHeight，作为列表除了表头以外的区域的高度

列滚动需要设置 colScrollWidth，作为整个表格完全展示时的宽度

<code src="../demo/table/table3.tsx"></code>

### Props

| 参数            | 说明                                     | 类型                              | 默认值     | 必填 |
| --------------- | ---------------------------------------- | --------------------------------- | ---------- | ---- |
| className       | 表格的类名                               | string                            | 无         | 否   |
| thClassName     | 表格头部单元格类名                       | string                            | 无         | 否   |
| tbodyClassName  | 表格内容容器类名                         | string                            | 无         | 否   |
| trClassName     | 表格内容中一行内容的容器类名（包括表头） | string                            | 无         | 否   |
| tdClassName     | 表格内容单元格类名                       | string                            | 无         | 否   |
| columns         | 列数据结构                               | [ITableColumns](#itablecolumns)[] | []         | 是   |
| datasets        | 表格数据                                 | object[]                          | []         | 是   |
| brodered        | 带边框                                   | "row" \| "full" \| "none"         | "row"      | 否   |
| colScrollWidth  | 列滚动宽度                               | string \| number                  | 0          | 否   |
| rowScrollHeight | 行滚动高度                               | string \| number                  | 0          | 否   |
| loading         | loading 状态，一般用于请求数据时展示     | boolean                           | false      | 否   |
| nodataText      | 表格数据为空时展示的文本                 | string                            | "暂无数据" | 否   |

### ITableColumns

| 参数      | 说明                                                                           | 类型                                              | 默认值  | 必填 |
| --------- | ------------------------------------------------------------------------------ | ------------------------------------------------- | ------- | ---- |
| width     | 每列宽度                                                                       | number \| string                                  | 无      | 否   |
| title     | 列名，显示在表格头部                                                           | string \| ReactNode                               | 无      | 是   |
| columnKey | 列信息的 key，用于内容渲染、排序和筛选，可以使用 lodash.get 的格式，比如 a.b.c | string                                            | 无      | 是   |
| render    | 单元格渲染方法                                                                 | function({ meta: any, index: number }): ReactNode | 无      | 否   |
| textAlign | 对齐方式                                                                       | "start" \| "end" \| "center"                      | "start" | 否   |
| grow      | 列的宽度增加，数字的值遵循 flex 布局的 flex-grow 属性                          | number                                            | 0       | 否   |

### css 变量

| 变量                  | 说明                    |
| --------------------- | ----------------------- |
| --table-color         | 表格文本颜色            |
| --table-thead-bgColor | 表头背景色              |
| --table-tbody-bgColor | 表格主体背景色          |
| --table-border        | 表格边框样式            |
| --table-cell-padding  | 单元格 padding          |
| --table-font-size     | 表格文本大小            |
| --table-line-height   | 表格文本行高            |
| --table-overflow-wrap | 表格 overflow-wrap 样式 |

### 特别说明

colScrollWidth、rowScrollHeight 和 columns 的 width 可以设置单独的数字和字符串值，也可以设置带 px 和带%的值，和 Bubble、Trigger 相似

没有对表格单元格的换行进行处理，如果有很长的连续字符可能将表格的宽度撑变形，如果需要展示完整的内容，可以使用 overflow-wrap 或 word-break，也可以在设置单元格宽度后结合 overflow、text-overflow、white-space 来展示省略号
