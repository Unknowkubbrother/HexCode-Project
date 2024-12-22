import PaginationBar from "./PaginationBar";
import FilterProblems from "./FilterProblems";
import { Suspense } from "react";
import ListProblems from "./ListProblems";
import { SkeletonListProblem } from "@/components/ui/SkeletonTemplate";
import { getProblem } from "@/actions/problemAction";

interface Props {
  searchParams : {[key: string]: string | string[] | undefined }
}

const Problems = async ({searchParams} : Props) => {
  const { result , totalCounts} = await getProblem(searchParams);

  return (
    <main className="w-full h-full flex flex-col">
      <header className="w-full flex flex-col">
        <h1 className="text-2xl font-bold">Problems</h1>
      </header>
      <section className="w-full gap-5 mt-5 flex">
        <div className="w-[75%] h-fit">
          <Suspense fallback={<SkeletonListProblem/>}>
             <ListProblems result={result}/>
          </Suspense>
          <div className="mt-5">
            <PaginationBar totalCounts={totalCounts}/>
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
