import { Avatar, theme, Popover } from "antd"
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
    const {config,avatarPopover,avatarPopoverOpen,setAvatarPopoverOpen} = useConfigContext()
    
    const popoverPanel = avatarPopover || props.popover

    const user = WardenGlobalThis.currentUser

    const topDark = config.menuByPrimary && (config.theme == "dark" || config.layoutType == "headMenu")
    return(
        <Popover placement="bottomRight" open={avatarPopoverOpen} onOpenChange={setAvatarPopoverOpen} content={popoverPanel}>
            <div style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
                <Avatar style={{verticalAlign:'middle',background:token.colorBgLayout,lineHeight:"1rem"}} src={user?.headImgUrl} >
                    {user?.username}
                </Avatar>
                <label style={{color:topDark ? 'white' : token.colorTextTertiary,lineHeight:"1rem",marginLeft:"10px"}}>{user?.username}</label>
            </div> 
      </Popover>
    )
}

export default ToolbarUserPanel