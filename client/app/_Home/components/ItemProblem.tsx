import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface ItemProblemProps {
  id: string;
  title: string;
  difficulty: string;
  successRate: number;
  accpted: number;
  submissions: number;
  author: string;
}

const ColorProblem: {
  [key: string]: string;
} = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-red-500",
};

const ItemProblem = ({ value }: { value: ItemProblemProps }) => {
  return (
    <div
      key={value.id}
      className="w-full bg-bgsecondary h-fit rounded-lg p-3 flex flex-col gap-1 relative"
    >
      <span className="flex gap-3 justify-start items-center">
        <h1 className="text-lg">{value.title}</h1>
        <span
          className={`${ColorProblem[value.difficulty]} rounded-md p-1 text-xs`}
        >
          {value.difficulty}
        </span>
      </span>
      <div className="w-full flex gap-3 justify-start items-center">
        <span>
          <span className="text-rose-500">Success Rate</span>
          <span> : {value.successRate}%</span>
        </span>
        <span>
          <span className="text-green-500">Accpted</span>
          <span> : {value.accpted}</span>
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
        <span> {value.author}</span>
      </span>

      <Button variant="default" size="sm" asChild className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer">
        <span>Solve</span>
      </Button>
    </div>
  );
};

export default ItemProblem;
