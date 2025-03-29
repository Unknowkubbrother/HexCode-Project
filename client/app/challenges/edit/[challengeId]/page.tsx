import EditChallenge from "./_components/EditChallenge";
import { getChallengeEditById } from "@/actions/challengeAction";

export default async function Page({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const challengeId : string = (await params).challengeId;
  const {result} = await getChallengeEditById(challengeId);

  return (
    <EditChallenge challengeData={result}/>
  );
}
