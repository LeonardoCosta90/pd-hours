import { Link, Text } from '@chakra-ui/react'
import Image from 'next/image'

export function Logo(){
    return(
        <Image src='/logo.svg'  height={50} width={50}alt='sad-face'/>      
    )
}