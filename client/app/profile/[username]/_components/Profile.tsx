"use client";
import { useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Users, Dot, Pen, Crown } from 'lucide-react';
import Markdown from 'react-markdown'
import { IAccount } from '@/interface/accounts';
import { followAccount, updateAccountDetail } from '@/actions/profileAction'
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "@/components/ui/code-block";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import remarkGfm from 'remark-gfm'

export default function Profile({ account, itself, myfollowed }: { account: IAccount, itself: boolean, myfollowed: boolean }) {
    const [followed, setFollowed] = useState(myfollowed);
    const [AccountDetail, setAccountDetail] = useState(account.detail || "");
    const [tempAccountDetail, setTempAccountDetail] = useState(account.detail || "");
    const [AccountDetailEdit, setAccountDetailEdit] = useState(false);

    const handlerFollow = async () => {
        const follow = await followAccount(account.clerkId);

        if (!follow) {
            console.error('follow error');
        }

        setFollowed(!followed);

        if (followed) {
            if (typeof account.followers === 'number') {
                toast.success("Unfollow Success!!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                account.followers -= 1;
            }
        } else {
            if (typeof account.followers === 'number') {
                toast.success("Followed Success!!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                account.followers += 1;
            }
        }

    }

    const handlerSaveAccountDetail = async () => {

        if (tempAccountDetail === AccountDetail) {
            setAccountDetailEdit(false);
            return;
        }

        if (!AccountDetail) {
            toast.error("Please enter your account detail", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const update = await updateAccountDetail(AccountDetail);

        if (!update) {
            console.error('update error');
        }

        setTempAccountDetail(AccountDetail);

        toast.success("Update Success!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setAccountDetailEdit(false);
    }


    const handlerCreateFirstAccountDetail = async () => {

        const update = await updateAccountDetail(`# Hello World\n\nThis is ${account.username}'s README.md`);

        if (!update) {
            console.error('update error');
        }

        setTempAccountDetail(AccountDetail);

        toast.success("Create Success wait 3 sec!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setAccountDetailEdit(false);


        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    return (
        <main>
            <div className='w-full flex justify-around items-center p-5'>
                <div className='flex justify-center items-center gap-5'>
                    <Avatar className='w-24 h-24'>
                        <AvatarImage src={account?.avatar} alt="profile" />
                        <AvatarFallback>HEXCODE</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h1 className='text-lg font-semibold flex justify-start items-center gap-1'>
                            {account?.role == 'premium' && <Crown size={20} className='text-yellow-500' />}
                            <span className={`${account.role == 'premium' ? 'text-yellow-600' : ''}`}>{account?.username}</span>
                        </h1>
                        <span className='text-sm'>@{account?.username}</span>
                        <div className='flex gap-2 mt-[7px]'>
                            <span className='flex gap-1 justify-center items-center text-sm'>
                                <Users size={15} />
                                <span className='text-primary'>{account.followers}</span>
                                <span>follower</span>
                            </span>
                            <span className='flex gap-1 justify-center items-center'>
                                <Dot size={15} />
                                <span className='text-primary'>{account.following}</span>
                                <span className='text-sm'>following</span>
                            </span>
                        </div>
                    </div>
                </div>
                {itself ? (
                    <div className='flex justify-center items-center gap-5'>
                        <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'>
                            Edit Profile
                        </Button>
                    </div>
                ) : (
                    <>
                        {followed ?
                            <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'
                                onClick={handlerFollow}
                            >
                                Unfollow
                            </Button>

                            :
                            <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'
                                onClick={handlerFollow}
                            >
                                Follow
                            </Button>
                        }
                    </>
                )}

            </div>


            {(account?.detail) ? (
                <div className='w-[80%] m-auto border-2 p-5 rounded-lg flex flex-col gap-5'>
                    <div className='w-full flex justify-between items-center px-3 font-semibold'>
                        <span className='text-[10px]'>{account.username} / README.MD</span>
                        {itself && <button className='text-[10px] hover:text-primary duration-300'
                            onClick={() => setAccountDetailEdit(!AccountDetailEdit)}
                        ><Pen size={15} /></button>}
                    </div>
                    {AccountDetailEdit ?
                        <Textarea
                            value={AccountDetail}
                            onChange={(e) => setAccountDetail(e.target.value)}
                            className='w-full h-[200px] p-3'
                        />
                        :
                        <Markdown className="text-[12px]" rehypePlugins={[rehypeRaw, rehypeKatex]} remarkPlugins={[remarkMath, remarkGfm]}
                            components={{
                                code(props) {
                                    const { children, className } = props
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match && (
                                        <CodeBlock
                                            language={match[1]}
                                            code={String(children).replace(/\n$/, '')}
                                            filename={""}

                                            className="drop-shadow-lg bg-bgsecondary"
                                        />
                                    )
                                }
                            }}>
                            {AccountDetail}
                        </Markdown>
                    }
                    {AccountDetailEdit && (
                        <div className='w-full flex justify-end items-center'>
                            <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'
                                onClick={handlerSaveAccountDetail}
                            >
                                Save
                            </Button>
                        </div>
                    )}
                </div>
            ) : itself ? (
                <div className='w-[80%] m-auto border-2 p-5 rounded-lg flex justify-between items-center gap-5'>
                    <Markdown className="text-[12px]" rehypePlugins={[rehypeRaw, rehypeKatex]} remarkPlugins={[remarkMath, remarkGfm]}
                        components={{
                            code(props) {
                                const { children, className } = props
                                const match = /language-(\w+)/.exec(className || '')
                                return match && (
                                    <CodeBlock
                                        language={match[1]}
                                        code={String(children).replace(/\n$/, '')}
                                        filename={""}

                                        className="drop-shadow-lg bg-bgsecondary"
                                    />
                                )
                            }
                        }}>
                        {"Be the first to write a README.md for this account"}
                    </Markdown>
                    <Button variant="outline" className='border-sky-500 hover:bg-primary duration-300'
                        onClick={handlerCreateFirstAccountDetail}
                    >
                        Create first README.md
                    </Button>
                </div>
            ) : <></>}
        </main>
    )
}