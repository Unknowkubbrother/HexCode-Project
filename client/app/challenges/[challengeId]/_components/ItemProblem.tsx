
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { ListProblemInterface } from "@/interface/problems";
import StatusDifficulty from "@/components/ui/StatusDifficulty";

export default function ItemProblem (){

  return (
    <div
      // key={key}
      className="w-full bg-bgsecondary h-fit rounded-2xl p-5 flex flex-col gap-1 relative"
    >
      <span className="flex gap-2 justify-start items-center">
        <span className="text-lg font-mono">Problem 1</span>
        <StatusDifficulty difficulty={2} />
        <span className="flex justify-center items-center gap-1 text-sm">
           <span>{50}</span>
           <span>Points</span>
          </span>
      </span>

      <Link href={`/challenges/123/67ac9ee19f9d74872a80119b`} passHref>
      <Button variant="default" size="sm" asChild className="absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer"
      >
        <span>Solve problem</span>
      </Button></Link>
    </div>
  );
};
