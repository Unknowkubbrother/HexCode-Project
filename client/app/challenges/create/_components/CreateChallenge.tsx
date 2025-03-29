"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'


export default function CreateChallenge() {
    const [urlThumbnail, setUrlThumbnail] = useState<string>("")
    return (
        <main className='w-[70%] m-auto my-10'>
            <header className='text-xl font-bold border-b-2 pb-5'>
                <span className='text-primary'>Create</span> Challenge
            </header>

            <div className='w-full'>
                <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="title" className="text-sm">Challenge Name <span className="text-primary">*</span></label>
                    <Input id="title" type="text" placeholder="Title of the challenge" className="w-full" />
                </div>
                <div className="flex flex-col gap-3 mt-5 border-b-2 pb-5">
                    <label htmlFor="description" className="text-sm">Description</label>
                    <Textarea placeholder="Description of the problem" className="h-[200px]"/>
                </div>

                <div className="flex flex-col gap-3 mt-5 border-b-2 pb-5">
                    <label htmlFor="description" className="text-sm">Thumbnail</label>
                    <div className='w-full flex justify-center items-center flex-col gap-3'>
                        <span className='text-lg font-semibold'>Preview - Thumbnail</span>
                        <Image
                            src={urlThumbnail || "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"}
                            alt="Thumbnail"
                            width={500}
                            height={500}
                            className="object-cover rounded-lg"
                            unoptimized
                        />               
                    </div>
                    <Input id="thumbnail" type="text" placeholder="Url Thumbnail" className="w-full" value={urlThumbnail} onChange={(e) => setUrlThumbnail(e.target.value)}/>
                </div>
            </div>
        </main>
    )
}
