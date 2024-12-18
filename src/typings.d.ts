
export declare namespace Warden {
    type Theme = 'light' | 'dark'
    type LayoutType = 'HeadMenu' | 'LeftMenu'
    interface IConfig {
        theme:Theme        
        layoutType:LayoutType
        primaryColor:string
        compact?:boolean
        menuByPrimary?:boolean
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
        /** 颜色名称 */
        name?: string;
        /** 颜色值 */
        color: string;
    } 
    interface IUser {
        id:string;
        username:string;
        headImgUrl?:string;
        dept?:string;
        post?:string;
        email?:string;
        /** 最终校验的权限（为了兼容Umi之类的权限插件) */        
        access:string[];
        userType?:string;
        nickName?:string;
        /** 从后端取得的权限 */
        authoritys?:string[];
        /** 从后端取得的角色 */
        roles?:string[];        
        createDate?:string;
        modifyDate?:string;
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
      hideFooter?:boolean
  }
}
export declare type ContainerMode = "None" | "Box" | "Panel"
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
    access?:string[];
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
export declare type IconType = 'ant' | 'warden' | 'svg' | 'img';

export declare type ToolbarButtonProps = {
    icon?:string
    children?:JSX.Element
    onClick?:Function
    toolTipop?:string
}