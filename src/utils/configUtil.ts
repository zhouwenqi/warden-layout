import {Warden} from '@/typings';
const defaultKeyName = "default-warden-layout-config"

/**
 * 获取存在storage中的配置
 * @param name key
 * @returns 
 */
const getStorageConfig = (name?:string):Warden.IConfig | undefined => {    
    if(!name){
        name = defaultKeyName
    }
    const json = window.localStorage.getItem(name)
    try{
        if(json){
            return JSON.parse(json) as Warden.IConfig
        }
    }catch(ex){
        console.error(ex)    
    }
}


/**
 * 保存配置到storage
 * @param config 配置
 * @param name key
 */
const setStorageConfig=(config:Warden.IConfig,name?:string)=>{
    if(!name){
        name = defaultKeyName
    }
    const json = JSON.stringify(config)
    window.localStorage.setItem(name,json)
}

export {getStorageConfig, setStorageConfig}