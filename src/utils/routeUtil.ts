import { IntlShape } from "react-intl"
import {IMenuData} from '../typings';
import { WardenGlobalThis } from '../context';

/**
 * Convert routing into menu data
 * @param routes route data
 * @returns menu data
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
                iconName: route.icon,
                access:route.access,
                authorities:route.authorities
            } 
            WardenGlobalThis.menuMap[mkey] = menuItemData
            menuItemData.items = getMenuData(route.routes,intl)
            menuItemDatas.push(menuItemData)
        }
    })
    return menuItemDatas
}

/**
 * Get layout root route
 * @param routes route data
 * @param path path
 * @returns root route
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
 * Get layout root route
 * @param path route
 * @returns 
 */
function getPathToKey(path:string){
    return "menu"+path.replaceAll("/",".");
}

/**
 * Convert matching path to key
 * @param path path
 * @param rootPath root path
 * @returns key array
 */
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
 * Separate routing keys in the path
 * @param path path
 * @param rootPath root path
 * @returns route key
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
 * Obtain the true path in the route
 * @param route route
 * @returns Real path
 */
function getAppRoutePathKey(route:any){
    return route.path == '' || route.path == undefined ? route.originPath : route.path
}
/**
 * Get the menu data that matches the current path
 * @param path path
 * @returns menu data
 */
function getCurrentPathMenuData(path:string):IMenuData{
    const pathKey = getPathToKey(path)
    return WardenGlobalThis.menuMap[pathKey]
}
export {getMenuData,getPathToKey,matchPathKeys,matchPathAllKeys,getLayoutRootRoutes,getAppRoutePathKey,getCurrentPathMenuData}