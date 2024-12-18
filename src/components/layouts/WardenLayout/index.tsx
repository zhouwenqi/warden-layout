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
 * Layout main
 * @param props configuration
 * @returns 
 * @author zhouwenqi
 * @description The unified entrance for the entire layout, where information is initialized
 */
export default function IndexPanel(props:LayoutProps.IndexProps) {
  const configKey= getAppRoutePathKey(useRouteData().route)  
  const {clientRoutes} = useAppData()
  const ConfigContext = createConfigContext()
  const intl = useIntl()

  // Get layout configuration
  let layoutConfig = getStorageConfig(configKey) || props.config 
  if(!layoutConfig){
    layoutConfig = WardenGlobalThis.configMap[configKey] || defaultConfig
    setStorageConfig(layoutConfig)
  }

  const [config,setConfig] = useState<Warden.IConfig>(layoutConfig)

  // Retrieve menu data
  if(!WardenGlobalThis.menuData[configKey] || WardenGlobalThis.menuData[configKey].length <= 0){
    const menuRoutes = getLayoutRootRoutes(clientRoutes,configKey!)
    WardenGlobalThis.menuData[configKey] = getMenuData(menuRoutes, config.localeEnabled? intl : undefined)
  }   

  // Global Bubble
  const [badge,setBadge] = useState(0)

  // Monitoring system theme change
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

  // Layout Head Height
  const headerHeight = config.compact ? 48 : 56

  // Layout left width
  const leftWidth = config.compact ? 240 : 260
  
  // antd token 主题和算法
  let algorithm = config.theme == "dark" ? [theme.darkAlgorithm] : [theme.defaultAlgorithm] 
  if(config.compact){
    algorithm.push(theme.compactAlgorithm)
  }

  // menu style
  var menuStyle:any = {
    "activeBarHeight": config.compact ? 2 : 4,
  }

  // Layout style (only defining headers)
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

  // Layout configuration modification event
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
          leftExpandPanel:props.leftExpandPanel,
          screenIcons:props.screenIcons}}>           
            <MainLayout />
            {settingDrawer}
        </ConfigContext.Provider>
      </App>
    </ConfigProvider>
  )
}
