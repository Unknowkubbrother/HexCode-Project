import Problem from "./_components/Problem";
import { getProblemById } from "@/actions/problemAction";

export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const problemId : string = (await params).problemId;
  const {result} = await getProblemById(problemId);
  

  return (
    <div className="w-full h-full">
      <Problem result={result} problemId={problemId}/>
    </div>
  );
}
