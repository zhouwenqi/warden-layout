import { createContext,useContext } from "react";
import { useOutletContext } from "umi";
import {Warden,LayoutProps,IMenuData} from './typings';

const defaultConfig:Warden.IConfig = {
    theme:'light',
    systemTheme:true,
    layoutType:'HeadMenu',
    primaryColor:"#417ffb",
    compact:false,
    leftMenuInline:true,
    menuSplit:true,
    localeEnabled:true,
    hideBreadcrumb:false,
    hideTitleBar:true,
    hideFooter:false,
    brandLogo:"warden_logo",
    brandTitle:"Warden layout"
}

type ConfigDispatcher = {
    config:Warden.IConfig
    setConfig:(config:Warden.IConfig) => void
    getDynamicProps:() => LayoutProps.DynamicProps
    badgeCount:number
    setBadgeCount:(count:number)=>void
    footer?:JSX.Element
    userPopover?:JSX.Element
    toolbarUserPanel?:JSX.Element
    toolbarButtons?:JSX.Element[]
    screenIcons?:JSX.Element[]
}
type BadgeDispatcher = {
    count:number
    setCount:(count:number) => void
}
export type SchemeConfig = {
    // 当前用户
    currentUser:Warden.IUser | undefined;
    // 菜单数据
    menuData:Record<string,IMenuData[]>;
    // 菜单路径
    menuMap:Record<string,any>;
    // 布局配置数据
    configMap:Record<string,Warden.IConfig>;
    // 布局页角内容
    footerMap:Record<string,JSX.Element>;
    // 布局头部用户弹出面版
    popoverUserMap:Record<string,JSX.Element>;
    // 布局左侧栏是否手动折叠
    handFoldMap:Record<string,boolean>;
}
export type ContainerType = "Normal" | "None"

export type OutletContainer = {
    title:string
    breadcrumbData:any[]
}

const WardenContext= createContext<ConfigDispatcher>({
    config:defaultConfig,
    setConfig:()=>{},
    getDynamicProps:()=>({headerHeight:56,leftWidth:260}),
    badgeCount:0,
    setBadgeCount:(count:number)=>{}
})

var WardenGlobalThis:SchemeConfig = {
    currentUser:undefined,
    menuData:{},
    menuMap:{},
    configMap:{},
    footerMap:{},
    popoverUserMap:{},
    handFoldMap:{}
}

const BadgeContext = createContext<BadgeDispatcher>({count:0,setCount:()=>{}})
export const createConfigContext=()=>WardenContext
export const useConfigContext=()=>useContext(WardenContext)
export const useContainerContext=() => useOutletContext<OutletContainer>()
export const createBadgeContext=()=>BadgeContext
export const useBadgeContext=()=>useContext(BadgeContext)
export {defaultConfig,WardenGlobalThis}