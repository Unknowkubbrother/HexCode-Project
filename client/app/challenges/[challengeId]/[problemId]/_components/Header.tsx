import Navigate from "./Navigate";
import { Progress } from "@/components/ui/progress";
import StatusDifficulty from "@/components/ui/StatusDifficulty";
import CountDownTimer from "@/components/ui/CountDownTimer";
import {IChallenge} from '@/interface/challenges';
interface HeaderProps {
  title: string;
  points: number;
  maxPoints: number;
  difficulty: number;
  challengeData: IChallenge;
}

export default function Header({ title, points, maxPoints,difficulty , challengeData}: HeaderProps) {

  return (
    <div className="w-full h-fit py-5 bg-bgsecondary flex justify-around items-center">
      <div className="flex flex-col gap-2">
        <Navigate problemName={title} />
        <h1 className="text-xl font-semibold tracking-wide">
           {title}
        </h1>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <span>Time Left</span>
        <CountDownTimer date={Number(challengeData.endTime)} className="text-lg text-primary"/>
      </div>
      <div className="w-fit flex flex-col gap-2">
        <div className="flex justify-start items-center gap-3">
            <StatusDifficulty difficulty={difficulty}/>
          <span className="text-sm text-[#9CA3AF]">
            Points : <span className="dark:text-white text-black w-[5ch]">{points} / {maxPoints || 100}</span>
          </span>
        </div>
        <Progress value={(points / Number(maxPoints)) * 100} max={100} className="w-[300px]"/>
      </div>
    </div>
  );
}
