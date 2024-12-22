"use server";
import ItemProblem from "./ItemProblem";
import { ProblemInterface } from "@/interface/problems";

interface Props {
  result : [];
}

export default async function ListProblems({result} : Props) {


    return (
    <div className="w-full h-fit max:h-[2000px] overflow-y-auto">
      <div className="w-full h-fit grid grid-cols-1 gap-3">
        {result.map((value: ProblemInterface) => (
          <ItemProblem value={value} key={value.id} />
        ))}
      </div>
    </div>
  );
}
