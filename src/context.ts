import { createContext,useContext } from "react";
import { useOutletContext } from "umi";
import {Warden,LayoutProps,IMenuData,IExtraTagProps,IExtraBadgeProps} from './typings';

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
    brandLogo:"warden@logo",
    brandTitle:"Warden layout"
}

type ConfigDispatcher = {
    config:Warden.IConfig
    setConfig:(config:Warden.IConfig) => void
    getDynamicProps:() => LayoutProps.DynamicProps
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
    wardenMenuData?:IMenuData[]
    setWardenMenuData:(menuData:IMenuData[])=>void
    setMenuExtraTag:(props:IExtraTagProps)=>void
    setMenuExtraBadge:(props:IExtraBadgeProps)=>void
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
    // user data
    userMap:Record<string,any>;
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
    logoPopoverOpen:false,
    setLogoPopoverOpen:(open:boolean)=>{},
    avatarPopoverOpen:false,
    setAvatarPopoverOpen:(open:boolean)=>{},
    wardenMenuData:[],
    setWardenMenuData:(menuData:IMenuData[])=>{},
    setMenuExtraTag:(props:IExtraTagProps)=>{},
    setMenuExtraBadge:(props:IExtraBadgeProps)=>{}
})

var WardenGlobalThis:SchemeConfig = {
    currentUser:undefined,
    menuData:{},
    menuMap:{},
    configMap:{},
    footerMap:{},
    userMap:{},
    handFoldMap:{},
    skinsMap:{}
}


export const createConfigContext=()=>WardenContext
export const useConfigContext=()=>useContext(WardenContext)
export const useContainerContext=() => useOutletContext<OutletContainer>()

export {defaultConfig,WardenGlobalThis}