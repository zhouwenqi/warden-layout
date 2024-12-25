import {Avatar, theme,Popover} from 'antd'
import {Link,history,useIntl} from 'umi'
import { useConfigContext } from '@/context';
import AppIcon from '@/components/AppIcon';
import {LayoutProps} from '@/typings';
import SvgIcon from '@/components/SvgIcon';
import React from 'react';
const {useToken} = theme;

/**
 * Top logo panel
 * @returns 
 * @author zhouwenqi
 * @description Logo component at the top
 */
const TopLogo=()=>{    
    const intl = useIntl()
    const {config,getDynamicProps,logoPopover,logoPopoverOpen,setLogoPopoverOpen} = useConfigContext()
    const {token}  = useToken()
    let imgStyle:React.CSSProperties = {cursor:"pointer",marginLeft:"8px",fill:"currentcolor",color:"currentcolor"}
    let txtStyle:React.CSSProperties = {fontSize:"18px",fontWeight:"500",color:token.colorTextBase,margin:"0px 8px"}
    let imgSize = 36
    if(config.compact){
        imgSize = 30
        imgStyle = {...imgStyle,marginLeft:"6px"}
        txtStyle = {...txtStyle,fontSize:"16px",margin:"0px 8px 0px 6px"}
    }
    const topDark = config.menuByPrimary && config.layoutType == "HeadMenu"
    if(topDark){
        txtStyle = {...txtStyle,color:"white"}
    }

    let logoImage = <></>    
    if(config.brandLogo.indexOf("warden_") > -1){
        const iconName = config.brandLogo.split("warden_")[1]
        logoImage = <AppIcon color="currentColor" name={iconName} size={imgSize} style={imgStyle} />
    }else if(config.brandLogo.indexOf("svg_") > -1){     
        const svgSrc = config.brandLogo.split("svg_")[1]
        logoImage = <SvgIcon src={svgSrc} style={{...imgStyle,width:imgSize+"px",height:imgSize+"px"}} width={imgSize} height={imgSize} color="currentColor" fill="currentColor" />
    }
    else{
        logoImage = <Avatar src={config.brandLogo} size={imgSize} />
    }
    const brandTitle = config.localeEnabled ? intl.formatMessage({id:config.brandTitle}) : config.brandTitle
    return(
        <div style={{display:"flex",color:topDark ? "white" : token.colorPrimary,alignItems:"center", alignContent:"center", width: getDynamicProps().leftWidth + "px"}}>            
            <Popover open={logoPopoverOpen} onOpenChange={setLogoPopoverOpen} placement="rightTop" content={logoPopover}>       
            <a style={{color:"currentcolor"}} onClick={()=>{history.push(config.logoNavigateRoute || '/')}}>{logoImage}</a>
            </Popover>
            <Link to={config.logoNavigateRoute || '/'} style={txtStyle}>{brandTitle}</Link>           
        </div>
    )
}

/**
 * left logo panel
 * @param props 
 * @returns 
 * @author zhouwenqi
 * @description The larger logo on the left
 */
const LeftLogo=(props:LayoutProps.LogoProps)=>{
    const {config,getDynamicProps,logoPopover,logoPopoverOpen,setLogoPopoverOpen} = useConfigContext()
    const {token}  = useToken()    
    const intl = useIntl()
    let boxPd = "46px 0px"
    let txtStyle = {fontSize:"18px",fontWeight:"500", color:token.colorTextBase}

    if(config.compact){
        txtStyle = {...txtStyle, fontSize:"16px"}
        boxPd = "30px 0px"
    }
    if(props.collapsed){
        boxPd = "10px 0px"
    }

    let boxStyle:React.CSSProperties = {
        display:"flex",
        flexDirection:"column",
        justifyItems:"center", 
        justifyContent:"center", 
        textAlign:"center",
        alignItems:"center", 
        padding:boxPd,
        minHeight:getDynamicProps().headerHeight + "px",   
        color: token.colorPrimary
    }

    if(config.menuByPrimary){
        txtStyle = {...txtStyle,color:"white"}
        boxStyle = {...boxStyle,color:"white",borderRight:"0"}
    }

    let imgStyle:React.CSSProperties={
        cursor:"pointer"
    }
    const imgSize = props.collapsed ? 30 : 90
    let logoImage = <></>
    if(config.brandLogo.indexOf("warden_") > -1){
        const iconName = config.brandLogo.split("warden_")[1]
        logoImage = <AppIcon color="currentColor" name={iconName} size={imgSize} style={imgStyle} />
    }else if(config.brandLogo.indexOf("svg_") > -1){     
        const svgSrc = config.brandLogo.split("svg_")[1]
        logoImage = <SvgIcon src={svgSrc} style={{...imgStyle,width:imgSize+"px",height:imgSize+"px"}} width={imgSize} height={imgSize} color="currentColor" fill="currentColor" />
    }else{
        logoImage = <Avatar src={config.brandLogo} size={imgSize} />
    }
    const brandTitle = config.localeEnabled ? intl.formatMessage({id:config.brandTitle}) : config.brandTitle
    return(
        <div style={boxStyle}>            
            <Popover open={logoPopoverOpen} onOpenChange={setLogoPopoverOpen} placement="rightTop" content={logoPopover}>       
            <a style={{color:"currentcolor"}} onClick={()=>{history.push(config.logoNavigateRoute || '/')}}>{logoImage}</a>
            </Popover>
            {props.collapsed ? <></> : <Link to={config.logoNavigateRoute || '/'} style={txtStyle}>{brandTitle}</Link>}
        </div>
    )
}

export {TopLogo,LeftLogo}