import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListProblemInterface } from "@/interface/problems";
import StatusDifficulty from "@/components/ui/StatusDifficulty";

export default function ItemProblem ({ value }: { value: ListProblemInterface }) {

  return (
    <div
      key={value.id}
      className="w-full bg-bgsecondary h-fit rounded-2xl p-3 flex flex-col gap-1 relative"
    >
      <span className="flex gap-2 justify-start items-center">
        <span className="text-lg font-mono">{value.title}</span>
        <StatusDifficulty difficulty={value.difficulty} />
        <span className="flex justify-center items-center gap-1 text-sm">
           <span>{value.points}</span>
           <span>Points</span>
          </span>
      </span>
      <div className="w-full flex gap-3 justify-start items-center">
        <span>
          <span className="text-rose-500">Success Rate</span>
          <span> : {Number(value.successRate).toFixed(3)}%</span>
        </span>
        <span>
          <span className="text-green-500">Accpeted</span>
          <span> : {value.accepted}</span>
        </span>
        <span>
          <span className="text-yellow-500">Submissions</span>
          <span> : {value.submissions}</span>
        </span>
      </div>
      <span className="flex justify-start items-center gap-2">
        <Avatar className="h-5 w-5">
          <AvatarImage src={value?.author?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link href={`/profile/${value?.author?.name}`} className="hover:text-primary duration-300"> {value?.author?.name}</Link>
      </span>

      <Link href={`/problems/${value.id}`} passHref>
      <Button variant="default" size="sm" asChild className="absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer"
      >
        <span>Solve problem</span>
      </Button></Link>
    </div>
  );
};
