
export declare namespace Warden {
    type Theme = 'light' | 'dark'
    type LayoutType = 'headMenu' | 'leftMenu'
    type MenuBackgroundStyle = 'normal' | 'black' | 'primary'
    interface IConfig {
        theme:Theme        
        layoutType:LayoutType
        primaryColor:string
        compact?:boolean
        leftTransparent?:boolean
        headTransparent?:boolean
        containerTransparent?:boolean
        menuSkin?:string     
        backgroundBlur?:boolean
        menuSplit?:boolean
        menuIconSize?:number
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
        avatarNavigateRoute?:string
        avatarReplaceBrand?:boolean
        menuIconVariant?:boolean | string[]        
        menuBackgroundStyle?:MenuBackgroundStyle
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
        menuBackgroundStyle?:MenuBackgroundStyle      
        icon?:string
        backgroundImage?:string
        content?:JSX.Element
    }
}
/** main layout type */
export declare type LayoutGroupProps = {
    layout: Warden.LayoutType;
    onSelect: Function;
}
/** color box props */
declare type ColorBoxGroupProps = {
    onSelect: Function;
    color: string;
}
/** colorbox props */
export declare interface ColorBoxProps extends Warden.IColor {
    selected?: boolean;
    onSelectItem: Function;
}

/** language group props */
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
    avatarPopover?:JSX.Element, 
    logoPopover?:JSX.Element,
    toolbarButtons?:JSX.Element[],
    screenIcons?:JSX.Element[],
    leftExpandPanel?:JSX.Element,
    frameElements?:JSX.Element[]
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
      menuByBackground?:boolean,
      bordered?:boolean,
      stretch?:ContainerStretch
  }
}
export declare type ContainerMode = "none" | "box" | "panel"
export declare type ContainerStretch = "none" | "auto" | "fill"
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
    badge?:IMenuBadge;
    tag?:IMenuTag;
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
    extra?:React.ReactNode;
}
/** icon type */
export declare type IconType = 'ant' | 'img' | 'svg' | 'umi';

export declare interface IMenuBadge {
    position?:"left" | "right";
    status?:"success" | "processing" | "default" | "error" | "warning";
    count?:number;
    text?:string;
    dot?:boolean;
    color?:string;
}
export declare interface IMenuTag{
    color?:string;
    bordered?:boolean;
    text?:string;
}
export declare interface IExtraTagProps {
    filterKey:"key"|"path"|"name";
    filterValue:string;   
    data:IMenuTag | undefined;
}
export declare interface IExtraBadgeProps {
    filterKey:"key"|"path"|"name";
    filterValue:string;   
    data:IMenuBadge | undefined;
}
declare interface IMenuMessageEvent {
    id: "tag" | "badge";
    data:any | undefined;
}

export declare interface ToolbarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    icon?:string
    children?:JSX.Element
}
export declare interface ToolbarLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    icon?:string;
    children:JSX.Element | string;
    href?:string;
    target?:HTMLAttributeAnchorTarget | undefined;
}