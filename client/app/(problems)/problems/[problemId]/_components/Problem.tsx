import Header from "./Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabProblem from "./TabProblem";
import { getProblemById } from "@/actions/problemAction";

export default async function Problem({ problemId }: {problemId : string}) {
  const { result } = await getProblemById(problemId);

  return (
    <div className="w-full h-full flex flex-col">
      <Header title={result?.title} points={result?.maxPoints/2} maxPoints={result?.maxPoints} submissions={result?.submissions} difficulty={result?.difficulty}/>
      <div className="w-full h-fit p-2">
        <Tabs defaultValue="problem" className="w-full">
          <header className="w-full flex">
            <TabsList className="rounded-lg p-1">
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
          </header>
          <div className="w-full h-fit rounded-b-lg rounded-lg mt-2">
            <TabsContent value="problem">
              <TabProblem problemData={result}/>
            </TabsContent>
            <TabsContent value="submissions">
              Change your password here.
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
