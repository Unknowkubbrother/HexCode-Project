"use client";
import { Button } from "@/components/ui/button";
import StatusDifficulty from "@/components/ui/StatusDifficulty";
import { IChallengeProblem } from '@/interface/challenges'
import { useRouter } from 'next/navigation';

export default function ItemProblem({ data, challengeId,startTime}: { data: IChallengeProblem, challengeId: string, startTime : number }) {
  const router = useRouter();

  return (
    <div
      // key={key}
      className="w-full bg-bgsecondary h-fit rounded-2xl p-5 flex flex-col gap-1 relative"
    >
      <span className="flex gap-2 justify-start items-center">
        <span className="text-lg font-mono">{data.title}</span>
        <StatusDifficulty difficulty={Number(data.difficulty)} />
        <span className="flex justify-center items-center gap-1 text-sm">
          <span>{data.points}</span>
          <span>Points</span>
        </span>
      </span>

      {
        Date.now() < startTime ? 
        <Button variant="default" size="sm" asChild className={`absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer bg-rose-400`}
        disabled
      >
        <span>Challenge not started</span>
      </Button>
        :
        <Button variant="default" size="sm" asChild className={`absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer ${data.solved ? "bg-green-500" : "bg-primary"}`}
        onClick={() => {
          router.push(`/challenges/${challengeId}/${data.problemId}`)}
        }
      >
        <span>{data.solved ? "Solved" : "Solve Problem"}</span>
      </Button>

      }
    </div>
  );
};
