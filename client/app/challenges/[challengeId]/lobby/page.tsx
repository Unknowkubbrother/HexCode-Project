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
import { IChallengeProblem, IPlayer } from "@/interface/challenges";

export default async function Page({
    params,
}: {
    params: Promise<{ challengeId: string }>;
}) {
    const challengeId: string = (await params).challengeId;

    console.log(challengeId);
    
    const challenge = await getChallengesById(challengeId);
    const leaderboard = await getLeaderboardById(challengeId);

    if (!challenge || !challenge.result || !challenge.isJoined || !leaderboard || !leaderboard.result) {
        return redirect(`/challenges/${challengeId}`);
    }


    return (
        <main className="w-full h-full">
            <header className="w-full flex justify-between px-10 mt-5">
                <span className="text-xl font-bold">{challenge?.title || "HEXCODE Challenge"}</span>
                <span className="flex justify-center items-center gap-3 text-lg">
                    <span className="text-primary">TIME LEFT - </span>
                    {challenge?.result && <CountDownTimer date={Number(challenge?.result?.endTime || 0)} className="text-rose-400" />}
                </span>
            </header>
            <div className="w-full px-10 grid grid-cols-2 mt-10 gap-x-10">
                <div className="w-full h-fit overflow-y-auto">
                    <div className="w-full h-fit grid grid-cols-1 gap-3">
                        {
                            challenge?.result?.problem?.map((item: IChallengeProblem, index: number) => (
                                <div key={index}>
                                    <ItemProblem data={item} challengeId={challengeId} />
                                </div>
                            )) || <p>No problems found</p>
                        }
                    </div>
                </div>

                {/*  */}
                <div className="w-full h-fit flex flex-col gap-5">
                    <div className="w-full h-[500px] bg-bgsecondary rounded-lg p-5 overflow-hidden">
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
                        <div className="w-full grid grid-cols-6 mt-5 gap-y-5">
                            {
                                challenge.result?.player?.map((player: IPlayer, index: number) => (
                                    <span key={index} className="flex flex-col justify-center items-center gap-1">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={player.avatar} alt={player.username} />
                                            <AvatarFallback>{player.username}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs">{player.username}</span>
                                    </span>
                                )) || <p>No players available</p>
                            }
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>
        </main>
    );
}
