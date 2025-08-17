import React from 'react';
import * as AntIcon from '@ant-design/icons';
import { getPathToKey } from './routeUtil';
import AppIcon from '@/components/AppIcon';
import { hasAuthority,hasAccess } from './securityUtil';
import { Badge,Tag,Space } from 'antd';
import {Icon} from 'umi';
import {IMenuData,IAntMenuData,IconType} from '../typings';
import { WardenGlobalThis } from '../context';
import SvgIcon from '@/components/SvgIcon';
import { IntlShape } from "react-intl";

/**
 * Convert the entire Antd menu data
 * @param menuData menu data
 * @returns ant menu
 */
const getAntdMenus=(menuData:IMenuData[],menuKeys:string[])=>{ 
  let antdMenuItemDatas:IAntMenuData[]=[]
  if(menuData == undefined || menuData.length <= 0){
    return undefined
  }
  menuData.forEach((item)=>{
    const access = hasAccess(item.access)
      let authory= true    
      if(item.authorities){
        authory = hasAuthority(item.authorities)
      }
      if(access && authory){ 
        const menuItemData = getAntdMenuItem(item,menuKeys)
        menuItemData.children = getAntdMenus(item.items!,menuKeys)
        antdMenuItemDatas.push(menuItemData)
      }
  })
  return antdMenuItemDatas
}

/**
* Convert individual Antd menu data
* @param menuData Single menu data
* @returns ant menu
*/
const getAntdMenuItem=(menuData:IMenuData,menuKeys:string[]) => {     
    let menuItem:any = menuData.name;
    let extraItems:React.ReactNode[] = []
    if(menuData.badge){
      if(typeof menuData.badge === "string"){       
        extraItems.push(<Badge key="badge" count={ menuData.badge} />)        
      }else{
        const {position="right", count, dot=false, status, text} = menuData.badge    
        if(position == "left"){
          menuItem = <Badge styles={{root:{color:"inherit"}}} dot={dot} text={text} status={status} count={count!}>{menuData.name}</Badge>
        }else{
          extraItems.push(<Badge key="badge" dot={dot} text={text} status={status} count={ count!} />)
        }
       
      }
      
    }
    if(menuData.tag){
      const tagObject = menuData.tag
      if(typeof tagObject === "string"){  
        extraItems.push(<Tag key="tag">{tagObject}</Tag>)
      }else{
        const {color,text,bordered} = tagObject
        extraItems.push(<Tag key="tag" color={color} bordered={bordered} >{text}</Tag>)
      }
      
    }
  
  const extraPanel = extraItems.length > 0 ? <Space style={{margin:"0px 2px",height:"inherit"}}>{extraItems}</Space> : undefined
  const antdMenu:IAntMenuData = {
      label:menuItem,
      key:menuData.path,
      children:undefined,
      extra:extraPanel,
      icon:getMenuIcon(menuData,menuKeys)
  }
  return antdMenu
}

/**
* splie menu
* @param antdMenus Original menu
* @param selectdKeys Select the key value in the menu
* @returns Main menu, submenu
*/
const getSplitAntdMenus=(antdMenus?:IAntMenuData[],selectdKeys?:string[])=>{    
  let rootMenus:IAntMenuData[]=[]
  let childMenus:IAntMenuData[]=[]
  antdMenus?.forEach((item)=>{
      if(item.key == selectdKeys![0]){
          childMenus = item.children ? item.children : []
      }
      const menu = item
      menu.children = undefined
      rootMenus.push(menu)
  })    
  
  return {
      rootMenus,childMenus
  }
}

/**
 * Get a path menu data
 * @param keys keys
 * @returns menu data
 */
const getMapMenus=(keys:string[])=>{  
  let menus:IMenuData[]=[]
  if(keys && keys.length>0){
    keys.forEach((k)=>{      
      const menu:IMenuData = WardenGlobalThis.menuMap[getPathToKey(k)]     
      if(menu) {
        menus.push(menu)
      }      
    })
  }
  return menus
}

/**
 * Obtain breadcrumb data
 * @param keys keys
 * @returns menu data
 */
