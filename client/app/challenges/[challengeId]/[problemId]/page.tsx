import Problem from "./_components/Problem";

export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const problemId : string = (await params).problemId;
  return (
    <div className="w-full h-full">
      <Problem problemId={problemId} />
    </div>
  );
}
