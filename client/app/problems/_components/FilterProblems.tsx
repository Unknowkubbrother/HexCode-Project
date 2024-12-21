import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const SolutionType : {
    [type: number]: string;
} = {
    1: "Array",
    2: "String",
    3: "Linked List",
    4: "Tree",
    5: "Dynamic Programming",
}

const FilterProblems = () => {
  return (
    <div className="w-full flex flex-col gap-3 p-6">
      <nav
        id="status"
        className="flex flex-col gap-3 border-b-[1px] border-[#9CA3AF] pb-3"
      >
        <span>STATUS</span>
        <ul className="flex flex-col gap-2">
          <li className="flex justify-start items-center gap-2">
            <Checkbox id="solved" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sovled
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox id="solved" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              UnSovled
            </label>
          </li>
        </ul>
      </nav>

      <nav
        id="difficulty"
        className="flex flex-col gap-3  border-b-[1px] border-[#9CA3AF] pb-3"
      >
        <span>DIFFICULTY</span>
        <ul className="flex flex-col gap-2">
          <li className="flex justify-start items-center gap-2">
            <Checkbox id="Easy" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Easy
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox id="Medium" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Medium
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox id="Hard" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hard
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox id="Expert" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Expert
            </label>
          </li>
        </ul>
      </nav>

      <nav
        id="SolutionType"
        className="flex flex-col gap-3  border-b-[1px] pb-3"
      >
        <span>SOLUTION TYPES</span>
        <ul className="flex flex-col gap-2">

            {Object.entries(SolutionType).map(([k,v])=> {
                return (
                    <li className="flex justify-start items-center gap-2" key={k}>
                        <Checkbox id={k} />
                        <label
                            htmlFor={k}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {v}
                        </label>
                    </li>
                )
            })}

        </ul>
      </nav>

    </div>
  );
};

export default FilterProblems;
