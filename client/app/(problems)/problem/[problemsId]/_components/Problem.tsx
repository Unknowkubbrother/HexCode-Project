import Header from "./Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabProblem from "./TabProblem";

interface Props {
  params: {
    problemsId: string;
  };
}

export default async function Problem({ params }: Props) {
  const { problemsId } = await params;

  return (
    <div className="w-full h-full flex flex-col">
      <Header problemsId={problemsId} />
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
              <TabProblem problemsId={problemsId} />
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
