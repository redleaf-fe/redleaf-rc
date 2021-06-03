const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const entry = [
  'bubble',
  'button',
  'check',
  'config-provider',
  'date-time',
  'dialog',
  'form',
  'input',
  'loading',
  'menu',
  'message',
  'pagination',
  'resize-observer',
  'select',
  'table',
  'tree',
  'trigger'
];

const extra = ['constants', 'icon'];

const utils = ['dom', 'hooks', 'js', 'style'];

execSync('rm -rf ./dist/deprecated');
execSync('rm -rf ./dist/docs');

entry.forEach(v => {
  const js = path.resolve(__dirname, `./dist/${v}.js`);
  const css = path.resolve(__dirname, `./dist/${v}.css`);
  if (fs.existsSync(js)) {
    fs.renameSync(js, path.resolve(__dirname, `./dist/src/${v}/${v}.js`));
  }
  if (fs.existsSync(css)) {
    fs.renameSync(css, path.resolve(__dirname, `./dist/src/${v}/${v}.css`));
  }
});

extra.forEach(v => {
  const js = path.resolve(__dirname, `./dist/${v}.js`);
  if (fs.existsSync(js)) {
    fs.renameSync(js, path.resolve(__dirname, `./dist/src/${v}/${v}.js`));
  }
});

utils.forEach(v => {
  const js = path.resolve(__dirname, `./dist/${v}.js`);
  if (fs.existsSync(js)) {
    fs.renameSync(js, path.resolve(__dirname, `./dist/src/utils/${v}.js`));
  }
});

[...entry, ...extra].forEach(v => {
  const js = path.resolve(__dirname, `./dist/src/${v}/${v}.js`);
  const css = path.resolve(__dirname, `./dist/src/${v}/${v}.css`);
  if (fs.existsSync(js)) {
    fs.renameSync(js, path.resolve(__dirname, `./dist/src/${v}/index.js`));
  }
  if (fs.existsSync(css)) {
    fs.renameSync(css, path.resolve(__dirname, `./dist/src/${v}/style.css`));
  }

  execSync(`mv ./dist/src/${v} ./dist/${v}`);
});

execSync(`mv ./dist/src/utils ./dist/utils`);
execSync(`mv ./dist/src/index.d.ts ./dist/index.d.ts`);
execSync(`mv ./dist/src/types.d.ts ./dist/types.d.ts`);

execSync(`rm -rf ./dist/src`);
