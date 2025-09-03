import { useContainerContext,useConfigContext,WardenGlobalThis } from '@/context';
import {theme,Breadcrumb,Layout} from 'antd';
import {Link,useRouteData,useParams} from 'umi';
import { getAppRoutePathKey, getFillRoute } from '@/utils/routeUtil';
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
const Container=(props:LayoutProps.ContainerProps)=>{    
    const {config,footer} = useConfigContext()    
    const {title, breadcrumbData} = useContainerContext()
    const {token} = useToken()
    const {menuByBackground=true} = props
    const configKey= getAppRoutePathKey(useRouteData().route)  
    const params = useParams()

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
                path:getFillRoute(menu.path,params)
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
    let bodyStyle:React.CSSProperties = {        
        borderRadius: token.borderRadiusLG
    }  

    // Container style
    let contentStyle:React.CSSProperties = {
        flex:"none"
    }

    // Container bordered
    const bordered:boolean = props.bordered || !config.hideBorder

    // Container exterior style
    let layoutStyle:React.CSSProperties = {}
    let clsName = props.className || ""

    if(props.mode == "box" || props.mode == "panel"){
        layoutStyle = {
            ...layoutStyle,
            padding: config.compact ? '18px' : '24px'
        }
        
        if(props.mode == "panel"){
            bodyStyle = {
                ...bodyStyle,
                padding:config.compact ? '16px' : '20px',
                background: menuByBackground && (config.headTransparent || config.leftTransparent) ? hexToRgbaString(token.colorBgContainer,0.6) : token.colorBgContainer
            }
            if(bordered){
                bodyStyle = {
                    ...bodyStyle,
                    border:"solid 1px " + token.colorBorderSecondary
                }
            }
            clsName += (menuByBackground && config.backgroundBlur ? " warden-layout-blur" : "")
        }
    }    

    // container height stretch
    if(props.stretch == "auto" || props.stretch=="fill"){
        contentStyle = {
            flex:"auto"
        }
        if(props.stretch == "fill"){
            bodyStyle = {
                ...bodyStyle,
                minHeight:"100%"
            }
        }
    }

    // container background style
    if(config.containerTransparent || props.transparent){
        layoutStyle = {
            ...layoutStyle,background:"transparent"
        }
    }

    bodyStyle = {
        ...bodyStyle,
        ...props.style
    }

    return(
        <>
        <Layout style={layoutStyle}>
            {BreadcrumbPanel}
            {titlePanel}
            <Content style={contentStyle} className={clsName}>
                <div style={bodyStyle}>
                    {props.children}
                </div>
            </Content>
            {FooterPanel}
        </Layout>
        </>
    )
}
export default Container