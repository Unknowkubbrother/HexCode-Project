import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProblemInterface } from "@/interface/problems";

const ColorProblem: {
  [key: string]: string;
} = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-red-500",
};

const ItemProblem = ({ value }: { value: ProblemInterface }) => {
  return (
    <div
      key={value.id}
      className="w-full bg-stone-100 dark:bg-bgsecondary h-fit rounded-2xl p-3 flex flex-col gap-1 relative"
    >
      <span className="flex gap-2 justify-start items-center">
        <span className="text-lg font-mono">{value.title}</span>
        <span
          className={`${ColorProblem[value.difficulty]} rounded-md p-1 text-xs`}
        >
          {value.difficulty}
        </span>
        <span className="flex justify-center items-center gap-1 text-sm">
           <span>{value.point}</span>
           <span>Points</span>
          </span>
      </span>
      <div className="w-full flex gap-3 justify-start items-center">
        <span>
          <span className="text-rose-500">Success Rate</span>
          <span> : {value.successRate}%</span>
        </span>
        <span>
          <span className="text-green-500">Accpted</span>
          <span> : {value.accepted}</span>
        </span>
        <span>
          <span className="text-yellow-500">Submissions</span>
          <span> : {value.submissions}</span>
        </span>
      </div>
      <span className="flex justify-start items-center gap-2">
        <Avatar className="h-5 w-5">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span> {value.author.name}</span>
      </span>

      <Link href={`/problem/${value.id}`} passHref>
      <Button variant="default" size="sm" asChild className="absolute top-1/2 right-0 transform -translate-x-1/4 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer"
      >
        <span>Solve problem</span>
      </Button></Link>
    </div>
  );
};

export default ItemProblem;
