## Pagination

### 基本使用

<code src="../demo/pagination/pagination1.tsx"></code>

### 受控形式

<code src="../demo/pagination/pagination2.tsx"></code>

### 显示分页信息

<code src="../demo/pagination/pagination3.tsx"></code>

### 跳页和修改每页条数

<code src="../demo/pagination/pagination4.tsx"></code>

### Pagination

| 参数                | 说明                                                     | 类型                                                                                            | 默认值       | 必填 |
| ------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ | ---- |
| className           | 分页容器的类名                                           | string                                                                                          | 无           | 否   |
| itemClassName       | 每个分页页码的类名，包含“上一页”和“下一页”               | string                                                                                          | 无           | 否   |
| currentPage         | 当前在第几页，受控模式下需要传                           | string \| number                                                                                | 无           | 否   |
| pageSize            | 每页条数                                                 | string \| number                                                                                | 10           | 否   |
| totalItems          | 总内容数量                                               | string \| number                                                                                | 0            | 是   |
| onChange            | 当前页改变时的回调，受控模式下通过它来获取切换到了第几页 | function(page: number, pageSize: number): void                                                  | 无           | 否   |
| renderTotalItems    | 总数和当前第几页的渲染方法                               | function({totalItems: number, currentPage: number, pageSize: number, pages: number}): ReactNode | 无           | 否   |
| showPageJumper      | 显示跳页部件                                             | boolean                                                                                         | false        | 否   |
| showPageSizeChanger | 显示切换每页条数的部件                                   | boolean                                                                                         | false        | 否   |
| onPageSizeChange    | 每页条数变化时的回调                                     | function(page: number, pageSize: number): void                                                  | 无           | 否   |
| pageSizeList        | 切换每页条数的选项数组                                   | number[]                                                                                        | [10, 20, 50] | 否   |

### css 变量

| 变量                             | 说明                          |
| -------------------------------- | ----------------------------- |
| --pagination-item-color          | 分页页码的文本颜色            |
| --pagination-item-border         | 分页页码的边框样式            |
| --pagination-item-bgColor        | 分页页码的背景色              |
| --pagination-item-hover-color    | 分页页码 hover 状态的文本颜色 |
| --pagination-item-hover-border   | 分页页码 hover 状态的边框样式 |
| --pagination-item-hover-bgColor  | 分页页码 hover 状态的背景色   |
| --pagination-item-active-color   | 分页页码激活状态的文本颜色    |
| --pagination-item-active-border  | 分页页码激活状态的边框样式    |
| --pagination-item-active-bgColor | 分页页码激活状态的背景色      |
| --pagination-font-size           | 分页文本文本大小              |
| --pagination-line-height         | 分页文本行高                  |
| --pagination-item-padding        | 分页页码 paddingg             |
| --pagination-item-border-radius  | 分页页码圆角大小              |
| --pagination-item-margin-right   | 分页页码 margin-right         |
| --pagination-page-jump-width     | 跳页输入框宽度                |
| --pagination-size-change-width   | 每页条数选择框宽度            |

### langText 属性

| 属性     | 说明                                                 |
| -------- | ---------------------------------------------------- |
| prevPage | “上一页”的文本                                       |
| nextPage | “下一页”的文本                                       |
| goto     | 跳页的文本                                           |
| page     | 跳页输入框后跟的页码单位，中文为“页”，英文为空字符串 |
| sizeUint | 每页条数选择框的单位，中文为“条/页”，英文为"/ page"  |
