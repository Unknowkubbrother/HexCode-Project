import CountDownTimer from "@/components/ui/CountDownTimer";
import ItemProblem from "../_components/ItemProblem";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getChallengesById, getLeaderboardById } from "@/actions/challengeAction";
import { redirect } from "next/navigation";
import { IChallengeProblem, IPlayer, IChallenge } from "@/interface/challenges";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ challengeId: string }>;
}) {
    const challengeId: string = (await params).challengeId;

    const { result, isJoined }: { result: IChallenge, isJoined: boolean } = await getChallengesById(challengeId);

    if (!isJoined) {
        return redirect(`/challenges/${challengeId}`);
    }

    const leaderboard = await getLeaderboardById(challengeId);

    if (!leaderboard || !leaderboard.result) {
        return redirect(`/challenges/${challengeId}`);
    }

    return (
        <main className="w-full h-full">
            <header className="w-full flex justify-between px-10 mt-5">
                <span className="text-xl font-bold">{result?.title || "HEXCODE Challenge"}</span>
                <span className="flex justify-center items-center gap-3 text-lg">
                    <span className="text-primary">TIME LEFT - </span>
                    {result && <CountDownTimer date={Number(result?.endTime || 0)} className="text-rose-400" />}
                </span>
            </header>
            <div className="w-full px-10 grid grid-cols-2 mt-10 gap-x-10">
                <div className="w-full h-fit overflow-y-auto">
                    <div className="w-full h-fit grid grid-cols-1 gap-3">
                        {(result && result.problem && result.problem.length > 0) ?
                            (
                                (result.problem as IChallengeProblem[]).map((problem: IChallengeProblem, index: number) => (
                                    <ItemProblem key={index} data={problem} challengeId={challengeId}/>
                                ))
                            )
                            : <p>No problem available</p>}
                    </div>
                </div>

                {/*  */}
                <div className="w-full h-fit flex flex-col gap-5">
                    <div className="w-full h-[500px] bg-bgsecondary rounded-lg p-5 overflow-hidden">
                        <div className="w-full flex justify-center items-center flex-col gap-2 mb-2">
                            <h1 className="text-lg font-semibold">LeaderBoard</h1>
                            <Link href={`/challenges/${challengeId}/leaderboard`} className="hover:text-primary text-xs">REALTIME (CLICK)</Link>
                        </div>
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
                                        leaderboard?.result?.map((player: IPlayer, index: number) => (
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
                                        )) || <p>No leaderboard data available</p>
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="w-full h-fit bg-bgsecondary rounded-lg p-5">
                        <div className="w-full flex justify-center items-center"><h1 className="text-lg font-semibold">Player</h1></div>
                        <div className="w-full grid grid-cols-7 mt-5 gap-y-5">
                            {(result && result.player && result.player.length > 0) ?
                                (
                                    (result.player as unknown as IPlayer[]).map((player: IPlayer, index: number) => (
                                        <div className="flex flex-col justify-center items-center gap-3" key={index}>
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={player.avatar} alt={player.username} />
                                                <AvatarFallback>{player.username}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs">{player.username}</span>
                                        </div>
                                    ))
                                )
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>
        </main>
    );
}
