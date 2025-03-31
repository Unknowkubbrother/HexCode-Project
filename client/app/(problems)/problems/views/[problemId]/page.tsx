import Submissions from "./_components/Submissions";

export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const problemId : string = (await params).problemId;


  return (
    <div className="w-full h-full">
        <main className="w-[90%] m-auto flex flex-col gap-10">
            <Submissions problemId={problemId}/>
        </main>
    </div>
  );
}
