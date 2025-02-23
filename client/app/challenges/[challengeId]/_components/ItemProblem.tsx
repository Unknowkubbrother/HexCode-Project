
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatusDifficulty from "@/components/ui/StatusDifficulty";
import { IChallengeProblem } from '@/interface/challenges'

export default function ItemProblem({ data, challengeId }: { data: IChallengeProblem, challengeId: string }) {

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

      <Link href={`/challenges/${challengeId}/${data.problemId}`} passHref>
        <Button variant="default" size="sm" asChild className="absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer"
        >
          <span>Solve problem</span>
        </Button></Link>
    </div>
  );
};
