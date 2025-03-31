"use client";
import { useState, useEffect } from "react";
import { getSubmissionByProblemId } from "@/actions/submissionAction";
import { ISubmission } from "@/interface/submissions";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CircleCheckBig, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Submissions({ problemId }: { problemId: string }) {

    const [submissions, setSubmissions] = useState<ISubmission[]>([]);
    const [isAciveView, setIsActiveView] = useState<boolean>(false);
    const [selectedViewsubmission, setSelectedViewSubmission] = useState<ISubmission | null>(null);

    useEffect(() => {
        getSubmissionByProblemId(problemId).then((data) => {
            setSubmissions(data);
        });
    }, [problemId]);

    const handlerViewSubmission = (submission: ISubmission) => {

        setIsActiveView(!isAciveView);

        if (isAciveView) {
            setSelectedViewSubmission(null);
            return;
        }

        setSelectedViewSubmission(submission);
    }

    const SkeletonLoading = () => {
        return (
            <TableRow>
                <TableCell className='flex items-center gap-2'>
                    <Skeleton className="h-8 w-8 rounded-full" />
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
        <div className="w-full h-full relative">
            <Table className={`w-[80%] m-auto mt-5 ${isAciveView ? "blur-sm" : ""}`}>
                <TableCaption>A list of submissions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Username</TableHead>
                        <TableHead className="text-center">RESULT</TableHead>
                        <TableHead className="text-center">POINTS</TableHead>
                        <TableHead className="text-center">LANGUAGE</TableHead>
                        <TableHead className="text-center">TIME</TableHead>
                        <TableHead className="text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        submissions.length === 0 ? (
                            <SkeletonLoading/>
                        ) : (
                            <>
                                {submissions.map((submission) => (
                                    <TableRow key={submission._id}>
                                        <TableCell className="text-center">
                                            <Link className="flex justify-center items-center gap-2 duration-300 hover:text-primary" href={`/profile/${submission.username}`}>
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={submission?.avatar} alt="Avatar" />
                                                    <AvatarFallback>{String(submission?.username).charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span>{submission?.username}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-center">{(submission.success) ?
                                            <span className="flex items-center justify-center gap-2 text-green-400">
                                                <CircleCheckBig size={15} />
                                                <span>Accepted</span>
                                            </span>
                                            :
                                            <span className="flex items-center justify-center gap-2 text-rose-400">
                                                <CircleX size={15} />
                                                <span>{Number(submission.points) > 0 ? "Wrong Answer" : "Rejected"}</span>
                                            </span>
                                        }</TableCell>
                                        <TableCell className="text-center">{Number(submission.points)}</TableCell>
                                        <TableCell className="text-center">{submission?.language_name}</TableCell>
                                        <TableCell className="text-center">
                                            {(() => {
                                                const diff = Date.now() - new Date(submission?.createdAt || Date.now()).getTime();
                                                const seconds = Math.floor(diff / 1000);
                                                const minutes = Math.floor(seconds / 60);
                                                const hours = Math.floor(minutes / 60);
                                                const days = Math.floor(hours / 24);

                                                if (days > 0) {
                                                    return `${days} day${days > 1 ? 's' : ''} ago`;
                                                } else if (hours > 0) {
                                                    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                                                } else if (minutes > 0) {
                                                    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                                                } else {
                                                    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
                                                }
                                            })()}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <button className="text-primary"
                                                onClick={() => handlerViewSubmission(submission)}
                                            >View</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )
                    }
                </TableBody>
            </Table>
            {isAciveView && selectedViewsubmission && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-background bg-bgsecondary flex justify-center items-center rounded-xl z-50 border-2 scale-90">
                    <div className="w-full h-fit p-5">
                        <div className="w-full flex gap-5">
                            <div>
                                <h1 className="text-lg font-bold">View Submission</h1>
                                <div className="flex items-center gap-5">
                                    <span className="mr-5">Points : <span className="text-primary">{String(selectedViewsubmission.points)}</span></span>
                                    <span> Status : <span className={`${selectedViewsubmission.success ? "text-green-400" : "text-rose-400"}`}>{selectedViewsubmission.success ? "Accepted" : (Number(selectedViewsubmission.points) > 0) ? "Wrong Answer" : "Rejected"}</span></span>

                                </div>
                                <div className="w-full flex flex-col gap-5">
                                    <span>Submitted Code : <span className="text-primary">{selectedViewsubmission.language_name}</span></span>
                                    <CodeBlock
                                        language={String(selectedViewsubmission.language_name).toLowerCase().split(' ')[0] == "c++" ? "cpp" : String(selectedViewsubmission.language_name).toLowerCase().split(' ')[0]}
                                        code={selectedViewsubmission.source_code}
                                        filename={""}
                                        className="min-w-[700px] max-w-[700px] w-[700px] h-[500px] overflow-auto border-[3px]"
                                    />

                                </div>
                            </div>
                            <div className="w-[600px] h-fit p-3">
                                <div className="w-full flex flex-col gap-5">
                                    <Tabs defaultValue="testcase_1" className="w-full flex justify-start items-start">
                                        <TabsList className="flex flex-col gap-3 mr-5 bg-transparent">
                                            {
                                                selectedViewsubmission.testcases.map((testcase, index) => (
                                                    <TabsTrigger key={index} value={`testcase_${index + 1}`} className={`flex justify-start items-center gap-2 border-b-2 border-background ${testcase.status.description === "Accepted" ? "text-green-400" : "text-red-400"}`}>
                                                        {(testcase.status.description === "Accepted") ? <CircleCheckBig size={15} />
                                                            : <CircleX size={15} />
                                                        }
                                                        <span>Test Case {index + 1}</span>
                                                    </TabsTrigger>
                                                ))
                                            }
                                        </TabsList>
                                        {
                                            selectedViewsubmission.testcases.map((testcase, index) => (
                                                <TabsContent key={index} value={`testcase_${index + 1}`} className="w-full px-5 pb-5">

                                                    <div className="w-full flex flex-col gap-5">

                                                        <div className="w-full flex flex-col gap-3">
                                                            <span>Points</span>
                                                            <p className="text-sm p-3 dark:bg-bgsecondary bg-background">{testcase.points}</p>
                                                        </div>

                                                        <div className="w-full flex flex-col gap-3">
                                                            <span>Compiler Message</span>
                                                            <p className="text-sm p-3 dark:bg-bgsecondary bg-background">{testcase.status.description}</p>
                                                        </div>

                                                        <div className="w-full flex flex-col gap-3">
                                                            <h1>Execution time</h1>
                                                            <p className="text-sm p-3 dark:bg-bgsecondary bg-background">{testcase.time || 0} sec</p>
                                                        </div>

                                                        <div className="w-full flex flex-col gap-3">
                                                            <h1>Memory used</h1>
                                                            <p className="text-sm p-3 dark:bg-bgsecondary bg-background">{(Number(testcase.memory) / 1024).toFixed(3) || 0} MiB</p>
                                                        </div>

                                                    </div>
                                                </TabsContent>
                                            ))
                                        }
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                        <Button className="mt-5 w-full" onClick={() => setIsActiveView(false)}>Close</Button>
                    </div>
                </div>
            )}
        </div>
    )
}

