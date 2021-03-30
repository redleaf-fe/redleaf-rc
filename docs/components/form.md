## Form

### 基本使用

<code src="../demo/form/form1.tsx"></code>

### 只读、禁用、设置初始值

<!-- <code src="../demo/form/form2.tsx"></code> -->

### 设置表单值

Form.Item 会侵入组件，在组件上增加 value、onChange、disabled、readOnly 等属性，redleaf-rc 的表单类组件，如 Input、Select 等组件的 onChange 回调都做了适配，如果是自己写的组件，接收到的 onChange 属性的形式为`function onChange({value: any}):void`

Input、Select 等表单类组件不应该使用受控形式，如果需要对组件的值进行监听，可以使用 onValuesChange，如果需要对输入进行修改，可以使用 setValues

<!-- <code src="../demo/form/form3.tsx"></code> -->

### 自定义表单组件

自定义表单组件的核心就是调用 props.onChange 函数，它由 Form.Item 注入，组件只需要进行调用，形式为`function onChange({value: any}):void`

<code src="../demo/form/form4.tsx"></code>

### 校验值

校验会在输入值变化时触发（可以通过设置 validateOnChange 禁用），调用 getValues 时也会触发一次

校验的 rule 可以是函数或者是 xxx 中的若干个，如果 rule 是函数，需要返回布尔值，真值表示校验通过，假值表示不通过，rule 的实现需要是同步返回，请求接口来验证输入的正确性等异步情况可以在获取到所有 values 以后进行

<!-- <code src="../demo/form/form5.tsx"></code> -->

### 复杂情形

1. 每个 Form.Item 内部可以包含多个组件，但是最好只包含一个带 onChange 属性的组件，否则 form 获取到的 value 值会相互覆盖

2. Form.Item 不支持嵌套，不要使用嵌套形式

<!-- <code src="../demo/form/form12.tsx"></code> -->

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |


### css 变量

| 变量 | 说明 |
| ---- | ---- |


### 特别说明

redleaf-rc 目前包含的表单类组件有 check、date-time、input、select、
