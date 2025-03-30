"use client"
import { useEffect, useState } from 'react'
import { getVerifies } from '@/actions/verificationAction'
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
import { ListCheck, ListOrdered, Cpu, Database, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IProblem } from "@/interface/problems";
import { Skeleton } from "@/components/ui/skeleton";
import { CodeBlock } from "@/components/ui/code-block";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StatusDifficulty from "@/components/ui/StatusDifficulty";
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { verifyProblem } from "@/actions/verificationAction"
import { toast } from 'react-toastify';
import Loader from '@/components/ui/Loader';


export default function MangeVerify() {
  const [data, setData] = useState<IProblem[]>([]);
  const [problemVerify, setProblemVerify] = useState<IProblem | null>(null);
  const [confirmSuccess, setConfirmSuccess] = useState<boolean | null>(null);
  const [confirmReason, setConfirmReason] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVerifies = async () => {
      const data = await getVerifies();
      if (data) {
        setData(data.result);
      }
    };
    fetchVerifies();
  }
    , []);

  const handleConfirmVerify = async () => {
    if (confirmSuccess == null || confirmReason == null || problemVerify == null) {
      return;
    }

    setLoading(true);

    const response = await verifyProblem(problemVerify._id, confirmReason, confirmSuccess);

    if (!response) {
      toast.error("verify problem failed", {
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

    toast.success("verify problem success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setConfirmSuccess(null);
    setConfirmReason(null);
    setProblemVerify(null);
    const data = await getVerifies();
    if (data) {
      setData(data.result);
    }
    setLoading(false);
  }

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

  const VerifyProblem = () => {
    return (<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-background bg-bgsecondary rounded-xl z-30 border-2 p-5 scale-90">
      <div className='flex justify-start items-center mb-5 gap-2'>
        <h1>Verification </h1>
        <StatusDifficulty difficulty={Number(problemVerify?.difficulty) || 1} />
      </div>
      <div className='w-full flex justify-between items-start'>
        <CodeBlock
          language="cpp"
          code={problemVerify?.source_code || ""}
          filename={""}
          className="min-w-[500px] max-w-[700px] h-[600px] overflow-auto border-[3px]"
        />

        <div className='w-[700px] h-full flex flex-col justify-start items-start gap-5'>
          <nav className='w-full flex justify-center items-center'>
            <ul className="flex gap-2 ">
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Cpu size={13} />
                  <span>TIME_LIMIT</span>
                </div>
                <span className="text-primary">{(Number(problemVerify?.cpu_time_limit) > 0) ? problemVerify?.cpu_time_limit : "N/A"} s</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>MEMORY_LIMIT</span>
                </div>
                <span className="text-primary">{(Number(problemVerify?.memory_limit) > 0) ? problemVerify?.memory_limit : "N/A"} MiB</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>STACK_LIMIT</span>
                </div>
                <span className="text-primary">{(Number(problemVerify?.stack_limit) > 0) ? problemVerify?.stack_limit : "N/A"} MiB</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <File size={13} />
                  <span>FILESIZE_LIMIT</span>
                </div>
                <span className="text-primary">{(Number(problemVerify?.max_file_size) > 0) ? problemVerify?.max_file_size : "N/A"} MiB</span>
              </li>
            </ul>
          </nav>

          <div className='w-[90%] m-auto flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <Label>Title</Label>
              <Input value={problemVerify?.title} className='w-full border-2' readOnly />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Description</Label>
              <Textarea value={problemVerify?.description || "No description"} className='w-full border-2 min-h-[100px]' readOnly />
            </div>
            <Button size="sm" variant="outline" className="w-full h-8 mt-3">
              <Link href={`${process.env.NEXT_PUBLIC_API_END_POINT}/file/docs/${problemVerify?._id}`} target="_blank" rel="noopener noreferrer">ดูไฟล์ PDF </Link>
            </Button>

            <div className='w-full flex justify-start items-start gap-2 flex-col'>
              <div className='flex justify-start items-center gap-3'>
                <Label>Testcase</Label>
                <span className='text-primary'>{problemVerify?.testcase?.length || 0} testcase</span>
              </div>
              <div className='w-full h-[200px] flex flex-col gap-2 overflow-auto'>
                {problemVerify?.testcase?.map((item) => (
                  <div key={item._id} className='w-full flex justify-start items-center gap-2'>
                    <span className='text-primary'>{item.id}.</span>
                    <div className='w-full flex justify-start items-center gap-2'>
                      <Label>Input</Label>
                      <Textarea value={item?.input} className='border-2' readOnly />
                    </div>
                    <div className='w-full flex justify-start items-center gap-2'>
                      <Label>Output</Label>
                      <Textarea value={item?.output} className='border-2' readOnly />
                    </div>
                    <div className='w-full flex justify-start items-center gap-2'>
                      <Label>Points</Label>
                      <Input value={item.points} className='w-20 border-2' readOnly />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-end items-center mt-5 gap-5'>
        <Button className='bg-green-400'
          onClick={() => {
            setConfirmSuccess(true);
          }
          }
        >Accept</Button>
        <Button className='bg-yellow-400'
          onClick={() => {
            setConfirmSuccess(false);
          }
          }
        >Reject</Button>
        <Button className='bg-rose-400'
          onClick={() => {
            setConfirmReason(null);
            setConfirmSuccess(null);
            setProblemVerify(null);
          }
          }
        >Close</Button>
      </div>
    </div>
    )
  }

  return (
    <main className='w-full h-full relative'>
      {loading && (
        <Loader />
      )}
      <div className={`w-full h-full relative ${loading ? 'blur' : ''}`}>
        {problemVerify != null && (
          <VerifyProblem />
        )}
        {confirmSuccess != null && (
          <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-xl z-50 border-2 p-5'>
            <header className='flex justify-center items-center mb-5 gap-2'>
              <h1>Confirm Verification</h1>
            </header>
            <Textarea value={confirmReason || ""} className='w-[350px] border-2 h-[150px] max-h-[300px]' onChange={(e) =>
              setConfirmReason(e.target.value)}
              placeholder='Please enter the reason for verification'
            />
            <div className='w-full flex justify-center items-center mt-5 gap-5'>
              <Button className='bg-green-400'
                onClick={handleConfirmVerify}
              >Confirm</Button>
              <Button className='bg-rose-400'
                onClick={() => {
                  setConfirmSuccess(null);
                  setConfirmReason(null);
                }
                }
              >Close</Button>
            </div>
          </div>
        )}
        <Table className={`${problemVerify != null ? 'blur' : ''}`}>
          <TableCaption>A list of verification.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>status</TableHead>
              <TableHead>timestamp</TableHead>
              <TableHead>manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <SkeletonLoading />
            )
              : (data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{(() => {
                    const diff = Date.now() - new Date(item?.updatedAt || Date.now()).getTime();
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
                  })()}</TableCell>
                  <TableCell>
                    <Button variant="ghost"
                      onClick={() => {
                        setProblemVerify(item);
                        console.log(item);
                      }}
                    >
                      <ListCheck />
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              )))}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                <span className='flex justify-end items-center gap-2 '>
                  <ListOrdered />{data.length}
                </span>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </main>
  )
}
