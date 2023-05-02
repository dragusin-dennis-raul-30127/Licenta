import {UserIcon} from '@heroicons/react/24/outline'
import {memo} from 'react'
export const ICONS  = {
    USER_ICON:  UserIcon
}

export const Icon = memo(({icon,className,size=5})=>{
    const IconComp=icon 
    if(!icon){
        return null
    }
    return(
        <IconComp className={className} style={{width:`${size*4}px` , height:`${size*4}px`}}></IconComp>
    )
})