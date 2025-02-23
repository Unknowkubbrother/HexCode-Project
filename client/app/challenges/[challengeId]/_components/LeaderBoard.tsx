"use client";
import {useState,useEffect} from 'react'
import { getLeaderboardById , getChallengesById} from "@/actions/challengeAction";
import CountDownTimer from "@/components/ui/CountDownTimer";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IPlayer,IChallenge } from '@/interface/challenges';

export default function LeaderBoard({ challengeId }: { challengeId: string }) {
    const [challenge, setChallenge] = useState<IChallenge>();
    const [leaderboard, setLeaderboard] = useState<{ result: IPlayer[] }>({ result: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getLeaderboardById(challengeId);
            setLeaderboard(data);
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, [challengeId]);

    useEffect(() => {
        const fetchData = async () => {
            const {result} = await getChallengesById(challengeId);
            setChallenge(result);
        };
        fetchData();
    }, [challengeId]);

    return (
        <div className='w-full h-fit flex flex-col gap-5'>
        <header>
            <div className="w-full flex flex-col justify-center items-center gap-5 mt-5">
                <span className="text-xl font-bold">{challenge?.title}</span>
                <span className="flex justify-center items-center gap-3 text-lg">
                    <span className="text-primary">TIME LEFT - </span>
                    <CountDownTimer date={Number(challenge?.endTime)} className="text-rose-400" />
                </span>
            </div>
        </header>
        <div className="w-[80%] m-auto h-[650px] bg-bgsecondary rounded-lg p-5 overflow-hidden">
            <div className="w-full flex justify-center items-center"><h1 className="text-lg font-semibold">LeaderBoard</h1></div>
            <div className="w-full h-[400px] overflow-y-auto">
                <Table>
                    <TableCaption>A list of LeaderBoard.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Order</TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            (leaderboard.result as IPlayer[]).map((player, index) => (
                                <TableRow key={index} className={`${index % 2 === 1 ? 'bg-bgsecondary' : ''}`}>
                                    <TableCell className="font-medium text-center">#{index + 1}</TableCell>
                                    <TableCell className="text-center flex justify-center items-center gap-2">
                                        <Avatar className="w-5 h-5">
                                            <AvatarImage src={player.avatar} alt={player.username} />
                                            <AvatarFallback>{player.username}</AvatarFallback>
                                        </Avatar>
                                        <span>{player.username}</span>
                                    </TableCell>
                                    <TableCell className="text-center">{player.total}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    </div >
  )
}
