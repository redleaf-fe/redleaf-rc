export default {
  cjs: 'rollup',
  // extractCSS: true,
  runtimeHelpers: true,
  entry: [
    'src/bubble/index.tsx',
    'src/button/index.tsx',
    'src/check/index.tsx',
    'src/config-provider/index.tsx',
    'src/date-time/index.tsx',
    'src/dialog/index.tsx',
    'src/form/index.tsx',
    'src/input/index.tsx',
    'src/loading/index.tsx',
    'src/menu/index.tsx',
    'src/message/index.tsx',
    'src/pagination/index.tsx',
    'src/resize-observer/index.tsx',
    'src/select/index.tsx',
    'src/table/index.tsx',
    'src/tree/index.tsx',
    'src/trigger/index.tsx',
    // 非组件
    'src/constants/index.ts',
    'src/icon/index.ts',
    'src/utils/dom.ts',
    'src/utils/hooks.ts',
    'src/utils/js.ts',
    'src/utils/style.ts',
  ],
  overridesByEntry: {
    'src/bubble/index.tsx': {
      file: 'bubble'
    },
    'src/button/index.tsx': {
      file: 'button'
    },
    'src/check/index.tsx': {
      file: 'check'
    },
    'src/config-provider/index.tsx': {
      file: 'config-provider'
    },
    'src/date-time/index.tsx': {
      file: 'date-time'
    },
    'src/dialog/index.tsx': {
      file: 'dialog'
    },
    'src/form/index.tsx': {
      file: 'form'
    },
    'src/input/index.tsx': {
      file: 'input'
    },
    'src/loading/index.tsx': {
      file: 'loading'
    },
    'src/menu/index.tsx': {
      file: 'menu'
    },
    'src/message/index.tsx': {
      file: 'message'
    },
    'src/pagination/index.tsx': {
      file: 'pagination'
    },
    'src/resize-observer/index.tsx': {
      file: 'resize-observer'
    },
    'src/select/index.tsx': {
      file: 'select'
    },
    'src/table/index.tsx': {
      file: 'table'
    },
    'src/tree/index.tsx': {
      file: 'tree'
    },
    'src/trigger/index.tsx': {
      file: 'trigger'
    },
    // 非组件
    'src/constants/index.ts': {
      file: 'constants'
    },
    'src/icon/index.ts': {
      file: 'icon'
    },
    'src/utils/dom.ts': {
      file: 'dom'
    },
    'src/utils/hooks.ts': {
      file: 'hooks'
    },
    'src/utils/js.ts': {
      file: 'js'
    },
    'src/utils/style.ts': {
      file: 'style'
    }
  }
};
