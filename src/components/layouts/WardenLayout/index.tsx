import { useEffect, useState } from 'react';
import {ConfigProvider,App,theme} from 'antd';
import {useIntl, getLocale, useRouteData,useAppData,useModel,useLocation,Navigate,useAccess} from 'umi';
import { createConfigContext, defaultConfig,WardenGlobalThis} from '@/context';
import { getAppRoutePathKey, getLayoutRootRoutes, getMenuData,getCurrentPathMenuData } from '@/utils/routeUtil';
import SettingDrawer from '@/components/setting/index';
import { getStorageConfig, setStorageConfig } from '@/utils/configUtil';
import { generate } from '@ant-design/colors';
import {LayoutProps,Warden,IExtraTagProps,IExtraBadgeProps,IMenuMessageEvent,IMenuData} from '@/typings';
import MainLayout from './MainLayout';
import { hexToRgbaString } from '@/utils/stringUtil';
import { hasAuthority,matchAccess } from '@/utils/securityUtil';
import dayjs from 'dayjs';
import { getMenuLocale, modifyMenuExtras } from '@/utils/menuUtil';

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
  const [authorize,setAuthorize]=useState<boolean>(true)
  const {initialState} = useModel('@@initialState')
  const umiAccess = useAccess()

  // Get layout configuration
  let layoutConfig = props.config
  if(process.env.UMI_APP_ENABLE_CONFIG_STORAGE){
    layoutConfig =  getStorageConfig(configKey) || props.config
  }
  if(!layoutConfig){
    layoutConfig = WardenGlobalThis.configMap[configKey] || defaultConfig
    if(process.env.UMI_APP_ENABLE_CONFIG_STORAGE){
      setStorageConfig(layoutConfig)
    }
  }
  // global config
  const [config,setConfig] = useState<Warden.IConfig>(layoutConfig)
  // global logo popover
  const [logoPopoverOpen,setLogoPopoverOpen] = useState<boolean>(false)
  // global avatar popover
  const [avatarPopoverOpen,setAvatarPopoverOpen] = useState<boolean>(false)
  // global bubble
  const [menuBadge,setMenuBadge] = useState<Record<string,number>>({})
  const setMenuBadgeCount=(key:string,value:number)=>{
    setMenuBadge((badge)=>({...badge,[key]:value}))
  }  
  // global menu tag
  const [menuTag,setMenuTag] = useState<Record<string,any>>({})
  const setMenuTagValue=(key:string,value:any)=>{
    setMenuTag((tag)=>({...tag,[key]:value}))
  }

  // Retrieve menu data
  if(!WardenGlobalThis.menuData[configKey] || WardenGlobalThis.menuData[configKey].length <= 0){
    const menuRoutes = getLayoutRootRoutes(clientRoutes,configKey!)
    WardenGlobalThis.menuData[configKey] = getMenuData(menuRoutes, config.localeEnabled? intl : undefined)
  }   

  const [wardenMenuData,setWardenMenuData]=useState<IMenuData[]>(WardenGlobalThis.menuData[configKey])

  // init userinfo and skins   
  WardenGlobalThis.currentUser =  initialState?.currentUser
  if(initialState?.skins && initialState.skins.length > 0){
    initialState.skins.forEach((item,index)=>{
      WardenGlobalThis.skinsMap[item.name] = item
    })
  }

  // locale listener
  const locale = getLocale()
  useEffect(()=>{    
    setWardenMenuData(getMenuLocale(wardenMenuData!,intl));
  }, [locale])

  // Monitoring system theme change
  const scheme = window.matchMedia("(prefers-color-scheme: dark)")
  scheme.onchange=(event)=>{
    setConfig({...config, theme:event.matches ? 'dark' : 'light'})
  }

  // umi locale event
  useEffect(()=>{
     let menuData = getMenuLocale(wardenMenuData!,intl)
     setWardenMenuData(menuData)
  },[getLocale])

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
        
    const schemeTheme = scheme.matches ? 'dark' : 'light'
    if(config.systemTheme && schemeTheme != config.theme){
      setConfig({
        ...config, theme:schemeTheme
      })      
    } 
    WardenGlobalThis.userMap["primaryColor"] = config.primaryColor

    if(currentMenuData && (!hasAuthority(currentMenuData.authorities!) || (currentMenuData.access && !matchAccess(umiAccess,currentMenuData.access)))){
      setAuthorize(false)
    } 

    // menu message listener
    window.addEventListener("menu-message",onMenuMessageEventHandler)
    return()=>{
      window.removeEventListener("menu-message",onMenuMessageEventHandler)
    }
  },[])

  // menu message event handler
  const onMenuMessageEventHandler = (e:any) => {  
    const event = e as CustomEvent<IMenuMessageEvent>; 
      if(event.detail.id=="tag"){
        onSetExtraTagChange(event.detail.data)
      }else if(event.detail.id=="badge"){
        onSetExtraBadgeChange(event.detail.data);
      }
  } 

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
    const selectBg = config.menuBackgroundStyle == "black" ? "#222222" : config.primaryColor
    menuStyle = {...menuStyle,
        "itemSelectedBg": config.headTransparent ? hexToRgbaString(selectBg,0.7) : selectBg,
        "itemSelectedColor": "white",
        "itemColor": "rgba(255,255,255,0.6)",
    }
  }else{
    menuStyle = {...menuStyle,
        "itemSelectedBg": hexToRgbaString(config.primaryColor,0.1)
    }    
  }

  if(config.menuBackgroundStyle == "black" || config.menuBackgroundStyle == "primary") {
    if(config.layoutType=="headMenu"){
      layoutStyle = {...layoutStyle, headerColor:"white"} 
    }
    if(config.menuBackgroundStyle == "black"){
      
    }
    const blackColors = generate("#222222")
    menuStyle = {
      ...menuStyle,
      darkItemBg:primaryColors[1],
      darkSubMenuItemBg: config.menuBackgroundStyle == "black" ? blackColors[7] : primaryColors[7],
      darkItemSelectedBg:primaryColors[6],        
      darkPopupBg: config.menuBackgroundStyle == "black" ? blackColors[5] : primaryColors[5],
    }
    if(!config.menuSplit || config.layoutType=="leftMenu"){
        menuStyle = {
          ...menuStyle, 
          subMenuItemSelectedColor:"white"
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
    WardenGlobalThis.userMap["primaryColor"] = config.primaryColor
    if(process.env.UMI_APP_ENABLE_CONFIG_STORAGE){
      setStorageConfig(value,configKey)
    }
  }

  // Set menu extension (tag)
  const onSetExtraTagChange=(props:IExtraTagProps)=>{
    const {filterKey,filterValue,data} = props
    const menuData = modifyMenuExtras(wardenMenuData,filterKey,filterValue,(item)=> !data ? item.tag = undefined : (typeof item.tag == "string" ? item.tag = data : item.tag = {...item.tag,...data}) )
    setWardenMenuData(menuData)

  }
  // Set menu extension (badge)
  const onSetExtraBadgeChange=(props:IExtraBadgeProps)=>{
    const {filterKey,filterValue,data} = props
    const menuData = modifyMenuExtras(wardenMenuData,filterKey,filterValue,(item)=> !data ? item.badge = undefined : (typeof item.badge == "string" ? item.badge = data : item.badge = {...item.badge,...data}) )
    setWardenMenuData(menuData)
  }
  

  // Obtain dynamic parameters of layout components
  const getDynamicProps=():LayoutProps.DynamicProps => {
    return {
      headerHeight:headerHeight,
      leftWidth:leftWidth
    }
  }

  // enabled settingdrawer component
  const settingDrawer = process.env.NODE_ENV == "development" || process.env.ENABLE_SETTING == "true" ? <SettingDrawer /> : <></> 
   
  // refresh skins locale...
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
  // global form struct
  let framesetPanel = props.frameElements ?? <></> 

  // antd locale config
  const antdLocale = require("antd/locale/"+locale.replace("-","_")).default
  require("dayjs/locale/"+antdLocale.locale)
  // date-time component locale
  dayjs.locale(antdLocale.locale)
  // global context direction
  const direction =  ['he', 'ar', 'fa', 'ku'].filter(lng => locale.startsWith(lng)).length ? 'rtl' : 'ltr';

  return (    
    <ConfigProvider theme={themeConfig} locale={antdLocale} direction={direction}>
      <App> 
      <ConfigContext.Provider value={{
          config,
          setConfig:onConfigChange,
          getDynamicProps,
          logoPopoverOpen,
          setLogoPopoverOpen,
          avatarPopoverOpen,
          setAvatarPopoverOpen,
          footer:props.footer,
          wardenMenuData,
          setWardenMenuData,
          setMenuExtraTag:onSetExtraTagChange,
          setMenuExtraBadge:onSetExtraBadgeChange,
          toolbarButtons:props.toolbarButtons,
          avatarPopover:props.avatarPopover,
          logoPopover:props.logoPopover,
          leftExpandPanel:props.leftExpandPanel,
          screenIcons:props.screenIcons}}>           
            <MainLayout />
            {settingDrawer}
            {framesetPanel}
        </ConfigContext.Provider>
      </App>
    </ConfigProvider>
  )
}
