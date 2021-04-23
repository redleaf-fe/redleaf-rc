## DateTime

### 基本使用

预置了 5 种类型，time、date、month、year、date-time

<code src="../demo/date-time/date-time1.tsx"></code>

### 受控

使用 DateTime 的受控形式，需要传入 value 值，比较推荐的格式有以下几种

```
// 单独传日期
<DateTime type="date-time" value="2021-01-01"  />

// 时间和日期搭配
<DateTime type="date-time" value="2021-01-01 12:00:00"  />

// 单独传时间
<DateTime type="date-time" value="12:00:00"  />

// 使用Date对象
<DateTime type="date-time" value={new Date()}  />

// 使用dayjs构造
const dayjs = DateTime.dayjs;
<DateTime type="date-time" value={dayjs()}  />
```

虽然 dayjs 支持 undefined 作为参数，但是不能给 value 传 undefined，传 undefined 会被认为非受控形式

<code src="../demo/date-time/date-time2.tsx"></code>

### 自定义显示格式、只读、禁用、多语言

自定义显示格式支持的字符和组合可以查阅 dayjs 的文档

<code src="../demo/date-time/date-time3.tsx"></code>

### Props

| 参数           | 说明                                    | 类型                                                      | 默认值                              | 必填 |
| -------------- | --------------------------------------- | --------------------------------------------------------- | ----------------------------------- | ---- |
| className      | 日期选择器的容器类名                    | string                                                    | 无                                  | 否   |
| panelClassName | 日期选择器的面板容器类名                | string                                                    | 无                                  | 否   |
| itemClassName  | 日期选择器的选中结果类名                | string                                                    | 无                                  | 否   |
| placeholder    | 占位文本                                | string                                                    | 见[placeholderMap](#placeholdermap) | 否   |
| value          | 选中的值（受控）                        | string \| Date \| Dayjs \| object , 示例见[受控](#受控)   | 无                                  | 否   |
| defaultValue   | 默认选中的值（非受控）                  | 类型同 value，但是逻辑有区别，具体见[特别说明](#特别说明) | ""                                  | 否   |
| onChange       | 选中值变化时的回调                      | function({ value: string, meta: Dayjs }): void            | 无                                  | 否   |
| type           | 日期选择器的类型                        | "time" \| "date" \| "month"\| "year" \| "date-time"       | "date-time"                         | 否   |
| format         | 日期选择器的展示格式，可参考 dayjs 文档 | string                                                    | 见[formatMap](#formatmap)           | 否   |
| disabled       | 禁用状态                                | boolean                                                   | false                               | 否   |
| readOnly       | 只读状态                                | boolean                                                   | false                               | 否   |
| showClearIcon  | 是否显示清除按钮                        | boolean                                                   | true                                | 否   |

### placeholderMap

| 类型      | 值               |
| --------- | ---------------- |
| date      | 请选择日期       |
| month     | 请选择月份       |
| year      | 请选择年份       |
| time      | 请选择时间       |
| date-time | 请选择日期和时间 |

### formatMap

| 类型      | 值                  |
| --------- | ------------------- |
| date      | YYYY-MM-DD          |
| month     | YYYY-MM             |
| year      | YYYY                |
| time      | HH:mm:ss            |
| date-time | YYYY-MM-DD HH:mm:ss |

### css 变量

| 变量                                | 说明                          |
| ----------------------------------- | ----------------------------- |
| --datetime-color                    | 文本颜色                      |
| --datetime-font-size                | 文本大小                      |
| --datetime-line-height              | 文本行高                      |
| --datetime-border                   | 容器边框样式                  |
| --datetime-border-radius            | 容器圆角大小                  |
| --datetime-bgColor                  | 容器背景色                    |
| --datetime-padding                  | 容器 padding 值               |
| --datetime-width                    | 容器宽度                      |
| --datetime-icon-size                | 图标大小                      |
| --datetime-placeholder-color        | 占位文本颜色                  |
| --disabled-datetime-color           | 禁用状态文本颜色              |
| --datetime-panel-bgColor            | panel 的背景色                |
| --datetime-panel-line-height        | panel 内文本行高              |
| --datetime-panel-box-shadow         | panel 阴影样式                |
| --datetime-panel-cell-hover-bgColor | 单个时间值 hover 状态的背景色 |
| --datetime-panel-cell-hover-color   | 单个时间值 hover 状态的背景色 |
| --date-panel-col-width              | date-panel 列宽               |
| --time-panel-col-width              | time-panel 列宽               |
| --time-panel-col-height             | time-panel 列高               |

### langText 属性

| 属性      | 说明                 |
| --------- | -------------------- |
| hour      | 时间选择，“时”       |
| minute    | 时间选择，“分”       |
| second    | 时间选择，“秒”       |
| now       | 时间选择，“当前时间” |
| today     | 日期选择，“今天”     |
| thisMonth | 日期选择，“本月”     |
| thisYear  | 日期选择，“今年”     |
| Su        | 周日                 |
| Mo        | 周一                 |
| Tu        | 周二                 |
| We        | 周三                 |
| Th        | 周四                 |
| Fr        | 周五                 |
| Sa        | 周六                 |
| Jan       | 一月                 |
| Feb       | 二月                 |
| Mar       | 三月                 |
| Apr       | 四月                 |
| May       | 五月                 |
| Jun       | 六月                 |
| Jul       | 七月                 |
| Aug       | 八月                 |
| Sep       | 九月                 |
| Oct       | 十月                 |
| Nov       | 十一月               |
| Dec       | 十二月               |

### 特别说明

DateTime 使用了 dayjs 用于日期时间计算，并将 dayjs 导出，可以直接使用，已扩展 objectSupport 插件，其他插件可以自行扩展

value 和 defaultValue 的判断逻辑有区别，value 传假值（null，空字符串等）时，DateTime 会将其转换为当前时间，而 defaultValue 传假值时，DateTime 会认为该值无效，展示 placeholder
