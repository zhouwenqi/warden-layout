import { Layout, Menu, theme, Tooltip, Button, MenuTheme} from 'antd';
import type { MenuProps } from 'antd';
import {history,useParams} from 'umi';
import {CompressOutlined,ExpandOutlined} from '@ant-design/icons'
import {TopLogo} from './LogoPanel';
import { useEffect,  useState } from 'react';
import { useConfigContext } from '@/context';
import { generate } from '@ant-design/colors';
import {LayoutProps} from '@/typings';
import ToolbarUserPanel from '@/components/ToolbarUserPanel';
import {hexToRgbaString} from '@/utils/stringUtil';
import { getFillRoute } from '@/utils/routeUtil';

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
  const menuBgDark = config.menuBackgroundStyle == "black" || config.menuBackgroundStyle == "primary"
  const menuTheme:MenuTheme = menuBgDark && config.layoutType=="headMenu" ? "dark" : "light"
  const params = useParams()

  // menu click event
  const onMenuClick: MenuProps['onClick'] = (e) => {
      history.push(getFillRoute(e.key,params)) 
  } 
  const {token} = useToken()
  const borderBottom = menuTheme == "light" ? ( !config.hideBorder ? "solid 1px " +  hexToRgbaString(token.colorBorder,0.4) : "0") : " 0"
  const headerHeight = getDynamicProps().headerHeight;

  // Set the header background style according to different layouts
  let headMaskElement = <></>  
  let headMaskClassName = "warden-layout-header"
  const layoutStyle:React.CSSProperties = {
    height:headerHeight+"px",
    lineHeight:headerHeight+"px"
  }

  // logo    
  let logoElement = props.leftSilderHidden || config.layoutType=="headMenu" ? (<div><TopLogo /></div>) : <></>   
  
  if(config.layoutType == "headMenu"){      
    headMaskElement = <Header style={layoutStyle}></Header>  
    headMaskClassName += " warden-layout-header-fixed-full"
  }else{
    headMaskClassName += " warden-layout-header-fixed"
  }
  
  let boxStyle:any = {background:token.colorBgContainer,borderBottom,...layoutStyle}
  
  // menu style        
  let boxBgColor = token.colorBgContainer
  if(menuTheme == "dark"){
    const primaryColors = generate(config.primaryColor)
    boxBgColor = config.menuBackgroundStyle == "black" ? "#222222" : primaryColors[5]
  }
  
  if(config.hideBorder && config.menuBackgroundStyle=="normal" && config.layoutType=="leftMenu"){
    boxStyle = {...boxStyle,marginLeft:"1px"}
  }

  boxStyle = {
    ...boxStyle,
    background: config.headTransparent ? hexToRgbaString(boxBgColor,0.6) : boxBgColor
  }
  
  if(config.backgroundBlur){
    headMaskClassName += " warden-layout-blur"
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
                  style={{background:"transparent",border:"0"}}
                  selectedKeys={props.selectedKeys} 
                  defaultSelectedKeys={props.selectedKeys}                  
                  items={props.menuData}                    
                  className="warden-layout-header-menu warden-layout-base-menu-horizontal" 
                  mode="horizontal" />
              <div style={{padding:"0px 12px",display:"flex",justifyContent:"flex-end"}}>                    
                  <HeaderRight />
              </div> 
          </div>
      </Header>
      </>
  )
}

/**
 * layout header right panel
 * @returns 
 */
const HeaderRight=()=>{
  const {toolbarButtons,screenIcons,config} = useConfigContext()
  return(
    <>
      { config.avatarReplaceBrand ? <></> : <ToolbarUserPanel /> }
      <div style={{display:"flex",alignItems:"center",marginLeft:"10px"}}>
          {toolbarButtons}
          <FullscreenButton items={screenIcons} />                
      </div>
    </>
  )
}

/** fullscreen change button */
const FullscreenButton=(props:{items?:JSX.Element[]})=>{
    const {config} = useConfigContext()
    const fullScreenStatus = !!document.fullscreenElement    
    const [fullScreen,setFullScreen] = useState(fullScreenStatus)
    // fullscreen change mode
    const handleChangeFullscreen=()=>{
      setFullScreen(!!document.fullscreenElement)
    }
    // F11 keypress event
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
  
    // fullscreen click event
    const onFullScreenHandler=()=>{
      if(fullScreen){
        document.exitFullscreen()
      }else{
        document.documentElement.requestFullscreen()
      }
    }
    let btnStyle:React.CSSProperties = {padding:"8px",height:"inital","lineHeight":"inital"}
    const menuBgDark = config.menuBackgroundStyle == "black" || config.menuBackgroundStyle == "primary"
    if(menuBgDark && (config.theme == "dark" || config.layoutType == "headMenu")){
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