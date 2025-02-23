"use client";
import { useState,useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CardChallenge from "@/components/ui/CardChallenge"
import {IListChallenge} from '@/interface/challenges'
import { getChallenges } from "@/actions/challengeAction";

export default function Challengs() {
    const [data, setData] = useState<IListChallenge[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const {result} = await getChallenges();
            setData(result);
        }
        fetchData();
    }, [])

    return (
        <main className='w-[90%] m-auto'>
            <header className='my-5 text-lg font-semibold'>Challengs</header>
            <div className="w-[95%] m-auto">
                <div className="flex justify-between items-center gap-3">
                    <div className="flex justify-center items-center gap-3">
                        <Input type="text" placeholder="Search" className="w-[400px]" ></Input>
                        <Button type="submit" size="sm">Search</Button>
                    </div>
                    <nav>
                        <ul className="flex justify-center items-center gap-3">
                            <li>
                                <Button size="sm">All</Button>
                            </li>
                            <li>
                                <Button size="sm">Active</Button>
                            </li>
                            <li>
                                <Button size="sm">Completed</Button>
                            </li>
                            <li>
                                <Button size="sm">Expired</Button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="w-full h-fit overflow-y-auto mt-10">
                    <div className="w-full h-fit grid grid-cols-5 gap-3">
                        {
                            data.map((item, index) => (
                                <CardChallenge key={index} data={item}/>
                            ))
                        }
                    </div>
                </div>

            </div>
        </main>
    )
}
