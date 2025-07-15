import { Layout } from 'antd';
import { useLocation,useRouteData,useSelectedRoutes,Outlet,useParams,useAccess} from 'umi';
import './MainLayout.less';
import LeftPanel from './LeftPanel';
import HeadPanel from './HeadPanel';
import { getAppRoutePathKey,matchPathKeys,matchPathAllKeys } from '@/utils/routeUtil';
import { getAntdMenus, getMapMenus, getSplitAntdMenus } from '@/utils/menuUtil';
import {IAntMenuData} from '@/typings';
import { useConfigContext,WardenGlobalThis } from '@/context';
import BackgroundPanel from './BackgroundPanel';

/**
 * Main layout
 * @returns 
 * @author zhouwenqi
 * @description The main framework of the layout
 */
const MainLayout=()=>{
    const location = useLocation()
    
    const {config,wardenMenuData} = useConfigContext()
    const currentRoute = useSelectedRoutes()
    const configKey= getAppRoutePathKey(useRouteData().route)
    const menuKeys = matchPathKeys(location.pathname,configKey) 
    const params = useParams()
    const access = useAccess()

    // Obtain breadcrumb data
    const breadMenuKeys = matchPathAllKeys(location.pathname,configKey,params)
    const breadcrumbData = getMapMenus(breadMenuKeys)

    // Retrieve menu and route selection data
    WardenGlobalThis.userMap["access"] = access
    WardenGlobalThis.userMap["config.menuIconVariant"] = config.menuIconVariant  

    let selectLeftKeys:string[] = []
    let selectTopKeys:string[] = []
    
    // const antdMenuData = getAntdMenus(WardenGlobalThis.menuData[configKey],menuKeys)
    const antdMenuData = getAntdMenus(wardenMenuData!,menuKeys)
    let headMenus:IAntMenuData[] = []
    let leftMenus:IAntMenuData[] = []

    // Allocate menu data according to layout
    switch(config.layoutType){
        case "leftMenu":
            leftMenus = antdMenuData || []
            selectLeftKeys = menuKeys
            break;
        case "headMenu":
        default:
            headMenus = antdMenuData || []            
            selectTopKeys = menuKeys
            break
    }

    // Separate menu data
    if(config.menuSplit && menuKeys.length > 0){
        selectTopKeys = [menuKeys[0]]        
        const {rootMenus,childMenus} = getSplitAntdMenus(antdMenuData, menuKeys)
        headMenus = rootMenus 
        leftMenus = childMenus
        if(menuKeys.length > 1){
            selectLeftKeys = menuKeys
        }
    }

    // Set Title
    const breadcrumbMenu = breadcrumbData.length > 0 ? breadcrumbData[breadcrumbData.length-1] : undefined
    const currentTitle = breadcrumbMenu ? breadcrumbMenu.title || breadcrumbMenu.name : ''
    document.title = currentTitle

    // Expand the key on the left menu
    const operLeftKeys = selectLeftKeys

    // Automatically hide the left sidebar
    const leftPanelHidden:boolean = leftMenus.length <= 0 && (config.layoutType == "headMenu" || (config.leftEmptyHidden==true && config.layoutType == "leftMenu"))
 
    const containerStyle:React.CSSProperties={position:'relative',background:"transparent"}
    // sidebar menu
    const SiderPanel = leftPanelHidden ? <></> : <LeftPanel selectedKeys={selectLeftKeys} menuData={leftMenus} openerKeys={operLeftKeys} />

    // The menu and layout are not used in the current route
    const lastRoute = currentRoute.findLast((r)=>r.route)?.route as any
    if(lastRoute.menuRender == false){
        return <Outlet />
    }
    return(
        <div className='warden-layout-box'>
            <BackgroundPanel />
            <Layout className='warden-layout-body'>
                {SiderPanel}                
                <Layout style={containerStyle}>
                    <HeadPanel menuData={headMenus} selectedKeys={selectTopKeys} leftSilderHidden = {leftPanelHidden} />
                    <Outlet context={{title:currentTitle,breadcrumbData}} />
                </Layout>
            </Layout>            
        </div>
    )
}
export default MainLayout