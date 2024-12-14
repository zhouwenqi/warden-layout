import { Button } from "antd"
import { useConfigContext } from "@/context"
import { ToolbarButtonProps } from "@/typings"
import SvgIcon from "./SvgIcon"

/**
 * 布局头部toolbar中的button
 * @param props 
 * @returns 
 */
const ToolbarButton = (props:ToolbarButtonProps) => {
    const {config} = useConfigContext()  
    let btnStyle:React.CSSProperties = {padding:"8px"}
    const topDark = config.menuByPrimary && (config.theme == "dark" || config.layoutType == "HeadMenu")
    if(topDark){
      btnStyle = {...btnStyle,"color":"white"}
    }

    let element = <></>
    if(props.icon){
        element = (<SvgIcon src={props.icon} width={16} height={16} style={{color:"currentcolor",verticalAlign:"middle",height:"16px",width:"16px"}} />)
    }

    return(
        <Button type="text" style={btnStyle} onClick={(e)=>{if(props.onClick){props.onClick!(e)}}}>{props.children || element}</Button>
    )
}

export default ToolbarButton