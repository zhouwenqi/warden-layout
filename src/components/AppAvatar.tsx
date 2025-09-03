import { Avatar } from "antd"
import { useEffect, useState } from "react";
import type { AvatarProps } from "antd";

/**
 * 渐显加载avatar组件
 * @param props avatar属性
 * @returns 
 */
const AppAvatar=(props:AvatarProps)=>{
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!props.src) return
        if(typeof props.src == "string"){
        const img = new Image()
        img.src = props.src as string
        img.onload = () => setLoaded(true)
        img.onerror = () => setLoaded(true)
        }else{
             setLoaded(true);
        }
    }, [props.src])

    return (
        <Avatar
        {...props}
        style={{
            ...props.style,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
        }}
        />
    )
}

export default AppAvatar