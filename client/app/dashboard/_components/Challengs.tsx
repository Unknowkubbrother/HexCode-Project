import React from 'react'
import { Button } from '@/components/ui/button'
import { Newspaper } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import TemplateImage from "@/assets/avatar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical, Dot } from 'lucide-react';

export default function Challengs() {
    return (
        <main className='w-[80%] m-auto flex flex-col gap-3'>
            <header className='flex w-full justify-between items-center px-5'>
                <span className='text-lg'>Challengs</span>
                <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'>
                    <span className='flex justify-center items-center text-[13px] gap-2'>
                        <Newspaper size={15} />
                        <span>New</span>
                    </span>
                </Button>
            </header>

            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-3 md:basis-1/2 lg:basis-1/4"
                        >
                            {/* <CardChallenges/> */}
                            <div className='w-full flex flex-col h-fit p-2'>
                                <Image src={TemplateImage} alt='ChallengsPhoto' width={300} height={200} className='rounded-lg'></Image>
                                <div className='flex gap-3 mt-2'>
                                    <Avatar className="h-5 w-5 mt-1">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <div className='flex'>
                                            <p>บินพารามอเตอร์ กลางหุบเขาเชียงใหม่ 10 องศา!
                                            </p>
                                            <EllipsisVertical size={30} />
                                        </div>
                                        <div className='text-[13px] text-[#a1a0a0]'>
                                            unknowkubbrother
                                        </div>
                                        <div className='text-[13px] flex items-center mt-1'>
                                            <span>10 hours ago</span>
                                            <Dot size={15} />
                                            <span>เข้าร่วมแล้ว 1000 คน</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </main>
    )
}
