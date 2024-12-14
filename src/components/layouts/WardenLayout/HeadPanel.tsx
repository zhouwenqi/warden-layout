import { Layout, Menu, theme, Tooltip, Button, MenuTheme} from 'antd';
import type { MenuProps } from 'antd';
import {history} from 'umi';
import {CompressOutlined,ExpandOutlined} from '@ant-design/icons'
import {TopLogo} from './LogoPanel';
import { useEffect,  useState } from 'react';
import { useConfigContext } from '@/context';
import { generate } from '@ant-design/colors';
import {LayoutProps} from '@/typings';
import ToolbarUserPanel from '@/components/ToolbarUserPanel';

const { Header} = Layout;
const {useToken} = theme;  

/**
 * Layout head panel
 * @param props 
 * @returns 
 * @author zhouwenqi
 * @descriptionThe head surface of the layout
 */
const HeadPanel=(props:LayoutProps.HeadProps)=>{  
    
  const {config,getDynamicProps} = useConfigContext()
  const menuTheme:MenuTheme = config.menuByPrimary && config.layoutType=="HeadMenu" ? "dark" : "light"

  // menu click event
  const onMenuClick: MenuProps['onClick'] = (e) => {
      history.push(e.key) 
  } 
  const {token} = useToken()
  const borderBottom = menuTheme == "light" ? ("solid 1px " + (config.hideBorder ? token.colorBgContainer : token.colorBorderSecondary)) : " 0"
  const headerHeight = getDynamicProps().headerHeight;

  // Set the header background style according to different layouts
  let headMaskElement = <></>  
  let headMaskClassName = "warden-layout-header"

  // logo    
  let logoElement = props.leftSilderHidden || config.layoutType=="HeadMenu" ? (<div style={{borderBottom}}><TopLogo /></div>) : <></>   
  
  if(config.layoutType == "HeadMenu"){      
    headMaskElement = <Header style={{height:headerHeight+"px", lineHeight:headerHeight+"px"}}></Header>  
    headMaskClassName += " warden-layout-header-fixed-full"
  }else{
    headMaskClassName += " warden-layout-header-fixed"
  }
  
  let boxStyle:any = {background:token.colorBgContainer}
  
  // menu style        
  let menuStyle:React.CSSProperties = {}
  if(menuTheme == "dark"){
    const primaryColors = generate(config.primaryColor)
    boxStyle = {...boxStyle, color:"white",background:primaryColors[5]}      
    menuStyle = {...menuStyle,background:primaryColors[5]}
  }
  
  if(config.hideBorder && !config.menuByPrimary){
    boxStyle = {...boxStyle,marginLeft:"1px"}
  }

  return(     
      <>   
      {headMaskElement}
      <Header className={headMaskClassName}>
          <div className='warden-layout-header-box' style={boxStyle}>
              {logoElement}
              <Menu
                  onClick={onMenuClick}
                  theme={menuTheme}
                  style={menuStyle}
                  selectedKeys={props.selectedKeys} 
                  defaultSelectedKeys={props.selectedKeys}                  
                  items={props.menuData}                    
                  className="warden-layout-header-menu warden-layout-base-menu-horizontal" 
                  mode="horizontal" />
              <div style={{borderBottom:borderBottom,padding:"0px 12px",display:"flex",justifyContent:"flex-end"}}>                    
                  <HeaderRight />
              </div> 
          </div>
      </Header>
      </>
  )
}

/**
 * 布局头部右侧内容
 * @returns 
 */
const HeaderRight=()=>{
  const {toolbarUserPanel,toolbarButtons,screenIcons} = useConfigContext()  
  return(
    <>
      {toolbarUserPanel || <ToolbarUserPanel />}
      <div style={{display:"flex",alignItems:"center",marginLeft:"10px"}}>
          {toolbarButtons}
          <FullscreenButton items={screenIcons} />                
      </div>
    </>
  )
}

/** 全屏切换Button */
const FullscreenButton=(props:{items?:JSX.Element[]})=>{
    const {config} = useConfigContext()
    const [fullScreen,setFullScreen] = useState(false)
    // 全屏模式切换
    const handleChangeFullscreen=()=>{
      setFullScreen(!!document.fullscreenElement)
    }
    // F11按键事件
    const handlerF11Key=(e:KeyboardEvent)=>{
      if(e.code==="F11"){
        e.preventDefault()
        onFullScreenHandler()
      }
    }
    useEffect(()=>{          
      document.addEventListener('fullscreenchange',handleChangeFullscreen)
      document.addEventListener('keydown',handlerF11Key,true)
      return ()=>{
        document.removeEventListener('fullscreenchange',handleChangeFullscreen)
        document.removeEventListener('keydown',handlerF11Key)
      }
    },[])
  
    // 全屏按钮点击事件
    const onFullScreenHandler=()=>{
      if(fullScreen){
        document.exitFullscreen()
      }else{
        document.documentElement.requestFullscreen()
      }
    }
    let btnStyle:React.CSSProperties = {padding:"8px"}
    if(config.menuByPrimary && (config.theme == "dark" || config.layoutType == "HeadMenu")){
      btnStyle = {...btnStyle,"color":"white"}
    }

    let icons = [<CompressOutlined />,<ExpandOutlined />]
    if(props.items){
      if(props.items[0]){
        icons[0] = props.items[0]
      }
      if(props.items[1]){
        icons[1] = props.items[1]
      }
    }
    return(
        <Button type="text" style={btnStyle} onClick={onFullScreenHandler}>
        { fullScreen ? icons[0] : icons[1] }
        </Button>
    )
}
export default HeadPanel