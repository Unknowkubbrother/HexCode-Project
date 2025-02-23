"use client";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import MarkDown from "@/components/ui/MarkDown";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Gift, Users, NotebookTabs } from 'lucide-react';
import Image from 'next/image';
import { IChallenge, IPlayer } from "@/interface/challenges";
import { JoinChallenge, LeaveChallenge } from "@/actions/challengeAction"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Hub({ data, isJoined }: { data: IChallenge, isJoined: boolean }) {
  const router = useRouter();

  const [Joined, setJoined] = useState<boolean>(isJoined);
  const [secretCode, setSecretCode] = useState<string>("");
  const [isShowInputSecrectCode, setIsShowInputSecrectCode] = useState<boolean>(false);


  const coverTimeString = (time: number) => {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

  const handlerJoinChallenge = async () => {
    let result;

    if (data.viewer == 'private') {
      result = await JoinChallenge(data._id, secretCode);
    } else {
      result = await JoinChallenge(data._id);
    }

    if (result) {
      toast.success("Join Challenge Successfully!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setJoined(true);
      setIsShowInputSecrectCode(false);
      setTimeout(() => {
        router.push(`/challenges/${data._id}/lobby`)
      }, 1500);
    } else {
      toast.error("Join Challenge Fail!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handlerLeaveChallenge = async () => {
    const result = await LeaveChallenge(data._id);

    if (result) {
      toast.success("Leave Challenge Successfully!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setJoined(false);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Leave Challenge Fail!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <main className="w-full h-full relative">
      <div className={`w-full h-full flex flex-col gap-10 mt-10 ${isShowInputSecrectCode ? 'blur' : ''}`}>
        <header className="w-full flex justify-between px-10 items-center">
          <span className="flex gap-3 items-center justify-center">
            <span className="text-2xl font-bold">{data.title}</span>
            <span className="p-1 border-2 rounded-lg border-primary text-xs">{data.viewer}</span>
            <span className="text-lg font-semibold text-primary">
              <span>Opening time - </span>
              <span className="text-green-400">Now - {coverTimeString(Number(data.startTime))}</span>
            </span>
          </span>
          <div className="flex justify-start items-center gap-3">
            {Joined &&
              <Button
                onClick={() => router.push(`/challenges/${data._id}/lobby`)}
              >
                Go To Lobby
              </Button>
            }
            {!Joined ?
              <Button
                onClick={() => 
                  data.viewer == 'private' ? setIsShowInputSecrectCode(true) : handlerJoinChallenge()
                }
              >Join Challenge</Button>
              :
              <Button
                onClick={handlerLeaveChallenge}
                className="bg-rose-400"
              >Leave Challenge</Button>
            }
          </div>
        </header>
        <div className="w-[90%] m-auto flex justify-center items-center">
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {data.images.map((img, index) => (
                <CarouselItem
                  key={index}
                  className={`pl-3 md:basis-1/2 ${data.images.length < 4 ? `lg:basis-1/${data.images.length}` : `lg:basis-1/4`} h-[320px]`}
                >
                  <Image src={String(img)} unoptimized alt="promote" width={100} height={100} className="w-full h-full object-contain rounded-lg" key={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-[90%] m-auto flex flex-col">
          <span className="text-lg font-semibold flex justify-start items-center gap-1 mb-3">
            <NotebookTabs />
            <span>Detail Challenge</span>
          </span>
          <MarkDown data={data.description} />
        </div>

        <div className="w-[90%] m-auto flex flex-col">
          <span className="text-lg font-semibold flex justify-start items-center gap-1">
            <Users />
            <span>Player Joined</span>
          </span>
          <div className="w-full flex justify-start items-center gap-5 mt-5 flex-wrap">
            {Array.isArray(data.player) && data.player.length === 0 ? (
              <span className="text-lg font-semibold">No player joined</span>
            ) : (
              (data.player as unknown as IPlayer[])?.map((player: IPlayer, index: number) => (
                <Avatar key={index} className="w-10 h-10">
                  <AvatarImage src={player.avatar} alt={player.username} />
                  <AvatarFallback>{player.username}</AvatarFallback>
                </Avatar>
              ))
            )}
          </div>
        </div>


        <div className="w-[90%] m-auto flex flex-col gap-3">
          <span className="text-lg font-semibold flex justify-start items-center gap-1">
            <Gift />
            <span>Rewards</span>
          </span>
          <div className="w-full ml-5 flex flex-col gap-3">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Order</TableHead>
                  <TableHead className="text-center">rewards</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  data.reward?.map((reward, index) => (
                    <TableRow key={index} className={`${index % 2 === 1 ? 'bg-bgsecondary' : ''}`}>
                      <TableCell className="font-medium text-center">#{index + 1}</TableCell>
                      <TableCell className="text-center">{reward}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>

          </div>

        </div>
      </div>

      {isShowInputSecrectCode &&
        <div className="w-[500px] bg-bgsecondary fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col justify-start items-center gap-5 p-3">
          <header>
            <h1>Secret Code</h1>
          </header>
          <Input type="text" placeholder="Enter Secret Code" onChange={(e) => setSecretCode(e.target.value)} className="border-2 border-primary text-center" />
          <Button
            onClick={handlerJoinChallenge}
          >
            Join
          </Button>
        </div>}
    </main>
  );
}
