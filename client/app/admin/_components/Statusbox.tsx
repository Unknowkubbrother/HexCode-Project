import React, { ReactNode } from 'react'
interface Props {
    title: string,
    detail:number,
    icon: ReactNode
  }
export default function Status({title,detail,icon}:Props) {
    return (
        <div className='flex content-center bg-bgsecondary rounded-lg p-5 w-full'>
            <div className='w-1/3 h-16 justify-items-center content-center'>
                <div className='h-16 w-16 bg-primary rounded-lg p-2'>{icon}</div>
            </div>
            <div className='w-2/3 content-center text-3xl font-semibold'><span>{detail}</span> {title}</div>
        </div>
    )
}