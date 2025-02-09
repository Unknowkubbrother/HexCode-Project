import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Users, Dot, Pen , Crown} from 'lucide-react';
import Markdown from 'react-markdown'
import { IAccount } from '@/interface/accounts';

export default function Profile({ account, itself }: { account: IAccount, itself: boolean }) {

    return (
        <main>
            <div className='w-full flex justify-around items-center p-5'>
                <div className='flex justify-center items-center gap-5'>
                    <Avatar className='w-24 h-24'>
                        <AvatarImage src={account?.avatar} alt="profile" />
                        <AvatarFallback>HEXCODE</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h1 className='text-lg font-semibold flex justify-start items-center gap-1'>
                            {account?.role == 'premium' && <Crown size={20} className='text-yellow-500'/>}
                            <span className={`${account.role == 'premium' ? 'text-yellow-600' : ''}`}>{account?.username}</span>
                        </h1>
                        <span className='text-sm'>@{account?.username}</span>
                        <div className='flex gap-2 mt-[7px]'>
                            <span className='flex gap-1 justify-center items-center text-sm'>
                                <Users size={15} />
                                <span className='text-primary'>{account.followers}</span>
                                <span>follower</span>
                            </span>
                            <span className='flex gap-1 justify-center items-center'>
                                <Dot size={15} />
                                <span className='text-primary'>{account.following}</span>
                                <span className='text-sm'>following</span>
                            </span>
                        </div>
                    </div>
                </div>
                {itself ? (
                    <div className='flex justify-center items-center gap-5'>
                        <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'>
                            Edit Profile
                        </Button>
                    </div>
                ) : (
                    <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'>
                        Follow
                    </Button>
                )}

            </div>


        {(account?.detail) && (
            <div className='w-[80%] m-auto border-2 p-5 rounded-lg flex flex-col gap-5'>
            <div className='w-full flex justify-between items-center px-3 font-semibold'>
                <span className='text-[10px]'>{account.username} / README.MD</span>
                {itself && <button className='text-[10px] hover:text-primary duration-300'><Pen size={15} /></button>}
            </div>
            <Markdown className="text-[12px]">
                {account?.detail}
            </Markdown>
        </div>
        )}
        </main>
    )
}
