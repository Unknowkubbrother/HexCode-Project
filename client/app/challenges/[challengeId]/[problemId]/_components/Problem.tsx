import Header from "./Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabProblem from "./TabProblem";
import { getProblemById } from "@/actions/problemAction";
import Submissions from "./Submissions";
import { getChallengesById} from "@/actions/challengeAction";
import { redirect } from "next/navigation";
import {IChallengeProblem} from "@/interface/challenges";

export default async function Problem({ problemId , challengeId}: {problemId : string ,challengeId : string}) {
  const { result } = await getProblemById(problemId);
  const challenge = await getChallengesById(challengeId);

  if (!challenge.isJoined) {
    return redirect(`/challenges/${challengeId}`);
  }

  if (!challenge.result.problem.filter((problem: IChallengeProblem ) => problem.problemId === problemId)) {
    return redirect(`/challenges/${challengeId}`);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header title={result?.title} points={result?.myMaxPoints} maxPoints={result?.maxPoints} difficulty={result?.difficulty} challengeData={challenge.result}/>
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
              <Submissions problemId={problemId}/>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
