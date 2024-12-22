import ItemProblem from "./ItemProblem";
// import { example } from "./datatest";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import FilterProblems from "./FilterProblems";
import { getProblem } from "@/actions/problemAction";
import { ProblemInterface } from "@/interface/problems";

const Problems = async () => {
  const { result } = await getProblem();

  return (
    <main className="w-full h-full flex flex-col">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Problems</h1>
      </header>
      <section className="w-full gap-5 mt-5 flex">
        <div className="w-[75%] h-fit">
          <div className="w-full h-fit max:h-[2000px] overflow-y-auto">
            <div className="w-full h-fit grid grid-cols-1 gap-3">
              {result.map((value : ProblemInterface ) => (
                <ItemProblem value={value} key={value.id}/>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <PaginationWithLinks page={1} pageSize={10} totalCount={100} />
          </div>
        </div>

        <div className="w-[25%] h-fit bg-bgsecondary rounded-2xl">
          <FilterProblems />
        </div>
      </section>
    </main>
  );
};

export default Problems;
