import Navigate from "./Navigate";
import { Progress } from "@/components/ui/progress";
import StatusDifficulty from "@/components/ui/StatusDifficulty";

interface HeaderProps {
  title: string;
  points: number;
  maxPoints: number;
  submissions: number;
  difficulty: number;
}

export default function Header({ title, points, maxPoints, submissions, difficulty }: HeaderProps) {

  return (
    <div className="w-full h-fit py-5 bg-bgsecondary flex justify-around items-center">
      <div className="flex flex-col gap-2">
        <Navigate problemName={title} />
        <h1 className="text-xl font-semibold tracking-wide">
           {title}
        </h1>
      </div>
      <div className="w-fit flex flex-col gap-2">
        <div className="flex justify-between items-center gap-3">
            <StatusDifficulty difficulty={difficulty}/>
          <span className="text-sm text-[#9CA3AF]">
            Points : <span className="dark:text-white text-black w-[5ch]">{points} / {maxPoints}</span>
          </span>
          <span className="text-sm text-[#9CA3AF]">
            Submissions : <span className="dark:text-white text-black w-[5ch]">{submissions}</span>
          </span>
        </div>
        <Progress value={points} max={maxPoints} />
      </div>
    </div>
  );
}
