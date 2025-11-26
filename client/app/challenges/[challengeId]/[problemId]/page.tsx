import Problem from "./_components/Problem";
import { getProblemById } from "@/actions/problemAction";
import { getChallengesById} from "@/actions/challengeAction";
import { redirect } from "next/navigation";
import {IChallengeProblem} from "@/interface/challenges";

export default async function Page({
  params,
}: {
  params: Promise<{ problemId: string, challengeId: string }>;
}) {
  const problemId: string = (await params).problemId;
  const challengeId: string = (await params).challengeId;
  const { result } = await getProblemById(problemId);
  const challenge = await getChallengesById(challengeId);

  if (!challenge.isJoined) {
    return redirect(`/challenges/${challengeId}`);
  }

  if (!challenge.result.problem.filter((problem: IChallengeProblem) => problem.problemId === problemId)) {
    return redirect(`/challenges/${challengeId}`);
  }

  return (
    <div className="w-full h-full">
      <Problem problemData={result} challengeData={challenge.result} problemId={problemId}/>
    </div>
  );
}
