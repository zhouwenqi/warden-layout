import { Avatar, Button, Divider, Flex, Space, Tag, theme, Tooltip,Popover } from "antd"
import {EditOutlined,EllipsisOutlined,LogoutOutlined} from '@ant-design/icons'
import {useIntl} from 'umi'
import { useConfigContext, WardenGlobalThis } from "@/context";
const {useToken} = theme;  

/**
 * 布局toolbar中的用户信息
 * @param props 
 * @returns 
 */
const ToolbarUserPanel = (props:{popover?:JSX.Element})=>{
    const{token} = useToken()
    const {config,userPopover} = useConfigContext()
    
    const popoverPanel = userPopover || props.popover || <UserPopoverPanel />

    const user = WardenGlobalThis.currentUser

    const topDark = config.menuByPrimary && (config.theme == "dark" || config.layoutType == "HeadMenu")
    return(
        <Popover placement="bottomRight" content={popoverPanel}>
            <Space align="baseline">
                <Avatar style={{verticalAlign:'middle',background:token.colorBgLayout}} src={user?.headImgUrl} >
                    {user?.username}
                </Avatar>
                <label style={{color:topDark ? 'white' : token.colorTextTertiary}}>{user?.username}</label>
            </Space> 
      </Popover>
    )
}

/**
 * 布局头部用户信息弹出面板(demo)
 * @returns 
 */
const UserPopoverPanel=()=>{
    const{token} = useToken()
    const intl = useIntl()    
    
    const user = WardenGlobalThis.currentUser

    return(
        <div>            
            <Space direction="horizontal" align="start" >
                <Avatar src={user?.headImgUrl} size={64} style={{background:token.colorBgLayout}} />          
                <div style={{marginLeft:"8px"}}>
                <h4 style={{margin:"0", padding:"0"}}>{user?.username}</h4>
                <Flex gap={"4px 0"} style={{margin:"4px 0"}}>
                    <Tag bordered={false} color="processing">{user?.dept}</Tag>
                    <Tag bordered={false} color="cyan">{user?.post}</Tag>
                </Flex>
                <div style={{color:token.colorTextTertiary}}>
                    <label style={{color:token.colorTextLabel}}>{intl.formatMessage({id:"user.popover.usertype.label"})}：</label> <span>{user?.userType}</span><br />
                    <label style={{color:token.colorTextLabel}}>{intl.formatMessage({id:"user.popover.createdate.label"})}：</label> <span>{user?.createDate}</span><br />
                    <label style={{color:token.colorTextLabel}}>{intl.formatMessage({id:"user.popover.role.label"})}：</label> <span>{user?.roles!.join(",")}</span><br />
                    <label style={{color:token.colorTextLabel}}>E-mail：</label> <a href={user?.email} target="_blank">{user?.email}</a>
                </div>
                </div>
            </Space>      
            <Divider style={{margin:"10px 0px"}} />
            <Space direction="horizontal" split={<Divider type="vertical" />}>              
            <Tooltip title={intl.formatMessage({id:"global.button.edit"})}>
                <Button type="text"><EditOutlined /></Button>
            </Tooltip>
            <Tooltip title={intl.formatMessage({id:"global.button.exit"})}>
                <Button type="text"><LogoutOutlined /></Button>
            </Tooltip>
            <Tooltip title={intl.formatMessage({id:"global.button.more"})}>
                <Button type="text"><EllipsisOutlined /></Button>
            </Tooltip>            
            </Space>
        </div>
    )
}
export default ToolbarUserPanel
export {UserPopoverPanel}