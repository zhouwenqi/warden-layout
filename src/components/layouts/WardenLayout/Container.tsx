import { useContainerContext,useConfigContext,WardenGlobalThis } from '@/context';
import {theme,Breadcrumb,Layout} from 'antd';
import {Link,useRouteData} from 'umi';
import { getAppRoutePathKey } from '@/utils/routeUtil';
import {LayoutProps} from '@/typings';
import { hexToRgbaString } from '@/utils/stringUtil';
const {useToken} = theme;  
const {Content,Footer} = Layout
/**
 * Global Container
 * 
 * Try to use it on every page as much as possible
 * @param props Container Properties
 * @returns 
 * @author zhouwenqi
 * @description Container component used for laying out sub routing component packages
 */
const Container=(props:LayoutProps.ContainerProps={menuByBackground:true})=>{    
    const {config,footer} = useConfigContext()    
    const {title, breadcrumbData} = useContainerContext()
    const {token} = useToken()
    const {menuByBackground=true} = props
    const configKey= getAppRoutePathKey(useRouteData().route)  

    let titlePanel = <></>
    if(!props.hideTitle && !config.hideTitleBar){
        titlePanel = (<h3 style={{margin:config.compact ? "0px 0px 14px" : "0px 0px 16px",lineHeight:"1em"}}>{title}</h3>)
    }    
    
    // Breadcrumb navigation bar
    const hideBreadcrumb = props.hideBreadcrumb || config.hideBreadcrumb

    let BreadcrumbPanel = <></>
    function itemRender(currentRoute:any, params:any, items:any, paths:any) {
        const isLast = currentRoute.path === items[items.length - 1]?.path;        
        return isLast ? (
            <span>{currentRoute.title}</span>
        ) : (
            <Link to={currentRoute.path}>{currentRoute.title}</Link>
        )
    }
    
    if(!hideBreadcrumb){ 
        let items:any[]=[]
        breadcrumbData.forEach((menu,index)=>{
            items.push({
                title:menu.name,
                path:menu.path
            })
        })
        BreadcrumbPanel = (<Breadcrumb style={{marginBottom: config.compact ? "14px" : "16px"}} items={items} itemRender={itemRender} />)
    }
   

    // footer
    const footerElement =  footer || WardenGlobalThis.footerMap[configKey]
    const hideFooter = props.hideFooter || config.hideFooter
    let FooterPanel = <></>
    if(!hideFooter && footerElement){
        FooterPanel = (
        <Footer style={{paddingBottom:"0px",color:token.colorTextTertiary,fontSize:token.fontSize,background:"transparent"}}>                            
            {footerElement}
        </Footer>)
    }

    // Internal style of container
    let contentStyle:React.CSSProperties = {        
        borderRadius: token.borderRadiusLG
    }  

    // Container exterior style
    let layoutStyle:React.CSSProperties = {}
    let clsName = props.className || ""

    if(props.mode == "box" || props.mode == "panel"){
        layoutStyle = {
            ...layoutStyle,
            padding: config.compact ? '18px' : '24px'
        }
        contentStyle = {
            ...contentStyle,
            padding:config.compact ? 16 : 20,
        }
        if(props.mode == "panel"){
            contentStyle = {
                ...contentStyle,
                background: menuByBackground && (config.headTransparent || config.leftTransparent) ? hexToRgbaString(token.colorBgContainer,0.6) : token.colorBgContainer
            }
            clsName += (menuByBackground && config.backgroundBlur ? " warden-layout-blur" : "")
        }
    }    

    if(config.containerTransparent || props.transparent){
        layoutStyle = {
            ...layoutStyle,background:"transparent"
        }
    }

    contentStyle = {
        ...contentStyle,
        ...props.style
    }

    return(
        <>
        <Layout style={layoutStyle}>
            {BreadcrumbPanel}
            {titlePanel}
            <Content style={contentStyle} className={clsName}>
                {props.children}
            </Content>
            {FooterPanel}
        </Layout>
        </>
    )
}
export default Container