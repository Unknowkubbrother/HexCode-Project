import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical, Dot } from 'lucide-react';
import { IListChallenge } from '@/interface/challenges';
import Link from 'next/link';

export default function CardChallenge({ data }: { data: IListChallenge }) {
    return (
        <Link className='w-full flex flex-col h-fit p-2' href={`/challenges/${data._id}`}>
            <img src={data.thumbnail} alt="ChallengsPhoto" width={400} height={300} className='rounded-lg object-contain' />
            <div className='flex gap-3 mt-2'>
                <Avatar className="h-5 w-5 mt-1">
                    <AvatarImage src={data.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='w-full flex flex-col'>
                    <div className='w-full flex justify-start items-center'>
                        <p>
                            {data.title}
                        </p>
                    </div>
                    <div className='text-[13px] text-[#a1a0a0]'>
                        {data.username}
                    </div>
                    <div className='text-[13px] flex items-center mt-1'>
                        <span>
                            {Date.now() - new Date(data?.createdAt || 0).getTime() > 86400000 ? Math.floor((Date.now() - new Date(data?.createdAt || 0).getTime()) / 86400000) + " day ago" : Math.floor((Date.now() - new Date(data?.createdAt || 0).getTime()) / 3600000) + " hour ago"}
                        </span>
                        <Dot size={15} />
                        <span>เข้าร่วมแล้ว {data.countPlayer} คน</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
