```import
import {Message, Button} from 'rhino-rc';
```
## Message

### 基本使用
```component
// <!-- Message1 -->
import {Message, Button} from 'rhino-rc';

// --
const Message1 = ()=>{
  return <div className="cursor-pointer" onClick={()=>{
    Message.show({content: 'message'})
  }}>
    <Button>click me</Button>
  </div>
};

// --
ReactDOM.render(
  <Message1 />,
  document.getElementById('root')
);
```

### 避免相同内容的message弹出多次
```component
// <!-- Message2 -->
import {Message, Button} from 'rhino-rc';

// --
const Message2 = ()=>{
  return <div className="cursor-pointer" onClick={()=>{
    Message.show({content: 'message with key', key: 'message with key'})
  }}>
    <Button>click me</Button>
  </div>
};

// --
ReactDOM.render(
  <Message2 />,
  document.getElementById('root')
);
```

### 设置显示时间
单位ms，不传使用默认时间，传小于等于0的数或NaN不会自动销毁
```component
// <!-- Message3 -->
import {Message, Button} from 'rhino-rc';

// --

const Message3 = ()=>{
  return <>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.config({duration: '5000'})
    Message.show({content: 'display 5s'})
  }}>
    <Button>将message默认显示时间设置为5秒</Button>
  </div>
  <div className="cursor-pointer" onClick={()=>{
    Message.show({content: 'display 15s', duration: 15000})
  }}>
    <Button>这个message的显示时间设置为15秒</Button>
  </div>
  </>
};

// --
ReactDOM.render(
  <Message3 />,
  document.getElementById('root')
);
```

### 手动销毁
show函数返回一个close函数，调用该函数可销毁Message

也可以使用notify，notify中使用了show函数，并增加了关闭按钮
```component
// <!-- Message4 -->
import {Message, Button} from 'rhino-rc';

// --

const Message4 = ()=>{
  let cnt = 0;
  return <>
    <div className="cursor-pointer mb8" onClick={()=>{
      const close = Message.show({
        content: <div className="cursor-pointer" onClick={()=>{
          close?.()
        }}>
            <div className="mb8 font16">hand close {cnt++}</div>
            <div>hand close hand close hand close hand close hand close hand close hand close </div>
          </div>, 
        onClose: ()=>{
          console.log('关闭回调')
        }
      })
    }}>
      <Button>手动销毁1</Button>
    </div>
    <div className="cursor-pointer mb8" onClick={()=>{
      Message.notify({
        content: <div>
            <div className="mb8 font16">hand close {cnt++}</div>
            <div>hand close hand close hand close hand close hand close hand close hand close </div>
          </div>, 
        onClose: ()=>{
          console.log('关闭回调')
        }
      })
    }}>
      <Button>手动销毁2</Button>
    </div>
  </>
};

// --
ReactDOM.render(
  <Message4 />,
  document.getElementById('root')
);
```

### 位置
```component
// <!-- Message5 -->
import {Message, Button} from 'rhino-rc';

// --

const Message5 = ()=>{
  return <>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">default</div>
          <div>message position</div>
        </div>, 
    })
  }}>
    <Button>默认</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">topLeft</div>
          <div>message position</div>
        </div>,
      position: 'topLeft'
    })
  }}>
    <Button>左上</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">topRight</div>
          <div>message position</div>
        </div>,
      position: 'topRight'
    })
  }}>
    <Button>右上</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">bottomLeft</div>
          <div>message position</div>
        </div>,
      position: 'bottomLeft'
    })
  }}>
    <Button>左下</Button>
  </div>
  <div className="cursor-pointer mb8" onClick={()=>{
    Message.show({
      content: <div>
          <div className="mb8 font16">bottomRight</div>
          <div>message position</div>
        </div>,
      position: 'bottomRight'
    })
  }}>
    <Button>右下</Button>
  </div>
  </>
};

// --
ReactDOM.render(
  <Message5 />,
  document.getElementById('root')
);
```

### Message函数
函数 | 说明 
-- | -- 
show | 显示Message，参数见下文，返回一个close函数，可用于销毁Message
notify | 使用了show，并添加了关闭按钮，传入duration参数无效，notify使用show函数时传入的duration为0
config | 用于设置Message展示的默认时间，参数duration

### show函数的参数
参数 | 说明 | 类型 | 默认值 | 必填
-- | -- | -- | -- | -- 
className | 内容部分的类名 | string | 无 | 否
content | 消息内容 | ReactNode | 无 | 是
duration | 消息展示的时间，单位ms，不传使用默认时间，传一个小于等于0的数或NaN不自动销毁 | string \| number | 2000 | 否
key | 用于保证同内容的Message只弹出一次 | string | 无 | 否
position | Message展示位置，不填默认在视口中上部展示 | "topLeft" \| "topRight" \| "bottomLeft" \| "bottomRight" | 无 | 否

### css变量
变量 | 说明 
-- | -- 
--message-color | 消息内容文本颜色
--message-bgColor | 消息内容背景颜色
--message-box-shadow | 消息边框阴影颜色
--message-close-color | 关闭按钮的图标的颜色


