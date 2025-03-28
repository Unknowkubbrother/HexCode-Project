import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatusDifficulty from "@/components/ui/StatusDifficulty";
import { ListProblemInterface } from "@/interface/problems";

export default function ItemProblem({ problem, itself }: { problem: ListProblemInterface, itself: boolean }) {

  return (
    <div
      className="w-full bg-bgsecondary h-fit rounded-2xl px-3 py-5 flex flex-col gap-1 relative"
    >
      <span className="flex gap-2 justify-start items-center">
        <span className="font-semibold">{problem?.title}</span>
        <StatusDifficulty difficulty={problem?.difficulty} />
        <span className="px-2 py-1 rounded-lg border-2 border-primary text-xs">{problem.viewer}</span>
        <span className="flex justify-center items-center gap-1 text-sm">
          <span>{problem.points}</span>
          <span>Points</span>
        </span>
      </span>
      <div className="w-full flex gap-3 justify-start items-center">
        <span>
          <span className="text-rose-500">Success Rate</span>
          <span> : {Number(problem.successRate).toFixed(3)}%</span>
        </span>
        <span>
          <span className="text-green-500">Accepted</span>
          <span> : {problem.accepted}</span>
        </span>
        <span>
          <span className="text-yellow-500">Submissions</span>
          <span> : {problem.submissions}</span>
        </span>
      </div>


      <div className="absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 flex justify-center items-center gap-3">
        <Link href={`/problems/${problem.id}`} passHref>
          <Button variant="default" size="sm" asChild className="hover:scale-105 duration-300 cursor-pointer"
          >
            <span>Solve problem</span>
          </Button>
        </Link>
        {itself && (
          <Link href={`/problems/edit/${problem.id}`} passHref>
            <Button variant="default" size="sm" className="bg-yellow-500 hover:scale-105 duration-300">
              <span>Edit</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
