import { defineConfig } from 'dumi';
import pkg from './package.json';

export default defineConfig({
  title: 'redleaf-rc',
  // favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  // logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  devServer: {
    port: pkg.port,
  },
  base: '/rc/',
  favicon: 'https://gw.alicdn.com/imgextra/i3/O1CN01s3UDzQ1t5LdrmxVwF_!!6000000005850-2-tps-200-200.png',
  // more config: https://d.umijs.org/config,
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/components': [
      {
        title: '起步',
        path: '起步',
      },
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
        title: 'check',
        path: 'check',
      },
      {
        title: 'config-provider',
        path: 'config-provider',
      },
      {
        title: 'date-time',
        path: 'date-time',
      },
      {
        title: 'dialog',
        path: 'dialog',
      },
      {
        title: 'form',
        path: 'form',
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
        title: 'menu',
        path: 'menu',
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
