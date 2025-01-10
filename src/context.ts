import { createContext,useContext } from "react";
import { useOutletContext } from "umi";
import {Warden,LayoutProps,IMenuData} from './typings';

const defaultConfig:Warden.IConfig = {
    theme:'light',
    systemTheme:true,
    layoutType:'headMenu',
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
    logoPopoverOpen:boolean
    setLogoPopoverOpen:(open:boolean)=>void
    avatarPopoverOpen:boolean
    setAvatarPopoverOpen:(open:boolean)=>void
    footer?:JSX.Element
    avatarPopover?:JSX.Element
    logoPopover?:JSX.Element
    toolbarButtons?:JSX.Element[]
    screenIcons?:JSX.Element[]
    leftExpandPanel?:JSX.Element
}
type BadgeDispatcher = {
    count:number
    setCount:(count:number) => void
}
export type SchemeConfig = {
    // current user
    currentUser:Warden.IUser | undefined;
    // menu data
    menuData:Record<string,IMenuData[]>;
    // menu path
    menuMap:Record<string,any>;
    // config data
    configMap:Record<string,Warden.IConfig>;
    // footer
    footerMap:Record<string,JSX.Element>;
    // user popover
    popoverUserMap:Record<string,JSX.Element>;
    // Manual folding
    handFoldMap:Record<string,boolean>;
    // menu skin data
    skinsMap:Record<string,Warden.IMenuSkin>
}

export type OutletContainer = {
    title:string
    breadcrumbData:any[]
}

const WardenContext= createContext<ConfigDispatcher>({
    config:defaultConfig,
    setConfig:()=>{},
    getDynamicProps:()=>({headerHeight:56,leftWidth:260}),
    badgeCount:0,
    setBadgeCount:(count:number)=>{},
    logoPopoverOpen:false,
    setLogoPopoverOpen:(open:boolean)=>{},
    avatarPopoverOpen:false,
    setAvatarPopoverOpen:(open:boolean)=>{}
})

var WardenGlobalThis:SchemeConfig = {
    currentUser:undefined,
    menuData:{},
    menuMap:{},
    configMap:{},
    footerMap:{},
    popoverUserMap:{},
    handFoldMap:{},
    skinsMap:{}
}

const BadgeContext = createContext<BadgeDispatcher>({count:0,setCount:()=>{}})
export const createConfigContext=()=>WardenContext
export const useConfigContext=()=>useContext(WardenContext)
export const useContainerContext=() => useOutletContext<OutletContainer>()
export const createBadgeContext=()=>BadgeContext
export const useBadgeContext=()=>useContext(BadgeContext)
export {defaultConfig,WardenGlobalThis}