import { Menu,Layout, theme } from "antd";
import type { MenuProps, MenuTheme } from "antd";
import {history,useRouteData} from "umi";
import Icon,{
  } from '@ant-design/icons';
import { useRef, useEffect, useState} from "react";
import { useConfigContext, WardenGlobalThis } from "@/context";
import { IconLeft, IconRight } from "@/components/SvgIcon";
import {LeftLogo} from "./LogoPanel";
import { generate } from '@ant-design/colors';
import {LayoutProps} from '@/typings'
import { getAppRoutePathKey } from "@/utils/routeUtil";
import {hexToRgbaString} from '@/utils/stringUtil';
const {Sider} = Layout;
const {useToken} = theme;

/**
 * Layout left panel
 * @param props 
 * @returns 
 * @author zhouwenqi
 * @description Layout of the left side panel
 */
const LeftPanel=(props:LayoutProps.LeftProps)=>{    
  const{token}=useToken()
  const {config,getDynamicProps,leftExpandPanel} = useConfigContext()
  const defaultOpenKeysRef = useRef<string[]>([]);
  defaultOpenKeysRef.current = props.openerKeys;
  const [openKeys, setOpenKeys] = useState(props.openerKeys);
  const [collapsed, setCollapsed] = useState(false);
  const configKey= getAppRoutePathKey(useRouteData().route)  
  const dynamicProps = getDynamicProps()

  // Silding menu bar width
  const siderWidth = dynamicProps.leftWidth

  // Folding width
  const collapsedWidth = config.compact ? 46 : 50;

  // Menu folding and switching
  const collapsedToggle=(clientWidth:number)=>{

    if(WardenGlobalThis.handFoldMap[configKey]){
        return
    }

    if(clientWidth<1200 && !collapsed){
      setCollapsed(true)
    }

    if(clientWidth>=1200 && collapsed){
        setCollapsed(false)
        WardenGlobalThis.handFoldMap[configKey] = false
    }
  }

  let menuData = props.menuData
  if(config.rootItemMenuGroup){
    menuData.forEach((item,index)=>{
      if(item.children){
        item.type="group"
      }
    })
  }

  // Manual folding
  const onHandCollapse=(value:boolean)=>{
      setCollapsed(value)    
      WardenGlobalThis.handFoldMap[configKey] = value
      setOpenKeys(defaultOpenKeysRef.current)
  }

  useEffect(() => {
    if(JSON.stringify(openKeys) != JSON.stringify(props.openerKeys)){
      setOpenKeys(props.openerKeys)
    }
    collapsedToggle(document.body.clientWidth)
  }, [props.openerKeys])

  useEffect(()=>{

  },[openKeys])
  
  // menu click event
  const onMenuClick: MenuProps['onClick'] = (e) => {   
      history.push(e.key) 
  } 
  // window change size event
  const windowResizeHandler=()=>{    
    collapsedToggle(document.body.clientWidth)       
  }
  useEffect(()=>{
    window.addEventListener('resize',windowResizeHandler)  
    return ()=>{
      window.removeEventListener('resize',windowResizeHandler)
    }
  },[collapsed])

  // Sliding menu bar style
  let siderTheme = config.theme
  const collapseBtnStyle = config.compact ? {fontSize:"16px"} : {fontSize:"18px"}

  // silder style
  const siderHeight = config.layoutType == "headMenu" ? "calc(100% - " + dynamicProps.headerHeight + "px)" : "100%"
  const siderBlockStart = config.layoutType == "headMenu" ? (config.hideBorder ? dynamicProps.headerHeight + 1 : dynamicProps.headerHeight) : 0
  let siderClass="warden-layout-sider"


  let siderBgColor = token.colorBgContainer

  let siderStyle:React.CSSProperties = {
    position: 'fixed',
    width:siderWidth + 'px',
    height:siderHeight,
    insetBlockStart:siderBlockStart + 'px'    
  }

  // menu style
  let collapseStyle:React.CSSProperties = { display: 'block', textAlign: 'right', paddingRight: '16px', borderRight:'solid 1px '+ (config.hideBorder ? hexToRgbaString(token.colorBgContainer,0.06) : hexToRgbaString(token.colorBorderSecondary,0.06)), background: "transparent"}
  let menuTheme:MenuTheme = config.menuByPrimary && config.layoutType == "leftMenu" ? "dark" : "light"
  let menuStyle:React.CSSProperties = {border:"0",background:"transparent"}
  let borderRight = menuTheme == "light" ? ( !config.hideBorder ? "solid 1px " +  hexToRgbaString(token.colorBorder,0.4) : "0") : " 0"

  if(menuTheme == "dark"){
    const primaryColros = generate(config.primaryColor)
    siderTheme="dark"
    siderBgColor = primaryColros[5]      
    collapseStyle = {...collapseStyle, borderRight:"0"}
  }

  siderStyle = {
    ...siderStyle,
    background:config.leftTransparent ? hexToRgbaString(siderBgColor,0.6) : siderBgColor,
    borderRight
  }

  if(config.backgroundBlur){
    siderClass += " warden-layout-blur"
  }
  
  // Menu indentation button
  const collapsedMenu: JSX.Element = (
      <div style={collapseStyle}>
        {collapsed ? <Icon component={IconLeft} style={collapseBtnStyle} />: <Icon component={IconRight} style={collapseBtnStyle} />}
      </div>
  )

  
  return(      
      <>    
        <div
            style={{
            width: collapsed ? collapsedWidth : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? collapsedWidth : siderWidth}px`,
            maxWidth: collapsed ? collapsedWidth : siderWidth,
            minWidth: collapsed ? collapsedWidth : siderWidth,
            transition:
                'background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
            }}
            ></div>
        <Sider className={siderClass}
          width={siderWidth}
          collapsedWidth={collapsedWidth} 
          collapsible collapsed={collapsed} 
          onCollapse={onHandCollapse}
          trigger={collapsedMenu} 
          theme={siderTheme}          
          style={siderStyle}>
              {collapsed || !leftExpandPanel ? <></> : <div className="warden-layout-left-expand-panel" style={{padding:config.compact ? "12px" : "16px"}}>
                  {leftExpandPanel}
                </div>  }
              {config.layoutType == "leftMenu" ? <LeftLogo collapsed={collapsed} /> : <></>}
              <div className={menuTheme == "dark" ? "warden-layout-left-box-dark" : "warden-layout-left-box"}>
                <Menu onClick={onMenuClick}
                  onOpenChange={(e) => {   
                    setOpenKeys(e);
                  }}
                  mode = {config.leftMenuInline ? "inline" : "vertical"}
                  theme={menuTheme}
                  style={menuStyle}
                  items={menuData}                
                  selectedKeys={props.selectedKeys} 
                  openKeys={ collapsed ? undefined : openKeys} 
                  defaultSelectedKeys={props.selectedKeys}
                  defaultOpenKeys={defaultOpenKeysRef.current}
                  className="warden-layout-sider-menu warden-layout-base-menu-inline">
                </Menu>                  
            </div>
        </Sider>
      </>
      
  )
}
export default LeftPanel;