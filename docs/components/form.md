## Form

### 基本使用

<code src="../demo/form/form1.tsx"></code>

### 只读、禁用

<!-- <code src="../demo/form/form2.tsx"></code> -->

### 受控

<!-- <code src="../demo/form/form3.tsx"></code> -->

### 复杂情形

1. 每个 Form.Item 内部可以包含多个组件，但是最好只包含一个带 onChange 属性的组件，否则 form 获取到的 value 值会相互覆盖

2. Form.Item 会侵入组件，在组件上增加 onChange、disabled、readOnly、defaultValue 等属性，如果是 redleaf-rc 的表单类组件，如 Input、Select 等组件的 onChange 回调都做了适配，如果是自己写的组件，接收到的 onChange 属性会被修改为`function onChange({value: any}):void`的格式，原本传入的 onChange 回调的参数会改为`({name: string, value: any})`

3. Form.Item 不支持嵌套，不要使用嵌套形式

<!-- <code src="../demo/form/form12.tsx"></code> -->

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |


### css 变量

| 变量 | 说明 |
| ---- | ---- |


### 特别说明

redleaf-rc 目前包含的表单类组件有 check、date-time、input、select、
