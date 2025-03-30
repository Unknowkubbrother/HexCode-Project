"use client"
import { useState, useEffect } from 'react'
import { getHistoryVerify, getVerifyStatus } from '@/actions/verificationAction'
import { IVerify } from '@/interface/verification'
import { Users, Swords, ServerCrash, ListOrdered } from 'lucide-react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"


export default function OverView() {
    const [verifies, setVerifies] = useState<IVerify[]>([]);
    const [countData, setCountData] = useState<{ problems: number, users: number, challenges: number }>({
        problems: 0,
        users: 0,
        challenges: 0
    });

    useEffect(() => {
        const fetchVerifies = async () => {
            const data = await getHistoryVerify();
            if (!data) {
                return;
            }
            setVerifies(data.result);
        };

        fetchVerifies();

        const fetchStatus = async () => {
            const data = await getVerifyStatus();

            if (!data) {
                return;
            }

            console.log(data);
            setCountData({
                problems: data.problems,
                users: data.users,
                challenges: data.challenges
            });
        };

        fetchStatus();
    }, [])

    const SkeletonLoading = () => {
        return (
            <TableRow>
                <TableCell className='flex items-center gap-2'>
                    <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-24" />
                </TableCell>
            </TableRow>
        )
    }

    return (
        <main className='w-full h-full'>

            <div className='w-full flex justify-start items-center gap-5 my-10'>

                <div className='w-fit h-fit p-2 flex justify-start items-center gap-2 bg-bgsecondary rounded-md shadow-md'>
                    <div className='w-14 h-14 rounded-md bg-primary flex justify-center items-center'>
                        <Users size={30} className='text-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm text-muted-foreground'>Total Users</span>
                        <span className='text-lg font-semibold'>{countData.users}</span>
                    </div>
                </div>

                <div className='w-fit h-fit p-2 flex justify-start items-center gap-2 bg-bgsecondary rounded-md shadow-md'>
                    <div className='w-14 h-14 rounded-md bg-primary flex justify-center items-center'>
                        <ServerCrash size={30} className='text-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm text-muted-foreground'>Total Problems</span>
                        <span className='text-lg font-semibold'>{countData.problems}</span>
                    </div>
                </div>


                <div className='w-fit h-fit p-2 flex justify-start items-center gap-2 bg-bgsecondary rounded-md shadow-md'>
                    <div className='w-14 h-14 rounded-md bg-primary flex justify-center items-center'>
                        <Swords size={30} className='text-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm text-muted-foreground'>Total Challenges</span>
                        <span className='text-lg font-semibold'>{countData.challenges}</span>
                    </div>
                </div>
            </div>


            <div className='w-full h-full'>

                <Table>
                    <TableCaption>A list of verification.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>problemName</TableHead>
                            <TableHead className='text-center'>detail</TableHead>
                            <TableHead className='text-center'>status</TableHead>
                            <TableHead className='text-center'>verifiyby</TableHead>
                            <TableHead className='text-center'>verifyTime</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {verifies.length === 0 ? (
                            <SkeletonLoading />
                        ) : (
                            verifies.map((verify) => (
                                <TableRow key={verify._id}>
                                    <TableCell className='text-center'>{verify.problemName}</TableCell>
                                    <TableCell className='text-center'>{verify.detail}</TableCell>
                                    <TableCell className='text-center'>{verify.success ? "Success" : "Failed"}</TableCell>
                                    <TableCell className='text-center'>{verify.verifiyby}</TableCell>
                                    <TableCell className='text-center'>{new Date(verify.createdAt!).toLocaleString()}</TableCell>
                                </TableRow>
                            )))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">
                                <span className='flex justify-end items-center gap-2 '>
                                    <ListOrdered />{verifies.length}
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>

        </main>
    )
}
