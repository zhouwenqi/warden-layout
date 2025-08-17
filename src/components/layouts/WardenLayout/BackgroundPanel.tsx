import { theme } from 'antd';
import { useConfigContext,WardenGlobalThis } from "@/context";
import { useEffect, useState } from 'react';
import {Warden} from '@/typings';

const {useToken} = theme;

const BackgroundPanel=()=>{
    const {token} = useToken()    
    const {config} = useConfigContext()
    let bgContent:JSX.Element = <></>
    if(config.menuSkin){
        const menuSkin = WardenGlobalThis.skinsMap[config.menuSkin]      
        if(menuSkin && (menuSkin.theme == config.theme || !menuSkin.theme)){

            bgContent = menuSkin.backgroundImage ? <LazyBackgroundImage imgSrc={getBackgroundImage(menuSkin.backgroundImage,config.layoutType)} /> : menuSkin.content!
        }
    }
    
    return(
        <div className='warden-layout-background' style={{background:token.colorBgLayout}}>
            {bgContent}
        </div>
    )
}

/**
 * Asynchronously load skin background images
 * @param props image src
 * @returns 
 */
const LazyBackgroundImage=(props:{imgSrc:string})=>{
    const [displaySrc, setDisplaySrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setDisplaySrc(null);

        const img = new Image();
        img.src = props.imgSrc;

        img.onload = () => {
            setDisplaySrc(props.imgSrc);
            setLoading(false);
        };

        return () => {
            img.onload = null;
        };
    }, [props.imgSrc]);

    const divStyle: React.CSSProperties = {
        width: "100%",
        height: "100%",
        backgroundImage: displaySrc ? `url(${displaySrc})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 0.5s ease-in-out",
        opacity: displaySrc ? 1 : 0,
    };

  return (
    <div style={divStyle}></div>
  );
}

/**
 * get background iamge
 * @param imgSrc img src
 * @param layoutType layout type
 * @returns 
 */
const getBackgroundImage=(imgSrc:String,layoutType:Warden.LayoutType)=>{
    
    const srcs = imgSrc.split(",")
    if(srcs.length > 1 && layoutType == "leftMenu"){
        return srcs[1]
    }else{
        return srcs[0]
    }

}

export default BackgroundPanel