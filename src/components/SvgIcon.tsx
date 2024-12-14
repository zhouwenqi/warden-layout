import { ReactSVG } from "react-svg"
import { SvgIconProps } from "@/typings"

/**
 * SvgIcon components
 * @author zhouwenqi
 * @description This is a component for loading SVG files. Please note that the fill or color attribute value of the loaded SVG file should be "current Color"
 */
const SvgIcon=(props:SvgIconProps)=>{
    const {src,width,height,fill,color,style} = props
    const loadHandler =(svg: SVGSVGElement)=>{
        svg.setAttribute("width",width+"px")
        svg.setAttribute("height",height+"px")
    }
    return(
        <ReactSVG style={props.style} src={src} fill={fill} color={color} afterInjection={loadHandler} />
    )
}
const IconLeft=()=>(
    <svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  width="1em" height="1em"><path d="M426.666667 245.333333a32 32 0 0 1 32-32h362.666666a32 32 0 0 1 0 64h-362.666666a32 32 0 0 1-32-32zM179.2 351.573333a32 32 0 0 1 45.226667-1.706666l149.333333 138.666666a32 32 0 0 1 0 46.933334l-149.333333 138.666666a32 32 0 0 1-43.52-46.933333L304.981333 512 180.906667 396.8a32 32 0 0 1-1.706667-45.226667zM554.666667 416a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32z m0 192a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32z m-128 170.666667a32 32 0 0 1 32-32h362.666666a32 32 0 0 1 0 64h-362.666666a32 32 0 0 1-32-32z"></path></svg>
)
const IconRight=()=>(
    <svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M170.666667 245.333333A32 32 0 0 1 202.666667 213.333333h362.666666a32 32 0 0 1 0 64h-362.666666A32 32 0 0 1 170.666667 245.333333z m674.133333 106.24a32 32 0 0 1-1.706667 45.226667L719.018667 512l124.074666 115.2a32 32 0 1 1-43.52 46.933333l-149.333333-138.666666a32 32 0 0 1 0-46.933334l149.333333-138.666666a32 32 0 0 1 45.226667 1.706666zM170.666667 416A32 32 0 0 1 202.666667 384h234.666666a32 32 0 0 1 0 64h-234.666666A32 32 0 0 1 170.666667 416z m0 192a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32z m0 170.666667a32 32 0 0 1 32-32h362.666666a32 32 0 0 1 0 64h-362.666666a32 32 0 0 1-32-32z"></path></svg>
)
const IconRing=()=>(
    <svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M256 426.666667a256 256 0 1 1 512 0v78.165333l82.304 174.890667A32 32 0 0 1 821.333333 725.333333h-150.016a147.968 147.968 0 0 1-19.84 59.136C629.418667 821.12 586.794667 853.333333 512 853.333333c-74.837333 0-117.461333-32.213333-139.434667-68.864A147.925333 147.925333 0 0 1 352.682667 725.333333H202.666667a32 32 0 0 1-28.970667-45.653333L256 504.874667V426.666667z m160 287.744v-0.042667M512 234.666667A192 192 0 0 0 320 426.666667v85.333333a32 32 0 0 1-3.029333 13.653333L253.098667 661.333333h517.802666l-63.872-135.68A32 32 0 0 1 704 512v-85.333333A192 192 0 0 0 512 234.666667z"></path></svg>
)

export default SvgIcon
export {IconLeft,IconRight,IconRing}