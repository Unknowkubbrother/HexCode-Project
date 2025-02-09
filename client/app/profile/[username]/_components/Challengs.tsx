import React from 'react'
import Link from 'next/link'
import { Newspaper } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import CardChallenge from '@/components/ui/CardChallenge';

export default function Challengs({itself} : {itself: boolean}) {
    return (
        <main className='w-[80%] m-auto flex flex-col gap-3'>
            <header className='flex w-full justify-between items-center px-5'>
                <span className='text-lg'>Challengs</span>
                {itself && (
                    <Link href="/challenges/create" className='px-3 py-2 rounded-lg border border-input bg-background shadow-sm hover:text-accent-foreground border-sky-500 hover:bg-primary duration-300'>
                    <span className='flex justify-center items-center text-[13px] gap-2'>
                        <Newspaper size={15} />
                        <span>New</span>
                    </span>
                </Link>
                )}
            </header>

            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-3 md:basis-1/2 lg:basis-1/4"
                        >
                            <CardChallenge />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </main>
    )
}
