## Menu

### 基本使用

<code src="../demo/menu/menu1.tsx"></code>

### Props

| 参数         | 说明                                         | 类型                                       | 默认值 | 必填 |
| ------------ | -------------------------------------------- | ------------------------------------------ | ------ | ---- |
| className    | menu 的类名                                  | string                                     | 无     | 否   |
| datasets     | menu 的渲染数据                              | [IMenuItemOption](#imenuitemoption)[]      | []     | 是   |
| onChange     | 激活菜单项时的回调，带子项的菜单项不会触发   | function ({ meta: IMenuItemOption }): void | 无     | 否   |
| onOpen       | 展开菜单项时的回调，不带子项的菜单项不会触发 | function ({ meta: IMenuItemOption }): void | 无     | 否   |
| onClose      | 关闭菜单项时的回调，不带子项的菜单项不会触发 | function ({ meta: IMenuItemOption }): void | 无     | 否   |
| defaultValue | 默认展开的菜单项的 value 值                  | string                                     | 无     | 否   |

### IMenuItemOption

| 参数     | 说明                                                                      | 类型                                  | 默认值 | 必填 |
| -------- | ------------------------------------------------------------------------- | ------------------------------------- | ------ | ---- |
| value    | 菜单项的值，用于唯一标识菜单项                                            | string                                | 无     | 是   |
| render   | 菜单项的渲染函数，text 属性和 render 属性同时存在时，优先使用 render 属性 | function ({ meta: any }): ReactNode   | 无     | 否   |
| text     | 菜单项的文本                                                              | string                                | 无     | 否   |
| disabled | 菜单项是否禁用                                                            | boolean                               | 无     | 否   |
| children | 子项                                                                      | [IMenuItemOption](#imenuitemoption)[] | 无     | 否   |

### css 变量

| 变量                    | 说明                               |
| ----------------------- | ---------------------------------- |
| --menu-width            | menu 的宽度                        |
| --menu-indent           | 每一级子项缩进的距离               |
| --menu-color            | menu 文本颜色                      |
| --menu-bgColor          | menu 背景色                        |
| --menu-font-size        | menu 的文本大小                    |
| --menu-line-height      | menu 的行高                        |
| --menu-padding          | menu 的 padding                    |
| --menu-hover-color      | hover 状态的文本颜色               |
| --menu-hover-bgColor    | hover 状态的背景色                 |
| --disabled-menu-bgColor | 禁用状态的背景色                   |
| --disabled-menu-color   | 禁用状态的文本颜色                 |
| --menu-item-width       | 菜单项的最大宽度，超过用省略号显示 |

### 特别说明

onChange、onOpen、onClose 的 meta 参数会带\_\_id\_\_、\_\_depth\_\_、\_\_parentId\_\_三个属性，分别代表菜单项的唯一 id，菜单项的深度（最外层是 0，第二层是 1），菜单项的父级 id 数组（包括父级的父级）
