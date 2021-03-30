## Form

### 基本使用

<code src="../demo/form/form1.tsx"></code>

### 只读、禁用、设置初始值

<code src="../demo/form/form2.tsx"></code>

### 设置表单值

Form.Item 会侵入直接子组件（多套一层就不算直接子组件了），在组件上增加 value、onChange、disabled、readOnly 等属性，redleaf-rc 的表单类组件，如 Input、Select 等组件的 onChange 回调都做了适配，如果是自己写的组件，接收到的 onChange 属性的形式为`function onChange({value: any}):void`

Input、Select 等表单类组件不应该使用受控形式，如果需要对组件的值进行监听，可以使用 onValuesChange，如果需要对输入进行修改，可以使用 setValues

<code src="../demo/form/form3.tsx"></code>

### 自定义表单组件

自定义表单组件的核心就是调用 props.onChange 函数，它由 Form.Item 注入，组件只需要进行调用，形式为`function onChange({value: any}):void`

<code src="../demo/form/form4.tsx"></code>

### 校验值

校验会在输入值变化时触发（可以通过设置 validateOnChange 禁用），调用 getValues 时也会触发一次

requiredMark 只控制显示 label 前面的星号与否，相关校验需要自己添加

校验的 rule 可以是函数或者是 xxx 中的若干个，如果 rule 是函数，需要返回布尔值，真值表示校验通过，假值表示不通过，rule 的实现需要是同步返回，请求接口来验证输入的正确性等异步情况可以在获取到所有 values 以后进行

<code src="../demo/form/form5.tsx"></code>

### 复杂情形

1. 每个 Form.Item 内部可以包含多个组件，但是最好只包含一个表单类组件（包括自定义的表单组件），否则 form 获取到的 value 值会相互覆盖，如果是不同类型的组件，比如 Input 和 Select，因为 value 值的类型不同，在一个 Form.Item 中会出错

2. Form.Item 没有专门为嵌套形式做兼容，不要使用嵌套形式，Form.Item 作用于直接子组件，使用 div 等元素包裹会导致功能失效，使用高阶组件需要将 props 向下传递；

3. Form 是支持用元素或者组件进行包裹的

<code src="../demo/form/form6.tsx"></code>

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |


### css 变量

| 变量 | 说明 |
| ---- | ---- |


### 特别说明

redleaf-rc 目前包含的表单类组件有 check、date-time、input、select、
