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
    brandLogo:"warden@logo",
    brandTitle:"Warden layout"
}

type ConfigDispatcher = {
    config:Warden.IConfig
    setConfig:(config:Warden.IConfig) => void
    getDynamicProps:() => LayoutProps.DynamicProps
    menuBadge:Record<string,number>
    setMenuBadge:(badge:Record<string,number>)=>void
    setMenuBadgeCount:(key:string,badge:number)=>void
    menuTag:Record<string,any>
    setMenuTag:(tag:Record<string,any>)=>void
    setMenuTagValue:(key:string,tagValue:any)=>void
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
    menuBadge:{},
    setMenuBadge:(badge:Record<string,number>)=>{},
    setMenuBadgeCount:(key:string,badge:number)=>{},   
    menuTag:{},
    setMenuTag:(tag:{})=>{},
    setMenuTagValue:(key:string,tagValue:any)=>{},
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
    userMap:{},
    handFoldMap:{},
    skinsMap:{}
}

const BadgeContext = createContext<BadgeDispatcher>({count:0,setCount:()=>{}})
export const createConfigContext=()=>WardenContext
export const useConfigContext=()=>useContext(WardenContext)
export const useContainerContext=() => useOutletContext<OutletContainer>()
export const useSingleMenuBadge = (key:string,defaultBadge?:number):any=>{
    const {menuBadge,setMenuBadgeCount} = useContext(WardenContext)
    return {badgeCount:menuBadge[key] !== undefined ? menuBadge[key] : defaultBadge, setBadgeCount:(count:number)=>{setMenuBadgeCount(key,count)},menuBadge}
}
export const useSingleMenuTag = (key:string,defaultTag?:any):any=>{
    const {menuTag,setMenuTagValue} = useContext(WardenContext)
    return {tagValue:menuTag[key] !== undefined ? menuTag[key] : defaultTag, setTagValue:(value:any)=>{setMenuTagValue(key,value)}}
}
export {defaultConfig,WardenGlobalThis}