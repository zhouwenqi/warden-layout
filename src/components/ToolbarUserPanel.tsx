import { Avatar, Space,  theme, Popover } from "antd"
import { useConfigContext, WardenGlobalThis } from "@/context";
const {useToken} = theme;  

/**
 * ToolbarUserPanel
 * @param props 
 * @returns 
 * @author zhouwenqi
 * @description Component for displaying head user information
 */
const ToolbarUserPanel = (props:{popover?:JSX.Element})=>{
    const{token} = useToken()
    const {config,userPopover} = useConfigContext()
    
    const popoverPanel = userPopover || props.popover

    const user = WardenGlobalThis.currentUser

    const topDark = config.menuByPrimary && (config.theme == "dark" || config.layoutType == "headMenu")
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

export default ToolbarUserPanel