const hexToRgb=(color:string) => {
  color = color.replace("#", "");
  var r = parseInt(color.substring(0, 2), 16);
  var g = parseInt(color.substring(2, 4), 16);
  var b = parseInt(color.substring(4, 6), 16);
  return({r,g,b})
}
const hexToRgbaString=(color:string,alpha:number)=>{
    const {r,g,b} = hexToRgb(color)
    return "rgba("+r+","+g+","+b+","+alpha+")"
}
export {hexToRgb,hexToRgbaString}