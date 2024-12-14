import { Layout,theme } from 'antd';
import { useLocation,useRouteData,Outlet} from 'umi';
import './MainLayout.less';
import LeftPanel from './LeftPanel';
import HeadPanel from './HeadPanel';
import { getAppRoutePathKey,matchPathKeys,matchPathAllKeys } from '@/utils/routeUtil';
import { getAntdMenus, getMapMenus, getSplitAntdMenus } from '@/utils/menuUtil';
import {IAntMenuData} from '@/typings';


import { useConfigContext,WardenGlobalThis } from '@/context';


const {useToken} = theme;


/**
 * Main layout
 * @returns 
 * @author zhouwenqi
 * @description The main framework of the layout
 */
export default function () {
    const location = useLocation()
    
    const {config} = useConfigContext()
    const configKey= getAppRoutePathKey(useRouteData().route)
    const menuKeys = matchPathKeys(location.pathname,configKey) 

    // Obtain breadcrumb data
    const breadMenuKeys = matchPathAllKeys(location.pathname,configKey)
    const breadcrumbData = getMapMenus(breadMenuKeys)

    // Retrieve menu and route selection data
    let selectLeftKeys:string[] = []
    let selectTopKeys:string[] = []
    const antdMenuData = getAntdMenus(WardenGlobalThis.menuData[configKey])
    let headMenus:IAntMenuData[] = []
    let leftMenus:IAntMenuData[] = []

    // Allocate menu data according to layout
    switch(config.layoutType){
        case "LeftMenu":
            leftMenus = antdMenuData || []
            selectLeftKeys = menuKeys
            break;
        case "HeadMenu":
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
    const currentTitle = breadcrumbData.length > 0 ? breadcrumbData[breadcrumbData.length-1].name : ''
    document.title = currentTitle

    // Expand the key on the left menu
    const operLeftKeys = selectLeftKeys

    const {token} = useToken()

    // Automatically hide the left sidebar
    const leftPanelHidden:boolean = leftMenus.length <= 0 && (config.layoutType == "HeadMenu" || (config.leftEmptyHidden==true && config.layoutType == "LeftMenu"))
 

    return(
        <div className='warden-layout-box'>
            <div className='warden-layout-background' style={{background:token.colorBgLayout}}></div>
            <Layout className='warden-layout-body'>
                {leftPanelHidden ? <></> : <LeftPanel selectedKeys={selectLeftKeys} menuData={leftMenus} openerKeys={operLeftKeys} />}                
                <Layout style={{position:'relative'}}>
                    <HeadPanel menuData={headMenus} selectedKeys={selectTopKeys} leftSilderHidden = {leftPanelHidden} />
                    <Outlet context={{title:currentTitle,breadcrumbData}} />
                </Layout>
            </Layout>            
        </div>
    )
}