import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'redleaf-rc',
  // favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  // logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config,
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/components': [
      {
        title: '说明',
        path: '说明',
      },
      {
        title: '定制',
        path: '定制',
      },
      {
        title: 'bubble',
        path: 'bubble',
      },
      {
        title: 'button',
        path: 'button',
      },
      {
        title: 'config-provider',
        path: 'config-provider',
      },
      {
        title: 'input',
        path: 'input',
      },
      {
        title: 'loading',
        path: 'loading',
      },
      {
        title: 'message',
        path: 'message',
      },
      {
        title: 'pagination',
        path: 'pagination',
      },
      {
        title: 'resize-observer',
        path: 'resize-observer',
      },
      {
        title: 'select',
        path: 'select',
      },
      {
        title: 'table',
        path: 'table',
      },
      {
        title: 'trigger',
        path: 'trigger',
      },
    ],
  },
});
