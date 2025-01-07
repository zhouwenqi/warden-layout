
export declare namespace Warden {
    type Theme = 'light' | 'dark'
    type LayoutType = 'headMenu' | 'leftMenu'
    type IconSuffix = 'Outlined' | 'Filled' | 'TwoTone'
    interface IConfig {
        theme:Theme        
        layoutType:LayoutType
        primaryColor:string
        compact?:boolean
        menuByPrimary?:boolean
        leftTransparent?:boolean
        headTransparent?:boolean
        containerTransparent?:boolean
        menuSkin?:string     
        backgroundBlur?:boolean
        menuSplit?:boolean
        leftEmptyHidden?:boolean
        leftMenuInline?:boolean
        systemTheme?:boolean
        hideBorder?:boolean
        subItemMenuTransparent?:boolean
        rootItemMenuGroup?:boolean
        hideBreadcrumb?:boolean
        hideTitleBar?:boolean
        hideFooter?:boolean
        localeEnabled?:boolean
        brandLogo:string
        brandTitle?:string
        logoNavigateRoute?:string
        avatarReplaceBrand?:boolean
        menuIconToggle?:boolean
        menuIconSuffix?:IconSuffix
        page403?:string
        page404?:string
        pageLogin?:string
    }


    interface ILocal {
        id?: string;
    }

    interface IRegion {
        language: string;
        name: string;
        ico?: string;
    }
    interface IColor extends ILocal {
        name?: string;
        color: string;
    } 
    interface IUser {
        id:string;
        username:string;
        headImgUrl?:string;
        dept?:string;
        post?:string;
        email?:string;
        userType?:string;
        nickName?:string;
        authorities:string[];
        roles?:string[];        
        createDate?:string;
        modifyDate?:string;
    }
    interface IMenuSkin {
        name:string        
        primaryColor:string
        label?:string
        theme?:Theme
        layoutType?:LayoutType
        menuByPrimary?:boolean        
        icon?:string
        content?:JSX.Element
    }
}
/** 主体布局参数类型 */
export declare type LayoutGroupProps = {
    layout: Warden.LayoutType;
    onSelect: Function;
}
/** 主题色选择组件列表参数 */
declare type ColorBoxGroupProps = {
    onSelect: Function;
    color: string;
}
/** 颜色选择组件参数 */
export declare interface ColorBoxProps extends Warden.IColor {
    selected?: boolean;
    onSelectItem: Function;
}

/** 国际化语言参数 */
export declare type LanguageGroupProps = {
    onChange: Function;
    value: string;
}
export declare interface AppIconProps extends React.SVGProps<SVGSVGElement>{
    name?:string;
    size?:number;
    color?:string;
    readonly className?:string
}
export declare interface AppChartProps extends React.HTMLAttributes<HTMLDivElement> {    
    ready?:Function
    finished?:Function
    option?:any
}
export declare interface SvgIconProps  extends React.SVGProps<SVGSVGElement>{
    src:string
}
export declare interface WardenBaseProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{

}

export declare interface ContainerProps extends WardenBaseProps {
  children?:React.ReactNode,
  background?:string,
  showBreadcrumb?:boolean,
  fillHeight?:boolean,
  showTitle?:boolean
}

export declare namespace LayoutProps {
  type IndexProps = {
    config?:Warden.IConfig,
    footer?:JSX.Element,
    userPopover?:JSX.Element, 
    logoPopover?:JSX.Element,
    toolbarUserPanel?:JSX.Element,
    toolbarButtons?:JSX.Element[],
    screenIcons?:JSX.Element[],
    leftExpandPanel?:JSX.Element
  }
  type MainLayoutProps = {
    children: React.ReactElement
  };
  type LeftProps = {
      menuData: any[],
      selectedKeys: string[],
      openerKeys: string[],
  };
  type HeadProps = {
    menuData: any[],
    selectedKeys: string[],
    leftSilderHidden:boolean
  }
  type DynamicProps = {
    headerHeight: Int16
    leftWidth: Int16
  }
  type LogoProps = {
    collapsed:boolean
  }
  interface ContainerProps extends WardenBaseProps {
      children?:React.ReactNode,
      mode?:ContainerMode,
      hideTitle?:boolean,
      hideBreadcrumb?:boolean,
      hideFooter?:boolean,
      transparent?:boolean,
      menuByBackground?:boolean
  }
}
export declare type ContainerMode = "none" | "box" | "panel"
/** menu - model */
export declare interface IMenuData {
    key:string;
    path:string;
    name:string;
    locale?:boolean;
    iconName?:string;
    icon?: React.ReactNode;
    items?: IMenuData[];
    title?:string;
    access?:string;
    authorities?:string[];
    badge?:any;
    tag?:string;
}
/** ant-menu model */
export declare interface IAntMenuData {    
    key:string;
    label:string | ReactNode;
    type?:string;
    theme?:string;
    icon?: React.ReactNode;
    children?:IAntMenuData[];
    title?:string;
}
/** icon type */
export declare type IconType = 'ant' | 'warden' | 'svg' | 'umi';

export declare type ToolbarButtonProps = {
    icon?:string
    children?:JSX.Element
    onClick?:Function
    toolTipop?:string
}
declare type ToolbarLinkProps = {
    icon?:string
    children:JSX.Element | string
    href?:string
    target?:HTMLAttributeAnchorTarget | undefined;
    toolTipop?:string
}