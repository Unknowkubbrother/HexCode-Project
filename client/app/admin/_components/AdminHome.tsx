import React from 'react'
import Status from './Statusbox'
import { UsersRound,LaptopMinimalCheck,Swords   } from 'lucide-react'
import VerifyList from './Verify'

export default function AdminHome() {
    return (
        <main className='w-[80%] m-auto flex flex-col gap-3'>
            <div className='flex gap-24 mt-12'>
                <Status title='Users' detail={100} icon={<UsersRound size={50} />}></Status>
                <Status title='Problems' detail={100} icon={<LaptopMinimalCheck  size={50} />}></Status>
                <Status title='Challenges' detail={100} icon={<Swords size={50} />}></Status>
            </div>
            <div className='mt-16 text-3xl font-semibold'>Latest request</div>
            <VerifyList></VerifyList>
        </main>
    )
}