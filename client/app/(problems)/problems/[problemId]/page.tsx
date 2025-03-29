import Problem from "./_components/Problem";
import { getProblemById } from "@/actions/problemAction";
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const problemId : string = (await params).problemId;
  const {result} = await getProblemById(problemId);

  if (result.viewer == "challenge") {
    redirect('/problems');
  }
  

  return (
    <div className="w-full h-full">
      <Problem result={result} problemId={problemId}/>
    </div>
  );
}
