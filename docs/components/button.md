---
nav:
  title: Components
  path: /components
---

## Button

### 普通形式

```tsx
import React from 'react';
import { Button, Message } from 'redleaf-rc';
import '../doc.less';

const Button1 = () => {
  return (
    <>
      <Button
        className="mr8"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        按钮
      </Button>
      <Button
        className="mr8"
        type="default"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        type="primary"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        type="success"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        绿色
      </Button>
      <Button
        className="mr8"
        type="danger"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        红色
      </Button>
      <Button
        className="mr8"
        type="danger"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        <div>这是一个div包裹的按钮</div>
      </Button>
    </>
  );
};

export default () => <Button1 />;
```

### 边框形式

```tsx
import React from 'react';
import { Button, Message } from 'redleaf-rc';
import '../doc.less';

const Button2 = () => {
  return (
    <>
      <Button
        className="mr8"
        bordered
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        按钮
      </Button>
      <Button
        className="mr8"
        bordered
        type="default"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        bordered
        type="primary"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        bordered
        type="success"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        绿色
      </Button>
      <Button
        className="mr8"
        bordered
        type="danger"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        红色
      </Button>
    </>
  );
};

export default () => <Button2 />;
```

### 禁用状态

```tsx
import React from 'react';
import { Button, Message } from 'redleaf-rc';
import '../doc.less';

const Button3 = () => {
  return (
    <>
      <Button
        className="mr8"
        disabled
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        按钮
      </Button>
      <Button
        className="mr8"
        disabled
        type="default"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        默认
      </Button>
      <Button
        className="mr8"
        disabled
        type="primary"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        蓝色
      </Button>
      <Button
        className="mr8"
        disabled
        type="success"
        onClick={() => Message.show({ content: '按下按钮' })}
      >
        绿色
      </Button>
      {/* 注意这最后一个 */}
      <Button
        className="mr8"
        disabled
        type="danger"
        onMouseDown={() => Message.show({ content: '按下按钮' })}
      >
        我是可以点击成功的，不信你试试
      </Button>
    </>
  );
};

export default () => <Button3 />;
```

### 按钮组

激活状态可以通过改变 type 或者设置 className 等方式

```tsx
import React, { useState } from 'react';
import { Button } from 'redleaf-rc';
import '../doc.less';

const Button4 = () => {
  const [active, setActive] = useState(1);
  const getActive = (val: number) => (active === val ? 'primary' : 'default');
  return (
    <Button.Group>
      <Button type={getActive(1)} onClick={() => setActive(1)}>
        11
      </Button>
      <Button type={getActive(2)} onClick={() => setActive(2)}>
        22
      </Button>
      <Button type={getActive(3)} onClick={() => setActive(3)}>
        33
      </Button>
    </Button.Group>
  );
};

export default () => <Button4 />;
```

### Button

| 参数      | 说明           | 类型                                            | 默认值    | 必填 |
| --------- | -------------- | ----------------------------------------------- | --------- | ---- |
| children  | 按钮显示的内容 | ReactNode                                       | 无        | 是   |
| className | 按钮的类名     | string                                          | 无        | 否   |
| disabled  | 禁用状态       | boolean                                         | false     | 否   |
| type      | 按钮颜色       | 'primary' \| 'danger' \| 'success' \| 'default' | 'primary' | 否   |
| bordered  | 边框形式       | boolean                                         | false     | 否   |

### Button.Group

| 参数      | 说明           | 类型      | 默认值 | 必填 |
| --------- | -------------- | --------- | ------ | ---- |
| children  | 按钮组内的内容 | ReactNode | 无     | 是   |
| className | 按钮组的类名   | string    | 无     | 否   |

### css 变量

| 变量                      | 说明                                           |
| ------------------------- | ---------------------------------------------- |
| --default-button-color    | 默认按钮文本颜色                               |
| --colors-button-color     | 非默认（primary、danger、success）按钮文本颜色 |
| --default-button-bgColor  | 默认按钮背景色                                 |
| --primary-button-bgColor  | primary 按钮背景色                             |
| --success-button-bgColor  | success 按钮背景色                             |
| --danger-button-bgColor   | danger 按钮背景色                              |
| --default-button-border   | 默认按钮边框样式                               |
| --disabled-button-bgColor | 禁用状态背景色                                 |
| --disabled-button-color   | 禁用状态文本颜色                               |
| --disabled-button-border  | 禁用状态边框样式                               |
| --button-font-size        | 按钮文本大小                                   |
| --button-line-height      | 按钮文本行高                                   |
| --button-border-radius    | 按钮圆角大小                                   |
| --button-padding          | 按钮 padding                                   |

### 特别说明

disabled 中只处理了 onClick 事件，如果使用 onMouseDown 等事件，仍会执行
