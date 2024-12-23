import { theme } from 'antd'
import { useConfigContext,WardenGlobalThis } from "@/context"

const {useToken} = theme;

const BackgroundPanel=()=>{
    const {token} = useToken()    
    const {config} = useConfigContext()
    let bgContent:JSX.Element = <></>
    if(config.menuSkin){
        let menuSkin = WardenGlobalThis.skinsMap[config.menuSkin]      
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