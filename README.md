# warden-layout

[![NPM version](https://img.shields.io/npm/v/warden-layout.svg?style=flat)](https://npmjs.com/package/warden-layout)
[![NPM downloads](http://img.shields.io/npm/dm/warden-layout.svg?style=flat)](https://npmjs.com/package/warden-layout)

warden-layout是一款基于antd和umi开发的强大且灵活的布局组件，支持多种布局和属性交叉组合出美观又个性的UI中后台前端界面，同时支持一个项目中配置多种不同布局的方案，为开发者提供了一个高效、易用的布局工具。无论是对于新手开发者还是资深开发者来说，这款组件都能够成为他们构建前端项目的得力助手。本项目集许多年的项目案例积累打造，现在完全免费开源，欢迎下载使用和反馈，同时期待有供献精神的共同爱好者一起完善它，为开源世界增砖添瓦。

> demo演示地址：[https://demo.warden.vip](https://demo.warden.vip)
> demo仓库：[https://github.com/zhouwenqi/warden-layout-demo](https://github.com/zhouwenqi/warden-layout-demo)

## 安装
yarn
```bash
$ yarn install
```

## 打包
yarn
```bash
$ yarn build
```
## 发布

yarn
```bash
$ npm publish
```

## LICENSE

MIT

# 直接使用
1. 项目已发布到npm，可以直接下载最新版使用，项目包需要依赖 umi 和 antd，请先安装它们：
```ts
"dependencies": {
  "antd": "^5.21.0",
  "umi": "^4.3.36",
  ...
}
```
2. 启用相关插件(initinal-state/access/model等)：
```ts
export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/access',
    '@umijs/plugins/dist/locale'
  ],
  initialState: {},
  model: {},
  access:{},
});
```
🎈注意：需要禁用umi的mfsu
```ts
mfsu:false
```
3. 然后安装warden-layout到项目中：
```bash
$ yarn add warden-layout
```
4. 安装成功能后，就可使用了，替换或增加umi布局即可
```ts
import WardenLayout,{ Warden } from 'warden-layout'

export default ()=>{
    // layout config
    const config:Warden.IConfig = {
        "theme":"dark",
        "systemTheme":true,
        "layoutType":"headMenu",
        "primaryColor":"#417ffb",
        ...
    }
    return(
        <WardenLayout config={config} />
    )
}
```
5. 更多配置信息，请参阅：[https://github.com/zhouwenqi/warden-layout/docs/config.md](https://github.com/zhouwenqi/warden-layout/blob/main/docs/config.md)
