
import SvgIcon from "./SvgIcon"
import { ToolbarLinkProps } from "@/typings"

const ToolbarLink=(props:ToolbarLinkProps)=>{
    let linkStyle:React.CSSProperties={
        display:"inline-block",
        padding:"8px",
        lineHeight:"1rem",
        color:"currentcolor"
    }
    let element = <></>
    if(props.icon){
        element = (<SvgIcon src={props.icon} width={16} height={16} style={{color:"currentcolor",verticalAlign:"middle",height:"16px",width:"16px"}} />)
    }
    return(
        <a data-type="warden-toolbar-link" href={props.href || "#"} style={linkStyle} className="ant-btn ant-btn-text" target={props.href}>
            {props.children || element}
        </a>
    )
}

export default ToolbarLink