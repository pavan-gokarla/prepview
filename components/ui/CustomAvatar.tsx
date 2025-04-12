import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const CustomAvatar = ({ src }: {
    src: string,

}) => {
    return (
        <Avatar className='w-50px' >
            <AvatarImage src={src} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

    )
}

export default CustomAvatar