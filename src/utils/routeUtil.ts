import { IntlShape } from "react-intl"
import {IMenuData} from '../typings';
import { WardenGlobalThis } from '../context';
/**
 * 路由转换成菜单数据
 * @param routes 路由数据
 * @returns 菜单数据
 */
function getMenuData(routes:any[],intl?:IntlShape):IMenuData[]{
    let menuItemDatas:IMenuData[]=[]
    if(!routes || routes.length <=0){
        return menuItemDatas
    }
    routes.forEach((item,index)=>{
        const route = item.isWrapper ? item.routes[0] : item
        const path = route.path == '' ? route.originPath : route.path        
        const mkey = getPathToKey(path)
        if(!route.redirect && route.name){
            const menuItemData:IMenuData = {
                name:intl ? intl.formatMessage({id:mkey}) || route.name : route.name,
                locale:false,
                path:path,                
                key:mkey,
                title:route.title,
                iconName:route.icon,
                access:route.access,
            } 
            WardenGlobalThis.menuMap[mkey] = menuItemData
            menuItemData.items = getMenuData(route.routes,intl)
            menuItemDatas.push(menuItemData)
        }
    })
    return menuItemDatas
}

/**
 * 获取布局根路由
 * @param routes 
 * @param path 
 * @returns 
 */
function getLayoutRootRoutes(routes:any[], path:string){
    let children:any[] = []
    routes.forEach((item,index)=>{
        if(path == item.path){
            if(item.isWrapper){
                children = item.routes[0].routes
            }else{
                children = item.routes
            }
        }
    })
    return children
}

/**
 * 根据路由获取菜单key
 * @param path 路由
 * @returns 
 */
function getPathToKey(path:string){
    return "menu"+path.replaceAll("/",".");
}


function matchPathAllKeys(path:string,rootPath:string){
    let keys:string[] = []
    if(path==rootPath){
        keys.push(rootPath)
        return keys
    }
    const paths = path.split("/");
    let strs = "/"
    if(paths.length > 2){
        for(var i=0;i<paths.length;i++){
            if(strs.lastIndexOf("/") != strs.length - 1){
                strs += "/"
            }
            strs += paths[i]                        
            keys.push(strs)
        }       
    }else{
        keys.push(path)
    }
    return keys;
}

/**
 * 分隔路径中的路由key
 * @param path 路径
 * @param rootPath 根路由
 * @returns 路由key
 */
function matchPathKeys(path:string,rootPath:string){  
    let keys:string[] = []
    if(path==rootPath){
        keys.push(rootPath)
        return keys
    }
    const paths = path.substring(rootPath.length).split("/").filter((s)=>{return s && s.trim()})

    let strs = rootPath;
    if(rootPath != "/"){
        strs += "/"
    }
    for(var i=0;i<paths.length;i++){
        if(strs.lastIndexOf("/") != strs.length - 1){
            strs += "/"
        }
        strs += paths[i]                        
        keys.push(strs)
    }
    return keys
}
/**
 * 获取路由中的真实路径
 * @param route 路由
 * @returns 真实路径
 */
function getAppRoutePathKey(route:any){
    return route.path == '' || route.path == undefined ? route.originPath : route.path
}
export {getMenuData,getPathToKey,matchPathKeys,matchPathAllKeys,getLayoutRootRoutes,getAppRoutePathKey}