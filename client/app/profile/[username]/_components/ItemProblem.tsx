import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatusDifficulty from "@/components/ui/StatusDifficulty";

export default function ItemProblem() {

  return (
    <div
      className="w-full bg-bgsecondary h-fit rounded-2xl px-3 py-5 flex flex-col gap-1 relative"
    >
      <span className="flex gap-2 justify-start items-center">
        <span className="font-semibold">Premutaion Bro</span>
        <StatusDifficulty difficulty={2} />
        <span className="px-2 py-1 rounded-lg border-2 border-primary text-xs">Private</span>
        <span className="flex justify-center items-center gap-1 text-sm">
          <span>{100}</span>
          <span>Points</span>
        </span>
      </span>
      <div className="w-full flex gap-3 justify-start items-center">
        <span>
          <span className="text-rose-500">Success Rate</span>
          <span> : {50}%</span>
        </span>
        <span>
          <span className="text-green-500">Accpted</span>
          <span> : {100}</span>
        </span>
        <span>
          <span className="text-yellow-500">Submissions</span>
          <span> : {200}</span>
        </span>
      </div>


      <div className="absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 flex justify-center items-center gap-3">
        <Link href={`/problems/1`} passHref>
          <Button variant="default" size="sm" asChild className="hover:scale-105 duration-300 cursor-pointer"
          >
            <span>Solve problem</span>
          </Button>
        </Link>
        <Button size="sm" variant="default" className="bg-yellow-500 hover:scale-105 duration-300">
          <span>Edit</span>
        </Button>
      </div>
    </div>
  );
};
