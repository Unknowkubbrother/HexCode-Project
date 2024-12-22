"use client";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

const SolutionType: {
  [type: number]: string;
} = {
  1: "Array",
  2: "String",
  3: "Linked List",
  4: "Tree",
  5: "Dynamic Programming",
};

const FilterProblems = () => {
  const searchParams = useSearchParams();
  const [selectedSolve, setselectedSolve] = useState<boolean | undefined>(undefined);
  const [selectedUnSolve, setselectedUnSolve] = useState<boolean | undefined>(undefined);
  const [selectedDifficulty, setselectedDifficulty] = useState<number[]>([]);
  const [selectedSolutionType, setselectedSolutionType] = useState<number[]>(
    []
  );
  const router = useRouter();
  const pathname = usePathname();

  const createQueryParams = () => {
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");
    const params = new URLSearchParams();
    if (page) {
      params.set("page", page);
    }
    if (pageSize) {
      params.set("pageSize", pageSize);
    }
    if (selectedSolve !== undefined) {
      params.set("solve", selectedSolve.toString());
    }
    if (selectedUnSolve !== undefined) {
      params.set("unsolve", selectedUnSolve.toString());
    }
    if (selectedDifficulty.length > 0) {
      params.set("difficulty", selectedDifficulty.join(","));
    }
    if (selectedSolutionType.length > 0) {
      params.set("type", selectedSolutionType.join(","));
    }
    return params.toString();
  };

  useEffect(() => {
    const solve = searchParams.get("solve");
    const unsolve = searchParams.get("unsolve");
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");

    if (solve) {
      setselectedSolve(solve === "true");
    }
    if (unsolve) {
      setselectedUnSolve(unsolve === "true");
    }
    if (difficulty) {
      setselectedDifficulty(difficulty.split(",").map((v) => Number(v)));
    }
    if (type) {
      setselectedSolutionType(type.split(",").map((v) => Number(v)));
    }

  }, []);

  useEffect(() => {
    const search = createQueryParams();
    router.push(pathname + "?" + search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSolve,selectedUnSolve, selectedDifficulty, selectedSolutionType]);

  return (
    <div className="w-full flex flex-col gap-3 p-6">
      <nav
        id="status"
        className="flex flex-col gap-3 border-b-[1px] border-[#9CA3AF] pb-3"
      >
        <span>STATUS</span>
        <ul className="flex flex-col gap-2">
          <li className="flex justify-start items-center gap-2">
            <Checkbox
              id="solved"
              checked={selectedSolve == true}
              onCheckedChange={(checked) =>
                checked
                  ? setselectedSolve(true)
                  : setselectedSolve(undefined)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sovled
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox
              id="unsolved"
              checked={selectedUnSolve == true}
              onCheckedChange={(checked) =>
                checked
                  ? setselectedUnSolve(true)
                  : setselectedUnSolve(undefined)
              }
            />
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
            <Checkbox
              id="Easy"
              checked={selectedDifficulty.includes(1)}
              onCheckedChange={(checked) =>
                checked
                  ? setselectedDifficulty([...selectedDifficulty, 1])
                  : setselectedDifficulty(
                      selectedDifficulty.filter((v) => v !== 1)
                    )
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Easy
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox
              id="Medium"
              checked={selectedDifficulty.includes(2)}
              onCheckedChange={(checked) =>
                checked
                  ? setselectedDifficulty([...selectedDifficulty, 2])
                  : setselectedDifficulty(
                      selectedDifficulty.filter((v) => v !== 2)
                    )
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Medium
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox
              id="Hard"
              checked={selectedDifficulty.includes(3)}
              onCheckedChange={(checked) =>
                checked
                  ? setselectedDifficulty([...selectedDifficulty, 3])
                  : setselectedDifficulty(
                      selectedDifficulty.filter((v) => v !== 3)
                    )
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hard
            </label>
          </li>

          <li className="flex justify-start items-center gap-2">
            <Checkbox
              id="Expert"
              checked={selectedDifficulty.includes(4)}
              onCheckedChange={(checked) =>
                checked
                  ? setselectedDifficulty([...selectedDifficulty, 4])
                  : setselectedDifficulty(
                      selectedDifficulty.filter((v) => v !== 4)
                    )
              }
            />
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
          {Object.entries(SolutionType).map(([k, v]) => {
            return (
              <li className="flex justify-start items-center gap-2" key={k}>
                <Checkbox
                  id={k}
                  checked={selectedSolutionType.includes(Number(k))}
                  onCheckedChange={(checked) =>
                    checked
                      ? setselectedSolutionType([
                          ...selectedSolutionType,
                          Number(k),
                        ])
                      : setselectedSolutionType(
                          selectedSolutionType.filter((e) => e !== Number(k))
                        )
                  }
                />
                <label
                  htmlFor={k}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {v}
                </label>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default FilterProblems;
