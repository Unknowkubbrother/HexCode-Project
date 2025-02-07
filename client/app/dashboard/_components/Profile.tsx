import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Users, Dot,Pen } from 'lucide-react';
import Markdown from 'react-markdown'

export default function Profile() {
    const markdown = `
    # Welcome to My Profile

    Hello! I'm Unknowkubbrother, a passionate developer who loves coding and sharing knowledge with the community.

    # Skills
    - **Languages:** JavaScript, TypeScript, Python
    - **Frameworks:** React, Next.js, Node.js
    - **Tools:** Git, Docker, VSCode

    ## Projects
    1. **HexCode-Project:** A project to manage and visualize hex codes.
    2. **Markdown Editor:** A simple and intuitive markdown editor built with React.

    ## Contact
    Feel free to reach out to me on [GitHub](https://github.com/unknowkubbrother) or [Twitter](https://twitter.com/unknowkubbrother).

    Thanks for visiting my profile!
    `


    return (
        <main>
            <div className='w-full flex justify-around items-center p-5'>
                <div className='flex justify-center items-center gap-5'>
                    <Avatar className='w-24 h-24'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h1 className='text-lg font-semibold'>Unknowkubbrother</h1>
                        <span className='text-sm'>@unknowkubbrother</span>
                        <div className='flex gap-2 mt-[7px]'>
                            <span className='flex gap-1 justify-center items-center text-sm'>
                                <Users size={15} />
                                <span className='text-primary'>100</span>
                                <span>follower</span>
                            </span>
                            <span className='flex gap-1 justify-center items-center'>
                                <Dot size={15} />
                                <span className='text-primary'>100</span>
                                <span className='text-sm'>following</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'>
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className='w-[90%] m-auto border-2 p-5 rounded-lg flex flex-col gap-5'>
                <div className='w-full flex justify-between items-center px-3 font-semibold'>
                    <span className='text-[10px]'>Unknowkubbrother / README.MD</span>
                    <span className='text-[10px]'><Pen size={15}/></span>
                </div>
                <Markdown className="text-[12px]">
                    { markdown }
                </Markdown>

            </div>
        </main>
    )
}
