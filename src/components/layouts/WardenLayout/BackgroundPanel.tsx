import { theme } from 'antd'
import { useConfigContext } from "@/context"
import { getMenuSkin } from '@/utils/menuUtil';

const {useToken} = theme;

const BackgroundPanel=()=>{
    const {token} = useToken()    
    const {config} = useConfigContext()
    let bgContent:JSX.Element = <></>
    if(config.menuSkin){
        let menuSkin = getMenuSkin(config.menuSkin,config.primaryColor)
        console.log(menuSkin)
        if(menuSkin){
            bgContent = menuSkin.content!
        }
    }
    
    return(
        <div className='warden-layout-background' style={{background:token.colorBgLayout}}>
            {bgContent}
        </div>
    )
}
export default BackgroundPanel