const getBreadcrumbData=(keys:string[])=>{
  let data:any[]=[]
  if(keys && keys.length>0){
    keys.forEach((k,index)=>{    
      const menu:IAntMenuData = WardenGlobalThis.menuMap[k]
      if(menu){
        data.push({
          label:menu.label,
          key:'breadcrumb'+index
        })
      }
    })
  }
  return data
}

/**
* Get menu icon component
* @param item menu item
* @returns icon
*/
/**
 * 获取菜单图标组件
 * @param item 单个菜单数据
 * @returns 
 */
const getMenuIcon=(item:IMenuData,menuKeys:string[])=> {
  const useMenuIconVariant = WardenGlobalThis.userMap["config.menuIconVariant"]
  
  let icon: React.ReactNode = undefined;
  if(!item || !item.iconName){
    return icon
  }
  const iconArr: string[] = item.iconName ? item.iconName.split('@') : [];
 
  let iconPrefix: IconType = 'ant';
  let iconName: string = '';
  // let prefix = item.iconName?.substring(0,item.iconName?.indexOf(":"))  
  // let iconType: IconType = prefix == '' ? 'ant' : (prefix as IconType)
  if (iconArr.length > 1) {
    iconPrefix = iconArr[0] as IconType;
    iconName = iconArr[1];
  } else if (iconArr.length == 1) {
    iconName = iconArr[0];
  }


  if(useMenuIconVariant){
    const variantType = typeof useMenuIconVariant
    let iconFilled = "Filled"
    let iconOutlined = "Outlined"
    if(variantType == "object"){
      const menuIconVariant = useMenuIconVariant as string[]
      if(menuIconVariant.length>0){
        iconOutlined = menuIconVariant[0]
      }
      if(menuIconVariant.length>1){
        iconFilled = menuIconVariant[1]
      }
    }   
    if(menuKeys.includes(item.path)){
      iconName += iconFilled
    }else{
      iconName += iconOutlined
    }
    if(iconPrefix=="svg"){
      iconName+=".svg"
    }      
  }
  
  if (iconName) {
    switch (iconPrefix) {
      default:
      case 'ant':
        if((AntIcon as any)[iconName]){
            icon = React.createElement(AntIcon && (AntIcon as any)[iconName], {
              style: { fontSize: '16px' },
            });  
        } 
        break;
      case 'umi':        
        icon = (<Icon icon={`local:${iconName}`} width="16" height="16" />)
        break
      case 'warden':    
        icon = (<span className='anticon ant-menu-item-icon' style={{fontSize:"16px",width:"16px",height:"16px"}}><AppIcon size={16} name={iconName} color="currentColor" /></span>)
        break;
      case 'svg':
        icon = (<span className='anticon ant-menu-item-icon' style={{fontSize:"16px",width:"16px",height:"16px"}}><SvgIcon src={iconName} width={16} height={16} /></span> )
        break;
    }
  }
  
  return icon
}

// Traverse and modify menu extensions
function modifyMenuExtras(
  tree: IMenuData[],
  key: "key"|"path"|"name",
  value: string,
  modifier: (node: IMenuData) => void
): IMenuData[] {
  const newTree = [...tree];

  for (const node of newTree) {
    if (node[key] === value) {
      modifier(node);
      console.log(node);
      return newTree;
    }

    if (node.items && node.items.length > 0) {
      const modifiedItems = modifyMenuExtras(node.items, key, value, modifier);
      if (modifiedItems !== node.items) {
        node.items = modifiedItems;
        return newTree;
      }
    }
  }
  return newTree;
}

/**
 * menu locale
 * @param menuData  menu data
 * @param intl intlShape
 * @returns 
 */
function getMenuLocale(menuData:IMenuData[],intl?:IntlShape):IMenuData[]{
    
    return menuData.map(menu=>({
      ...menu,
      name:intl ? intl.formatMessage({id:getPathToKey(menu.path.replace(/-|:[^/]*/g, ''))}) || menu.name : menu.name,
      items:menu.items ? getMenuLocale(menu.items,intl) : undefined
    }))
}
export {getAntdMenus,getAntdMenuItem,getSplitAntdMenus,getMapMenus,getBreadcrumbData,modifyMenuExtras,getMenuLocale}