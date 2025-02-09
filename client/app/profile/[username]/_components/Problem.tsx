import React from 'react'
import { Newspaper } from 'lucide-react'
import ItemProblem from './ItemProblem'
import Link from 'next/link'

export default function Problem() {
    return (
        <main className='w-[80%] m-auto flex flex-col gap-3'>
            <header className='flex w-full justify-between items-center px-3'>
                <span className='text-lg'>Problems</span>
                <Link href="/problems/create" className='px-3 py-2 rounded-lg border border-input bg-background shadow-sm hover:text-accent-foreground border-sky-500 hover:bg-primary duration-300'>
                    <span className='flex justify-center items-center text-[13px] gap-2'>
                        <Newspaper size={15} />
                        <span>New</span>
                    </span>
                </Link>
            </header>

            <div className="w-full h-[700px] overflow-y-auto">
                <div className="w-full h-fit grid grid-cols-1 gap-3">
                    {Array.from({ length: 10 }).map((_, index) => (
                       <ItemProblem key={index} />
                    ))}
                </div>
            </div>
        </main>
    )
}
