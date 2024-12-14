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
const {Sider} = Layout;
const {useToken} = theme;

const LeftPanel=(props:LayoutProps.LeftProps)=>{    
  const{token}=useToken()
  const {config,getDynamicProps} = useConfigContext()
  const defaultOpenKeysRef = useRef<string[]>([]);
  defaultOpenKeysRef.current = props.openerKeys;
  const [openKeys, setOpenKeys] = useState(props.openerKeys);
  const [collapsed, setCollapsed] = useState(false);
  
  const configKey= getAppRoutePathKey(useRouteData().route)  
  const dynamicProps = getDynamicProps()
  // 滑动菜单栏宽度
  const sliderWidth = dynamicProps.leftWidth
  // 折叠后的宽度
  const collapsedWidth = config.compact ? 46 : 50;

  // 菜单折叠切换
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

  // 手动折叠
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
  
  // 菜单点击事件
  const onMenuClick: MenuProps['onClick'] = (e) => {   
      history.push(e.key) 
  } 
  // window改变大小事件
  const windowResizeHandler=()=>{    
    collapsedToggle(document.body.clientWidth)       
  }
  useEffect(()=>{
    window.addEventListener('resize',windowResizeHandler)  
    return ()=>{
      window.removeEventListener('resize',windowResizeHandler)
    }
  },[collapsed])

  // 滑动菜单栏风格
  let silderTheme = config.theme
  const collapseBtnStyle = config.compact ? {fontSize:"16px"} : {fontSize:"18px"}

  // silder style
  const silderHeight = config.layoutType == "HeadMenu" ? "calc(100% - " + dynamicProps.headerHeight + "px)" : "100%"
  const silderBlockStart = config.layoutType == "HeadMenu" ? dynamicProps.headerHeight : 0

  let silderStyle:React.CSSProperties = {
    position: 'fixed',
    width:sliderWidth + 'px',
    height:silderHeight,
    insetBlockStart:silderBlockStart + 'px',
    background: 'transparent'
  }

  // menu style
  let collapseStyle:React.CSSProperties = { display: 'block', textAlign: 'right', paddingRight: '16px', borderRight:'solid 1px '+ (config.hideBorder ? token.colorBgContainer : token.colorBorderSecondary), background: token.colorBgContainer }
  let menuTheme:MenuTheme = config.menuByPrimary && config.layoutType == "LeftMenu" ? "dark" : "light"
  let menuStyle:React.CSSProperties = {border:"0"}

  if(menuTheme == "dark"){
    const primaryColros = generate(config.primaryColor)
    menuStyle = {background:primaryColros[5]}
    silderTheme="dark"
    collapseStyle = {...collapseStyle, background:primaryColros[5], borderRight:"0"}
  }
  
  // 菜单缩进按钮
  const collapsedMenu: JSX.Element = (
      <div style={collapseStyle}>
        {collapsed ? <Icon component={IconLeft} style={collapseBtnStyle} />: <Icon component={IconRight} style={collapseBtnStyle} />}
      </div>
  )

  let leftBoxStyle:React.CSSProperties = {
    borderRight:"solid 1px " + (config.hideBorder ? token.colorBgContainer : token.colorBorderSecondary)
  }
  if(config.menuByPrimary && config.layoutType=="LeftMenu"){
    leftBoxStyle = {
      borderRight:"solid 1px "+ config.primaryColor
    }
  }
  if(config.hideBorder){
    leftBoxStyle = {
      borderRight:"0"
    }
    if(!config.menuByPrimary && config.layoutType == "HeadMenu"){
      leftBoxStyle = {
        marginTop:"1px"
      }
    }
  }
  
  return(      
      <>    
        <div
          style={{
          width: collapsed ? collapsedWidth : sliderWidth,
          overflow: 'hidden',
          flex: `0 0 ${collapsed ? collapsedWidth : sliderWidth}px`,
          maxWidth: collapsed ? collapsedWidth : sliderWidth,
          minWidth: collapsed ? collapsedWidth : sliderWidth,
          transition:
              'background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          }}
          ></div>
        <Sider className="warden-layout-sider"
          width={sliderWidth}
          collapsedWidth={collapsedWidth} 
          collapsible collapsed={collapsed} 
          onCollapse={onHandCollapse}
          trigger={collapsedMenu} 
          theme={silderTheme}          
          style={silderStyle}>
              {config.layoutType == "LeftMenu" ? <LeftLogo collapsed={collapsed} /> : <></>}
              <div className={menuTheme == "dark" ? "warden-layout-left-box-dark" : "warden-layout-left-box"} style={leftBoxStyle}>
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