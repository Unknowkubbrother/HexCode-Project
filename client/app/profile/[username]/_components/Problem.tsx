import React from 'react'
import { Newspaper } from 'lucide-react'
import ItemProblem from './ItemProblem'
import Link from 'next/link'
import { ListProblemInterface } from '@/interface/problems'

export default function Problem({ problem, itself }: { problem: ListProblemInterface[], itself: boolean }) {
    return (
        <main className='w-[80%] m-auto flex flex-col gap-3'>
            <header className='flex w-full justify-between items-center px-3'>
                <span className='text-lg'>Problems</span>
                {itself && (
                    <Link href="/problems/create" className='px-3 py-2 rounded-lg border border-input bg-background shadow-sm hover:text-accent-foreground border-sky-500 hover:bg-primary duration-300'>
                        <span className='flex justify-center items-center text-[13px] gap-2'>
                            <Newspaper size={15} />
                            <span>New</span>
                        </span>
                    </Link>
                )}
            </header>

         {problem.length > 0 ? (
            <div className="w-full max-h-[700px] overflow-y-auto mb-10">
                <div className="w-full h-fit grid grid-cols-1 gap-3">
                    {
                        problem.map((problem, index) => (
                            <ItemProblem key={index} problem={problem} itself={itself}/>
                        ))
                    }
                </div>
            </div>
         ) : (
            <div className='w-full mt-10 mb-[10rem] flex justify-center items-center'>
                <span className='text-lg'>No Problem</span>
            </div>
         )}
        </main>
    )
}
