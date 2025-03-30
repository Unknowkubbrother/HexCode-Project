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
import { ListCheck, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IProblem } from "@/interface/problems";
import { Skeleton } from "@/components/ui/skeleton";
import { CodeBlock } from "@/components/ui/code-block";

export default function MangeVerify() {
  const [data, setData] = useState<IProblem[]>([]);
  const [problemVerify, setProblemVerify] = useState<IProblem | null>(null);

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


    return (<div className="fixed top-1/2 left-1/2 -mt-[22rem] -ml-[44rem] dark:bg-background bg-bgsecondary rounded-xl z-50 border-2 p-5">
      <h1>Verification</h1>
      <div className='w-full flex justify-between items-center'>
        
      </div>
    </div>
    )
  }


  return (
    <main className='w-full h-full relative'>
      {problemVerify != null && (
        <VerifyProblem />
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
    </main>
  )
}
