import { ReactSVG } from "react-svg"
import { SvgIconProps } from "@/typings"

/**
 * SvgIcon components
 * @author zhouwenqi
 * @description This is a component for loading SVG files. Please note that the fill or color attribute value of the loaded SVG file should be "current Color"
 */
const SvgIcon=(props:SvgIconProps)=>{
    const {src,width=16,height=16,fill,color,style,className} = props   
    const beforeHandler = async (svg: SVGSVGElement)=>{
        svg.setAttribute("width",width as string)
        svg.setAttribute("height",height as string)
    }
    return(
        <ReactSVG beforeInjection={beforeHandler} className={className} style={style} src={src} fill={fill} color={color} />
    )
}
const IconLeft=()=>(
    <svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  width="1em" height="1em"><path d="M426.666667 245.333333a32 32 0 0 1 32-32h362.666666a32 32 0 0 1 0 64h-362.666666a32 32 0 0 1-32-32zM179.2 351.573333a32 32 0 0 1 45.226667-1.706666l149.333333 138.666666a32 32 0 0 1 0 46.933334l-149.333333 138.666666a32 32 0 0 1-43.52-46.933333L304.981333 512 180.906667 396.8a32 32 0 0 1-1.706667-45.226667zM554.666667 416a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32z m0 192a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32z m-128 170.666667a32 32 0 0 1 32-32h362.666666a32 32 0 0 1 0 64h-362.666666a32 32 0 0 1-32-32z"></path></svg>
)
const IconRight=()=>(
    <svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M170.666667 245.333333A32 32 0 0 1 202.666667 213.333333h362.666666a32 32 0 0 1 0 64h-362.666666A32 32 0 0 1 170.666667 245.333333z m674.133333 106.24a32 32 0 0 1-1.706667 45.226667L719.018667 512l124.074666 115.2a32 32 0 1 1-43.52 46.933333l-149.333333-138.666666a32 32 0 0 1 0-46.933334l149.333333-138.666666a32 32 0 0 1 45.226667 1.706666zM170.666667 416A32 32 0 0 1 202.666667 384h234.666666a32 32 0 0 1 0 64h-234.666666A32 32 0 0 1 170.666667 416z m0 192a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32z m0 170.666667a32 32 0 0 1 32-32h362.666666a32 32 0 0 1 0 64h-362.666666a32 32 0 0 1-32-32z"></path></svg>
)

const IconMenuExpand=(props:{src:string})=>{
    return(
        <SvgIcon className="pput" src={props.src} width="16" height="16" style={{display:"inline-block",lineHeight:"16px",width:"16px",height:"16px"}} />
    )
}

export default SvgIcon
export {IconLeft,IconRight,IconMenuExpand}