import EditProblem from "./_components/EditProblem";
import { getProblemEditById } from "@/actions/problemAction";
export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const problemId : string = (await params).problemId;
    const {result} = await getProblemEditById(problemId);

  return (
    <div className="w-full h-full">
        <main className="w-[90%] m-auto flex flex-col gap-10">
            <EditProblem problemData={result} />
        </main>
    </div>
  );
}
