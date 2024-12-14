# warden-layout

[![NPM version](https://img.shields.io/npm/v/umi-plugin-warden-layout.svg?style=flat)](https://npmjs.com/package/umi-plugin-warden-layout)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-warden-layout.svg?style=flat)](https://npmjs.com/package/umi-plugin-warden-layout)

warden-layout是一款基于antd和umi开发的强大且灵活的布局组件，支持多种布局和属性交叉组合出美观又个性的UI中后台前端界面，同时支持一个项目中配置多种不同布局的方案，为开发者提供了一个高效、易用的布局工具。无论是对于新手开发者还是资深开发者来说，这款组件都能够成为他们构建前端项目的得力助手。本项目集许多年的项目案例积累打造，现在完全免费开源，欢迎下载使用和反馈，同时期待有供献精神的共同爱好者一起完善它，为开源世界增砖添瓦。

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
```bash
"dependencies": {
  "antd": "^5.21.0",
  "umi": "^4.3.36",
  ...
}
```
注意：需要禁用umi的mfsu
export default defineConfig({
  ...
  mfsu:false
});
```
2.然后安装warden-layout到项目中：
```bash
$ yarn add warden-layout
```
3.安装成功能后，就可使用了，替换或增加umi布局即可
```bash
export default ()=>{
    // layout config
    const config:Warden.IConfig = {
        "theme":"dark",
        "systemTheme":true,
        "layoutType":"HeadMenu",
        "primaryColor":"#417ffb",
        ...
    }
    return(
        <WardenLayout config={config} />
    )
}
```
4.更多配置信息，请参阅：
