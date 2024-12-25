import { Drawer, FloatButton, Space,Segmented,Tooltip, theme, Divider, Switch,Button,Radio,App } from "antd"
import { LayoutOutlined,LaptopOutlined,InfoCircleOutlined,SunOutlined, MoonOutlined } from '@ant-design/icons';
import type {RadioChangeEvent} from 'antd'
import { useState } from "react"
import {useIntl} from 'react-intl'
import {getLocale,setLocale} from 'umi'
import './SettingDrawer.less'
import AppIcon from "../AppIcon";
import { Languages, ThemeColors } from "./ConfigData";
import { useConfigContext,WardenGlobalThis } from "@/context";
import {Warden,ColorBoxGroupProps,ColorBoxProps,LayoutGroupProps} from '@/typings';
import copy from 'copy-to-clipboard';

const {useToken} = theme

/**
 * Setting drawer
 * @returns component
 * @author zhouwenqi
 * @description Components used to configure the entire layout in a development environment
 */
const SettingDrawer=()=>{
  const intl = useIntl()
  const locale = getLocale()
  const  appStatic = App.useApp()
  const [open,setOpen] = useState(false)
  const {config,setConfig} = useConfigContext()
  const [colorMode,setColorMode]=useState(config.menuSkin ? "skin" : "color")

  // select theme event
  const onChangeTheme = (value:string)=>{
      if(value=='auto'){
        setConfig({...config,systemTheme:true})   
      }else{
        setConfig({...config,theme:value as Warden.Theme, systemTheme:false})   
      }  
  }

  
  // select layout event
  const onChangeMainLayoutHandler=(layoutType:Warden.LayoutType)=>{
    setConfig({...config,layoutType:layoutType})
  }

  // select color event
  const onSelectColorHandler=(color:string)=>{
    setConfig({
      ...config,
      primaryColor:color,
      menuSkin:undefined,
      menuTransparent:false,
      backgroundBlur:false
    })  
  }

  // select lanages event
  const onChnageLanguageHandler=(value:string)=>{      
    WardenGlobalThis.menuData={}
    setLocale(value,false)
  }
  // copy configuration
  const onCopyHandler = () => {
    copy(JSON.stringify(config))
    appStatic.message.success(intl.formatMessage({ id: 'config.setting.copy.success' }))
  }

  const selectThemeValue = config.systemTheme ? 'auto' : config.theme
  let languages:any[] = []
 
  Languages.forEach((region,index)=>{
    languages.push({
      label:region.name,
      value:region.language
    })
  })

  const skinKeys:string[] = Object.keys(WardenGlobalThis.skinsMap)
    const colorModePanel = colorMode == "skin" ? (<SkinGroupBox />) : (<Space><ColorBoxGroup
      color={config.primaryColor}
      onSelect={onSelectColorHandler}
    /></Space>)
  

  return(
      <>
      <FloatButton tooltip={intl.formatMessage({id:"config.setting.drawer.title"})} onClick={()=>{setOpen(true)}} icon={<LayoutOutlined />}></FloatButton>
      <Drawer 
      title={intl.formatMessage({id:"config.setting.drawer.title"})}
      placement="right"
      open={open}
      onClose={()=>{setOpen(false)}}
      footer={(<Space><Button onClick={()=>{onCopyHandler()}} type="primary">{intl.formatMessage({id:"config.setting.button.copy"})}</Button></Space>)}
    >
      <div className="wardenSettingLabelBox">            
          <label>{intl.formatMessage({id:"config.setting.theme.mode.title"})}</label>
          <Segmented
              defaultValue={selectThemeValue}
              onChange={onChangeTheme}
              options={[
                  { value: 'light', icon: <SunOutlined /> },
                  { value: 'dark', icon: <MoonOutlined /> },
                  { value: 'auto', icon:<LaptopOutlined />}
              ]}
              />            
      </div>
      <div className="wardenSettingLabelBox">            
          <label>{intl.formatMessage({id:"config.setting.main.layout.title"})}</label>
          <MainLayoutGroup
            layout={config.layoutType}
            onSelect={onChangeMainLayoutHandler}
          />
      </div>
      <div className="wardenSettingLabelBox">
          <Space style={{marginBottom:"8px"}}>
            <Radio.Group onChange={(e:RadioChangeEvent)=>{setColorMode(e.target.value)}} value={colorMode}>
              <Radio value="color">{intl.formatMessage({id:"config.setting.theme.color.title"})}</Radio>
              <Radio value="skin" disabled={skinKeys.length < 1}>{intl.formatMessage({id:"config.setting.skin.title"})}</Radio>
            </Radio.Group>              
          </Space>            
          {colorModePanel}       
      </div>    
      <div className="wardenSettingLabelBox">            
          <label>{intl.formatMessage({id:"config.setting.language.title"})}</label>
          <Segmented
              defaultValue={locale}
              onChange={onChnageLanguageHandler}
              options={languages}
              />            
      </div>
      <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.menuTransparent.title"})}</label>
            <Switch defaultChecked={config.menuTransparent} checked={config.menuTransparent} onChange={(value:boolean)=>{setConfig({...config,menuTransparent:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.containerTransparent.title"})}</label>
            <Switch defaultChecked={config.containerTransparent} checked={config.containerTransparent} onChange={(value:boolean)=>{setConfig({...config,containerTransparent:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.backgroundBlur.title"})}</label>
            <Switch defaultChecked={config.backgroundBlur} checked={config.backgroundBlur} onChange={(value:boolean)=>{setConfig({...config,backgroundBlur:value})}} />   
        </Space>
      <Divider />
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.menuPrimaryColor.title"})}</label>
            <Switch defaultChecked={config.menuByPrimary} checked={config.menuByPrimary} onChange={(value:boolean)=>{setConfig({...config,menuByPrimary:value})}} />   
        </Space>        
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.splitmenu.title"})}</label>
            <Switch checked={config.menuSplit} defaultChecked={config.menuSplit} onChange={(value:boolean)=>{setConfig({...config,menuSplit:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.compactLayout.title"})}</label>
            <Switch defaultChecked={config.compact} checked={config.compact} onChange={(value:boolean)=>{setConfig({...config,compact:value})}} />   
        </Space>          
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.hideBorder.title"})}</label>
            <Switch checked={config.hideBorder} defaultChecked={config.hideBorder} onChange={(value:boolean)=>{setConfig({...config,hideBorder:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.leftEmptyHidden.title"})}</label>
            <Switch checked={config.leftEmptyHidden} defaultChecked={config.leftEmptyHidden} onChange={(value:boolean)=>{setConfig({...config,leftEmptyHidden:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.leftItemTransparent.title"})}</label>
            <Switch checked={config.subItemMenuTransparent} defaultChecked={config.subItemMenuTransparent} onChange={(value:boolean)=>{setConfig({...config,subItemMenuTransparent:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.leftMenuInline.title"})}</label>
            <Switch checked={config.leftMenuInline} defaultChecked={config.leftMenuInline} onChange={(value:boolean)=>{setConfig({...config,leftMenuInline:value})}} />   
        </Space>
        <Space  className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.leftRootGroup.title"})}</label>
            <Switch checked={config.rootItemMenuGroup} defaultChecked={config.rootItemMenuGroup} onChange={(value:boolean)=>{setConfig({...config,rootItemMenuGroup:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.hideFooter.title"})} <Tooltip title={intl.formatMessage({id:"config.setting.needContainer.alert.message"})}><InfoCircleOutlined /></Tooltip> </label>
            <Switch checked={config.hideFooter} defaultChecked={config.hideFooter} onChange={(value:boolean)=>{setConfig({...config,hideFooter:value})}} />   
        </Space>
        <Space  className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.hideBreadcrumb.title"})} <Tooltip title={intl.formatMessage({id:"config.setting.needContainer.alert.message"})}><InfoCircleOutlined /></Tooltip> </label>
            <Switch checked={config.hideBreadcrumb} defaultChecked={config.hideBreadcrumb} onChange={(value:boolean)=>{setConfig({...config,hideBreadcrumb:value})}} />   
        </Space>
        <Space className="wardenSettingSwitchBox">
            <label>{intl.formatMessage({id:"config.setting.hideTitle.title"})} <Tooltip title={intl.formatMessage({id:"config.setting.needContainer.alert.message"})}><InfoCircleOutlined /></Tooltip> </label>
            <Switch checked={config.hideTitleBar} defaultChecked={config.hideTitleBar} onChange={(value:boolean)=>{setConfig({...config,hideTitleBar:value})}} />   
        </Space>          
      </Drawer>
      </>
  )
}

/**
* 主体布局选择
* @param props 主体布局参数
* @returns
*/
const MainLayoutGroup = (props: LayoutGroupProps) => {
  const intl = useIntl();
  let itemStyle1 = 'wardenSettingLayoutBoxItem' + ' ' + 'wardenSettingLayoutHeadMenu';
  let itemStyle2 = 'wardenSettingLayoutBoxItem' + ' ' + 'wardenSettingLayoutLeftMenu';
  switch (props.layout) {
    case 'LeftMenu':
      itemStyle2 += ' ' + 'wardenSettingItemChecked';
      break;
    case 'HeadMenu':
    default:
      itemStyle1 += ' ' + 'wardenSettingItemChecked';
      break;
  }

  return (
    <>
      <div className="wardenSettingLayoutBoxGroup">
        <Tooltip
          title={intl.formatMessage({ id: 'config.layout.main.dark.top' })}
        >
          <div
            className={itemStyle1}
            style={{color:useToken().token.colorPrimary}}
            onClick={() => {
              props.onSelect('HeadMenu');
            }}
          >
            <AppIcon name="checked" size={14} key="topchecked" />
          </div>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({ id: 'config.layout.main.dark.left' })}
        >
          <div
            className={itemStyle2}
            style={{color:useToken().token.colorPrimary}}
            onClick={() => {
              props.onSelect('LeftMenu');
            }}
          >
            <AppIcon name="checked" size={14} key="leftchecked" />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

/**
* Theme color selector
* @param props Color parameters
* @returns
*/
const ColorBoxGroup = (props: ColorBoxGroupProps) => {
  let elements: JSX.Element[] = []   
  const intl = useIntl() 
  // init colors
  ThemeColors.forEach((item, index) => {
    item.name = intl.formatMessage({ id: item.id });
    elements.push(
      <ColorBox
        selected={item.color == props.color}
        key={'coloritem' + index}
        color={item.color}
        name={item.name}
        onSelectItem={(color: string) => {
          props.onSelect(color);
        }}
      />
    )      
  })   
  return (
    <>
      <div className="wardenSettingColorBoxGroup">{elements}</div>
    </>
  )
}

/**
* color component
* @param props 
* @returns 
*/
const ColorBox = (props: ColorBoxProps) => {
  let cls = 'wardenSettingColorBoxItem';
  if (props.selected) {
    cls += ' ' + 'wardenSettingColorBoxSelected';
  }
  const sty = {
    backgroundColor: props.color,
  }
  return (
    <Tooltip title={props.name}>
      <label
        onClick={() => {
          props.onSelectItem(props.color);
        }}
        className={cls}
        style={sty}
      >
        <AppIcon name="checked" size={12} />
      </label>
    </Tooltip>
  )
}
/**
 * skin group
 * @returns 
 */
const SkinGroupBox=()=>{
  const {config,setConfig} = useConfigContext()
  const onSelectHandler=(e:Warden.IMenuSkin)=>{
    setConfig({...config,
      menuSkin:e.name,
      primaryColor:e.primaryColor,
      systemTheme:false,
      theme:e.theme || config.theme,
      layoutType:e.layoutType || config.layoutType,
      menuTransparent:true,
      containerTransparent:true,
      menuByPrimary:e.menuByPrimary ?? config.menuByPrimary
    })
  }

  const keys:string[] = Object.keys(WardenGlobalThis.skinsMap)
  let items:JSX.Element[]=[]
  keys.forEach((k,i)=>{
    const item = WardenGlobalThis.skinsMap[k]
    items.push(<SkinBox onSelect={onSelectHandler} key={"skin"+i} skin={item} selected={item.name == config.menuSkin} />)
  })
  return(
    <Space wrap>
      {items}
    </Space>
  )
}

/**
 * skin
 * @param props 
 * @returns 
 */
const SkinBox=(props:{skin:Warden.IMenuSkin,selected:boolean,onSelect:(value:Warden.IMenuSkin)=>void})=>{
  const borderStyle = "2px solid " + (props.selected ? useToken().token.colorPrimary : useToken().token.colorBgLayout)

  let boxStyle:React.CSSProperties ={
    background: useToken().token.colorBgLayout,
    border:borderStyle    
  }  

  return(
    <div onClick={()=>{props.onSelect(props.skin)}} style={boxStyle} className="layoutSkinBoxItem">
      <img src={props.skin.icon} alt={props.skin.name} /><br />
      <span>
        {props.skin.label || props.skin.name}
      </span>
    </div>)
}

export default SettingDrawer