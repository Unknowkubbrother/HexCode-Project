import Problem from "./_components/Problem";
export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string, challengeId: string }>;
}) {
  const problemId : string = (await params).problemId;
  const challengeId : string = (await params).challengeId;

  return (
    <div className="w-full h-full">
      <Problem problemId={problemId} challengeId={challengeId}/>
    </div>
  );
}
