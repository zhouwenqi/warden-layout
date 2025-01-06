# 配置
布局配置基于Warden.IConfig类型，默认使用context.defaultConfig。
## 配置项说明

### layoutType

- 类型：`LayoutType = 'HeadMenu' | 'LeftMenu'`
- 默认值：`'HeadMenu'`
  
布局类型：HeadMenu顶部为主横向铺满，LeftMenu左右分开布局。

### theme

- 类型：`Theme = 'light' | 'dark'`
- 默认值：`'light'`
  
明亮模式：整个布局的。

### systemTheme

- 类型：`boolean`
- 默认值：`false`
  
是否采用系统主题模式。

### primaryColor

- 类型：`string`
- 默认值：`#417ffb`
  
主题颜色。

### menuSkin

- 类型：`string`
- 默认值：`undefined`
  
主题皮肤（自定义皮肤请参考：[https://github.com/zhouwenqi/warden-layout/edit/main/docs/skins.md](https://github.com/zhouwenqi/warden-layout/edit/main/docs/skins.md))。

### leftTransparent

- 类型：`boolean`
- 默认值：`false`
  
侧边栏菜单背景透明。

### headTransparent

- 类型：`boolean`
- 默认值：`false`
  
顶部菜单背景透明。

### containerTransparent

- 类型：`boolean`
- 默认值：`false`
  
自带conainter容器背景透明。

### backgroundBlur

- 类型：`boolean`
- 默认值：`false`
  
菜单背景模糊（毛玻璃效果，菜单背景透明才生效）。

### compact

- 类型：`boolean`
- 默认值：`false`
  
是否采用紧凑布局。

### menuByPrimary

- 类型：`boolean`
- 默认值：`false`
  
主菜单是否采用主题色背景效果。

### leftMenuInline

- 类型：`boolean`
- 默认值：`false`
  
左侧垂直菜单是否采用内联模式。

### menuSplit

- 类型：`boolean`
- 默认值：`true`
  
分隔菜单：将菜单分隔成顶部（一级）和左侧组合显示，无论布局类型(layoutType)是什么

### leftEmptyHidden

- 类型：`boolean`
- 默认值：`false`
  
菜单分隔后如果左侧菜单为空，将隐藏整个左侧栏。

### hideBorder

- 类型：`boolean`
- 默认值：`false`
  
隐藏左侧和顶部的边线，子路由可以用钩子获取这个参数同步协调页面内容展示。

### subItemMenuTransparent

- 类型：`boolean`
- 默认值：`false`
  
sub子菜单背景透明。

### rootItemMenuGroup

- 类型：`boolean`
- 默认值：`false`
  
将一级菜单分组。

### hideBreadcrumb

- 类型：`boolean`
- 默认值：`false`
  
全局隐藏面包屑。

### hideTitleBar

- 类型：`boolean`
- 默认值：`true`
  
全局隐藏标题栏。

### hideFooter

- 类型：`boolean`
- 默认值：`false`
  
全局隐藏脚注栏。

### brandLogo

- 类型：`string`
- 默认值：`'warden_logo'`
  
品牌Logo地址

### brandTitle

- 类型：`string`
- 默认值：`'warden layout'`
  
品牌title或名称

### localeEnabled

- 类型：`boolean`
- 默认值：`false`
  
是否启用菜单国际化。

### logoNavigateRoute

- 类型：`string`
- 默认值：`/{currentRoute}`
  
logo导航路由，默认是当然布局路由

### page403

- 类型：`string`
- 默认值：`undefined`
  
路由鉴权失败跳转地址

> 更多信息请参考demo：[https://github.com/zhouwenqi/warden-layout-demo](https://github.com/zhouwenqi/warden-layout-demo)
