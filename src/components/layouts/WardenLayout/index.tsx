import { useEffect, useState } from 'react';
import {ConfigProvider,App,theme} from 'antd';
import {useIntl,getLocale, useRouteData,useAppData} from 'umi';
import { createConfigContext, defaultConfig,WardenGlobalThis} from '@/context';
import { getAppRoutePathKey, getLayoutRootRoutes, getMenuData } from '@/utils/routeUtil';
import SettingDrawer from '@/components/setting/index';
import { getStorageConfig, setStorageConfig } from '@/utils/configUtil';
import { generate } from '@ant-design/colors';
import {LayoutProps,Warden} from '@/typings';
import MainLayout from './MainLayout';

/**
 * 布局入口
 * @param props 配置
 * @returns 
 */
export default function IndexPanel(props:LayoutProps.IndexProps) {
  const configKey= getAppRoutePathKey(useRouteData().route)  
  const {clientRoutes} = useAppData()
  const ConfigContext = createConfigContext()
  const intl = useIntl()

  // 获取布局配置
  let layoutConfig = getStorageConfig(configKey) || props.config 
  if(!layoutConfig){
    layoutConfig = WardenGlobalThis.configMap[configKey] || defaultConfig
    setStorageConfig(layoutConfig)
  }

  const [config,setConfig] = useState<Warden.IConfig>(layoutConfig)

  // 获取菜单数据
  if(!WardenGlobalThis.menuData[configKey] || WardenGlobalThis.menuData[configKey].length <= 0){
    const menuRoutes = getLayoutRootRoutes(clientRoutes,configKey!)
    WardenGlobalThis.menuData[configKey] = getMenuData(menuRoutes, config.localeEnabled? intl : undefined)
  } 
  

  // 全局气泡
  const [badge,setBadge] = useState(0)

  // 监听系统主题变化
  const scheme = window.matchMedia("(prefers-color-scheme: dark)")
  scheme.onchange=(event)=>{
    setConfig({...config, theme:event.matches ? 'dark' : 'light'})
  }
  useEffect(()=>{    
    
    scheme.addEventListener("change", prefersChangeThemeEvent)
    return ()=>{
      scheme.removeEventListener('change', prefersChangeThemeEvent)
    }
  },[config])

  const prefersChangeThemeEvent = (event:MediaQueryListEvent) => {
    if(config.systemTheme){
      setConfig({...config, theme:event.matches ? 'dark' : 'light'})
    }
  }  

  useEffect(()=>{
    const schemeTheme = scheme.matches ? 'dark' : 'light'
    if(config.systemTheme && schemeTheme != config.theme){
      setConfig({
        ...config, theme:schemeTheme
      })      
    }
  },[])

  // 布局头部高度
  const headerHeight = config.compact ? 48 : 56
  // 布局左侧宽度
  const leftWidth = config.compact ? 240 : 260
  
  // antd token 主题和算法
  let algorithm = config.theme == "dark" ? [theme.darkAlgorithm] : [theme.defaultAlgorithm] 
  if(config.compact){
    algorithm.push(theme.compactAlgorithm)
  }

  // 菜单样式
  var menuStyle:any = {
    "activeBarHeight": config.compact ? 2 : 4,
  }

  // 布局样式(只定义header)
  var layoutStyle:any = {
    "headerHeight": headerHeight,
    "headerBg":"transparent"
  }

  if(config.hideBorder){
    menuStyle = {...menuStyle, "colorSplit":"transparent"}
  }
  
  if(config.theme == "dark"){
    menuStyle = {...menuStyle,
        "itemSelectedBg": config.primaryColor,
        "itemSelectedColor": "white",
        "itemColor": "rgba(255,255,255,0.6)"
    }
  }

  if(config.menuByPrimary) {    
    const primaryColors = generate(config.primaryColor)
    layoutStyle = {...layoutStyle, headerColor:"white"}
    if(config.layoutType=="LeftMenu"){
      menuStyle = {
        ...menuStyle,
        darkItemBg:primaryColors[1],
        darkSubMenuItemBg:primaryColors[7],
        darkItemSelectedBg:primaryColors[6],
        darkPopupBg:primaryColors[5]
      } 
    }else{
      menuStyle = {
        ...menuStyle,
        darkItemBg:primaryColors[1],
        darkSubMenuItemBg:primaryColors[7],
        darkItemSelectedBg:primaryColors[6],
        darkPopupBg:primaryColors[5]
      } 
    }
  }

  if(config.subItemMenuTransparent){
    menuStyle = {
      ...menuStyle,
      darkSubMenuItemBg:"transparent",
      subMenuItemBg:"transparent"
    }
  }
 
  const themeConfig = {    
    algorithm:algorithm,
    "token":{
      colorPrimary:config.primaryColor      
    },
    "components": {
      "Layout":layoutStyle,
      "Menu": menuStyle
    }
  }

  // 布局配置修改
  const onConfigChange=(value:Warden.IConfig)=>{
    if(value.systemTheme && value.systemTheme != config.systemTheme){
      value.theme = scheme.matches ? 'dark' : 'light'
    }
    setConfig(value)
    setStorageConfig(value,configKey)
  }

  const getDynamicProps=():LayoutProps.DynamicProps => {
    return {
      headerHeight:headerHeight,
      leftWidth:leftWidth
    }
  }

  const settingDrawer = process.env.NODE_ENV == "development" || process.env.ENABLE_SETTING ? <SettingDrawer /> : <></>

  return (    
    <ConfigProvider theme={themeConfig} locale={getLocale()}>
      <App> 
      <ConfigContext.Provider value={{
          config,
          setConfig:onConfigChange,
          getDynamicProps,
          badgeCount:badge,
          setBadgeCount:setBadge,
          footer:props.footer,
          toolbarButtons:props.toolbarButtons,
          userPopover:props.userPopover,
          toolbarUserPanel:props.toolbarUserPanel,
          screenIcons:props.screenIcons}}>           
            <MainLayout />
            {settingDrawer}
        </ConfigContext.Provider>
      </App>
    </ConfigProvider>
  )
}
