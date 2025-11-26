"use client"
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Minus, Plus, BookCheck, BookKey } from 'lucide-react';
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { getMyProblemChallenges } from '@/actions/problemAction'
import { toast } from 'react-toastify';
import { createChallenge } from '@/actions/challengeAction'
import Loader from "@/components/ui/Loader";


export default function CreateChallenge() {
    const [title, setTitle] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [viewer, setViewer] = useState<string>("public");
    const [countProblems, setCountProblems] = useState<number>(1);
    const [problems, setProblems] = useState<string[]>([]);
    const [countRewards, setCountRewards] = useState<number>(0);
    const [rewards, setRewards] = useState<string[]>([]);
    const [urlThumbnail, setUrlThumbnail] = useState<string>("");
    const [urlImages, setUrlImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [MyProblemChallengess, setMyProblemChallenges] = useState<{ id: string, title: string }[]>([]);

    useEffect(() => {
        const getProblemChallenges = async () => {
            const response = await getMyProblemChallenges();
            const { result } = response;
            setMyProblemChallenges(result);
        }
        getProblemChallenges();
    }, [])

    const handlerProblems = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newProblem = problems.slice();
        newProblem[index] = e.target.value;
        setProblems(newProblem);
    };

    const handlerCountProblems = (count: number) => {
        if (count > countProblems) {
            setProblems([...problems, ""]);
        } else {
            setProblems(problems.slice(0, count));
        }
        setCountProblems(count);
    }

    const handlerCountRewards = (count: number) => {
        if (count > countRewards) {
            setRewards([...rewards, ""]);
        } else {
            setRewards(rewards.slice(0, count));
        }
        setCountRewards(count);
    }

    const handlerRewards = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newReward = rewards.slice();
        newReward[index] = e.target.value;
        setRewards(newReward);
    };

    const hanlderUrlImages = (value: string) => {
        const urls = value.split("\n");
        setUrlImages(urls);
        console.log(urlImages);
    }

    const handlercreateChallenge = async () => {
        if (!title  || !viewer || !description || !urlThumbnail || !startTime || !endTime || !problems.length || !urlImages.length || !problems.every((p) => p) || !urlImages.every((u) => u)) {
            toast.error("Please fill in all the required fields.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            return;
          }
      
          setLoading(true);

          const data = {
            title,
            description,
            thumbnail: urlThumbnail,
            images: urlImages,
            problem: problems,
            viewer,
            ...(rewards && {
                reward: rewards,
              }),
            startTime: new Date(startTime).getTime(),
            endTime: new Date(endTime).getTime(),
          };

        const createdChallenge = await createChallenge(data);

        if (!createdChallenge) {
            toast.error("Failed to create challenge. Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoading(false);
            return;
          }

          setLoading(false);

          toast.success("Challenge created successfully.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      
          setTimeout(() => {
            window.location.reload();
          }, 3500);
    }

    return (
        <main className='w-full h-full relative'>
            {loading && <Loader />}

            <div className={`w-[70%] m-auto my-10 ${loading ? 'blur pointer-events-none select-none' : ''}`}>
                <header className='text-xl font-bold border-b-2 pb-5'>
                    <span className='text-primary'>Create</span> Challenge
                </header>

                <div className='w-full'>

                    <div className='w-full flex justify-start items-center gap-5'>
                        <div className="flex flex-col gap-2 mt-3">
                            <label htmlFor="title" className="text-sm">Challenge Name <span className="text-primary">*</span></label>
                            <Input id="title" type="text" placeholder="Title of the challenge" className="w-[500px]" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>


                        <div className="flex flex-col gap-2 mt-3">
                            <label htmlFor="startTime" className="text-sm">startTime <span className="text-primary">*</span></label>
                            <Input id="startTime" type="datetime-local" placeholder="startTime of the challenge" className="w-full" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-2 mt-3">
                            <label htmlFor="startTime" className="text-sm">endTime <span className="text-primary">*</span></label>
                            <Input id="endTime" type="datetime-local" placeholder="endTime of the challenge" className="w-full" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 mt-5 border-b-2 pb-5">
                        <label htmlFor="description" className="text-sm">Description <span className="text-primary">*</span></label>
                        <Textarea placeholder="Description of the challenge" className="h-[200px]" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="w-full mt-5 pb-5 border-b-2">
                        <RadioGroup defaultValue="public" value={viewer} onValueChange={(value) => setViewer(value)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="public" id="public" />
                                <div className="flex gap-3 justify-start items-center">
                                    <BookCheck size={30} />
                                    <div className="flex flex-col mt-2">
                                        <Label htmlFor="public" className="text-primary">Public</Label>
                                        <span className="text-sm">Anyone can view this challenge</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" id="private" />
                                <div className="flex gap-3 justify-start items-center">
                                    <BookKey size={30} />
                                    <div className="flex flex-col mt-2">
                                        <Label htmlFor="private" className="text-primary">Private</Label>
                                        <span className="text-sm">
                                            Only you and the people you invite can view this challenge
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="w-full mt-5 flex flex-col justify-start items-start gap-3 pb-5 border-b-2">
                        <div className="flex justify-start items-center gap-1.5">
                            <Label htmlFor="input_testcase">Problems <span className="text-primary">*</span></Label>
                            <Button variant="ghost" size='sm'
                                onClick={() => { setCountProblems(countProblems > 1 ? countProblems - 1 : 1); handlerCountProblems(countProblems > 1 ? countProblems - 1 : 1) }}
                            ><Minus /></Button>
                            <span className="px-2 rounded-sm bg-bgsecondary">{countProblems}</span>
                            <Button variant="ghost" size='sm'
                                onClick={() => { setCountProblems(countProblems + 1); handlerCountProblems(countProblems + 1) }}
                            ><Plus /></Button>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            {[...Array(countProblems)].map((_, index) => (
                                <div className="w-full flex items-start space-x-2" key={index}>
                                    <div className="w-full flex gap-3 flex-col justify-start items-start">
                                        <Label htmlFor={`problem_${index + 1}`} className="text-sm">Problem {index + 1}</Label>
                                        <Select value={problems[index]} onValueChange={(value) => handlerProblems({ target: { value } } as React.ChangeEvent<HTMLTextAreaElement>, index)} required>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Problem" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {MyProblemChallengess.map((problem, index) => (
                                                        <SelectItem key={index} value={problem.id}>
                                                            {problem.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full mt-5 flex flex-col justify-start items-start gap-3 pb-5 border-b-2">
                        <div className="flex justify-start items-center gap-1.5">
                            <Label htmlFor="input_testcase">Rewards  <span className="text-primary">(optional)</span></Label>
                            <Button variant="ghost" size='sm'
                                onClick={() => { setCountRewards(countRewards > 0 ? countRewards - 1 : 0); handlerCountRewards(countRewards > 0 ? countRewards - 1 : 0) }}
                            ><Minus /></Button>
                            <span className="px-2 rounded-sm bg-bgsecondary">{countRewards}</span>
                            <Button variant="ghost" size='sm'
                                onClick={() => { setCountRewards(countRewards + 1); handlerCountRewards(countRewards + 1) }}
                            ><Plus /></Button>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            {[...Array(countRewards)].map((_, index) => (
                                <div className="w-full flex items-start space-x-2" key={index}>
                                    <div className="w-full flex gap-3 flex-col justify-start items-start">
                                        <Label htmlFor={`reward_${index + 1}`} className="text-sm">Reward {index + 1}</Label>
                                        <Textarea id={`reward_${index + 1}`} placeholder="Reward for the Challenge" className="w-full"
                                            value={rewards[index]} onChange={(e) => handlerRewards(e, index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-5 border-b-2 pb-5">
                        <label htmlFor="description" className="text-sm">Thumbnail <span className="text-primary">*</span></label>
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
                        <Input id="thumbnail" type="text" placeholder="Url Thumbnail" className="w-full" value={urlThumbnail} onChange={(e) => setUrlThumbnail(e.target.value)} />
                    </div>


                    <div className="flex flex-col gap-3 mt-5 border-b-2 pb-5">
                        <label htmlFor="description" className="text-sm">Images <span className="text-primary">*</span></label>
                        <div className="w-[90%] m-auto flex justify-center items-center">
                            <Carousel className="w-full h-[320px]">
                                <CarouselContent className="-ml-1">
                                    {
                                        (!urlImages[0] || urlImages[0] == "") ?
                                            <CarouselItem
                                                key={0}
                                                className={`pl-3 md:basis-1/2 lg:basis-1/4 h-[320px]`}
                                            >
                                                <Image src={"https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"} unoptimized alt="promote" width={300} height={300} className="w-full h-full object-contain rounded-lg" />
                                            </CarouselItem>
                                            :
                                            urlImages.map((value, index) => (
                                                <CarouselItem
                                                    key={index}
                                                    className={`pl-3 md:basis-1/2 lg:basis-1/4 h-[320px]`}
                                                >
                                                    <Image src={value || "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"} unoptimized alt="promote" width={300} height={300} className="w-full h-full object-contain rounded-lg" />
                                                </CarouselItem>
                                            ))

                                    }
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <Textarea placeholder="urlImage1 ขึ้นบรรทัดใหม่ urlImage2" className="h-[100px]"
                            onChange={(e) => hanlderUrlImages(e.target.value)}
                            value={urlImages.join("\n")}
                        />
                    </div>
                </div>
                <div className="w-full mt-5 flex justify-end items-center gap-3">
                    <Button variant="default" onClick={handlercreateChallenge}>Create Challenge</Button>
                </div>
            </div>
        </main>
    )
}
