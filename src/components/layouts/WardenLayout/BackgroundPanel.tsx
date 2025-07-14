import { theme } from 'antd';
import { useConfigContext,WardenGlobalThis } from "@/context";

const {useToken} = theme;

const BackgroundPanel=()=>{
    const {token} = useToken()    
    const {config} = useConfigContext()
    let bgContent:JSX.Element = <></>
    if(config.menuSkin){
        const menuSkin = WardenGlobalThis.skinsMap[config.menuSkin]      
        if(menuSkin && (menuSkin.theme == config.theme || !menuSkin.theme)){
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