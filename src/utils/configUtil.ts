import {Warden} from '@/typings';
const defaultKeyName = "default-warden-layout-config"

/**
 * Retrieve the configuration stored in the storage
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
 * Save configuration to storage
 * @param config configuration
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