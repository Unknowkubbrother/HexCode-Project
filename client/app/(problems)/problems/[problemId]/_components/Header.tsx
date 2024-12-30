/* eslint-disable @typescript-eslint/no-unused-vars */
import Navigate from "./Navigate";
import { Progress } from "@/components/ui/progress";

export default function Header({ problemId }: { problemId: string }) {
    const points = 30;
    const maxPoints = 100;  

  return (
    <div className="w-full h-fit py-5 bg-bgsecondary flex justify-around items-center">
      <div className="flex flex-col gap-2">
        <Navigate problemName="Array Sum" />
        <h1 className="text-xl font-semibold tracking-wide">
            Array Sum
        </h1>
      </div>
      <div className="w-fit flex flex-col gap-2">
        <div className="flex justify-between items-center gap-3">
            <span className="text-[10px] p-1 rounded-md bg-green-500 text-white">EASY</span>
          <span className="text-sm text-[#9CA3AF]">
            Points : <span className="dark:text-white text-black w-[5ch]">{points} / {maxPoints}</span>
          </span>
          <span className="text-sm text-[#9CA3AF]">
            Submissions : <span className="dark:text-white text-black w-[5ch]">{10}</span>
          </span>
        </div>
        <Progress value={points} max={maxPoints} />
      </div>
    </div>
  );
}
