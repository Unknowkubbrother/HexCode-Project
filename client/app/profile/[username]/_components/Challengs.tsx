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
import { IListChallenge } from '@/interface/challenges';
import { Pen } from 'lucide-react';

export default function Challengs({ itself, challenges }: { itself: boolean, challenges: IListChallenge[] }) {
    return (
        <main className='w-[80%] m-auto flex flex-col gap-3'>
            <header className='flex w-full justify-between items-center px-3'>
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

            {
                challenges.length > 0 ? (
                    <Carousel className="w-full">
                        <CarouselContent className="-ml-1">
                            {challenges.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-3 md:basis-1/2 lg:basis-1/4"
                                >
                                    {
                                        !itself ?
                                            <CardChallenge key={index} data={item} />
                                            :
                                            <div className='w-full h-fit relative'>
                                                <CardChallenge key={index} data={item} />
                                                <Link className='absolute top-0 right-2 text-primary cursor-pointer hover:scale-105 duration-300 bg-white rounded-full p-1 h-7 w-7 hover:text-green-400'
                                                    href={`/challenges/edit/${item._id}`}
                                                >
                                                    <Pen size={20} />
                                                </Link>
                                            </div>
                                    }
                                    {/* <div key={index}>
                                    {index+1}
                                </div> */}
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                ) : (
                    <div className='w-full flex justify-center items-center'>
                        <span className='text-sm'>No Challenge</span>
                    </div>
                )
            }
        </main>
    )
}
