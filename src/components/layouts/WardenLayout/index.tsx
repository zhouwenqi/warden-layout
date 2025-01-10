import { useEffect, useState } from 'react';
import {ConfigProvider,App,Spin,theme} from 'antd';
import {useIntl,getLocale, useRouteData,useAppData,useModel,useLocation,Navigate,useAccess} from 'umi';
import { createConfigContext, defaultConfig,WardenGlobalThis} from '@/context';
import { getAppRoutePathKey, getLayoutRootRoutes, getMenuData,getCurrentPathMenuData } from '@/utils/routeUtil';
import SettingDrawer from '@/components/setting/index';
import { getStorageConfig, setStorageConfig } from '@/utils/configUtil';
import { generate } from '@ant-design/colors';
import {LayoutProps,Warden} from '@/typings';
import MainLayout from './MainLayout';
import { hexToRgbaString } from '@/utils/stringUtil';
import { hasAuthority,matchAccess } from '@/utils/securityUtil';

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
  const [load,setLoad]=useState<boolean>(true)
  const [authorize,setAuthorize]=useState<boolean>(true)
  const {initialState} = useModel('@@initialState')
  const umiAccess = useAccess()

  // Get layout configuration
  let layoutConfig = getStorageConfig(configKey) || props.config 
  if(!layoutConfig){
    layoutConfig = WardenGlobalThis.configMap[configKey] || defaultConfig
    setStorageConfig(layoutConfig)
  }
  // global config
  const [config,setConfig] = useState<Warden.IConfig>(layoutConfig)
  // global logo popover
  const [logoPopoverOpen,setLogoPopoverOpen] = useState<boolean>(false)
  // global avatar popover
  const [avatarPopoverOpen,setAvatarPopoverOpen] = useState<boolean>(false)
  // global bubble
  const [badge,setBadge] = useState(0)

  // Retrieve menu data
  if(!WardenGlobalThis.menuData[configKey] || WardenGlobalThis.menuData[configKey].length <= 0){
    const menuRoutes = getLayoutRootRoutes(clientRoutes,configKey!)
    WardenGlobalThis.menuData[configKey] = getMenuData(menuRoutes, config.localeEnabled? intl : undefined)
  }   

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

  const currentMenuData = getCurrentPathMenuData(useLocation().pathname)
  useEffect(()=>{
    // init userinfo and skins
    (async()=>{  
      setLoad(true)    
      WardenGlobalThis.currentUser =  await initialState?.getUserInfo!()
      if(initialState?.skins && initialState.skins.length > 0){
        initialState.skins.forEach((item,index)=>{
          WardenGlobalThis.skinsMap[item.name] = item
        })
      }
      setLoad(false)
    })()
    
    const schemeTheme = scheme.matches ? 'dark' : 'light'
    if(config.systemTheme && schemeTheme != config.theme){
      setConfig({
        ...config, theme:schemeTheme
      })      
    } 

    if(currentMenuData && (!hasAuthority(currentMenuData.authorities!) || (currentMenuData.access && !matchAccess(umiAccess,currentMenuData.access)))){
      setAuthorize(false)
    } 
  },[])

  // refresh skins locale...
  const refreshSkinsLocale=()=>{
    const keys = Object.keys(WardenGlobalThis.skinsMap)
    keys.forEach((k)=>{      
      const itemSkin = WardenGlobalThis.skinsMap[k]
      itemSkin.label =  config.localeEnabled ? intl.formatMessage({id: 'skin.'+ itemSkin.name+".label"}) : itemSkin.name
    })
  }

  // Layout Head Height
  const headerHeight = config.compact ? 48 : 56

  // Layout left width
  const leftWidth = config.compact ? 240 : 260
  
  // antd token theme and algorithm
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
  const primaryColors = generate(config.primaryColor)

  if(config.hideBorder){
    menuStyle = {...menuStyle, "colorSplit":"transparent"}
  }
  
  if(config.theme == "dark"){
    menuStyle = {...menuStyle,
        "itemSelectedBg": config.headTransparent ? hexToRgbaString(config.primaryColor,0.7) : config.primaryColor,        
        "itemSelectedColor": "white",
        "itemColor": "rgba(255,255,255,0.6)"
    }
  }else{
    menuStyle = {...menuStyle,
        "itemSelectedBg": hexToRgbaString(config.primaryColor,0.1)
    }    
  }

  if(config.menuByPrimary) {
    if(config.layoutType=="leftMenu"){
      menuStyle = {
        ...menuStyle,
        darkItemBg:primaryColors[1],
        darkSubMenuItemBg:primaryColors[7],
        darkItemSelectedBg:primaryColors[6],
        darkPopupBg:primaryColors[5]
      } 
    }else{
      layoutStyle = {...layoutStyle, headerColor:"white"}
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

  // loading status...
  if(load){
      const spinPanel = initialState?.spin || <Spin delay={500} fullscreen />
      return(
        spinPanel
      )
  }
  
  refreshSkinsLocale()

  if(!authorize){
    console.warn("not match authority...")
    if(config.page403){
      return <Navigate to={config.page403} />
    }else{
      return (
        <></>
      )
    }
  }

  return (    
    <ConfigProvider theme={themeConfig} locale={getLocale()}>
      <App> 
      <ConfigContext.Provider value={{
          config,
          setConfig:onConfigChange,
          getDynamicProps,
          badgeCount:badge,
          setBadgeCount:setBadge,
          logoPopoverOpen,
          setLogoPopoverOpen,
          avatarPopoverOpen,
          setAvatarPopoverOpen,
          footer:props.footer,
          toolbarButtons:props.toolbarButtons,
          avatarPopover:props.avatarPopover,
          logoPopover:props.logoPopover,
          leftExpandPanel:props.leftExpandPanel,
          screenIcons:props.screenIcons}}>           
            <MainLayout />
            {settingDrawer}
        </ConfigContext.Provider>
      </App>
    </ConfigProvider>
  )
}
