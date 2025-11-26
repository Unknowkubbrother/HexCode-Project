import Hub from "./_components/Hub";
import {getChallengesById} from "@/actions/challengeAction";

export default async function Page({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const challengeId: string = (await params).challengeId;
  const {result,isJoined} = await getChallengesById(challengeId);

  return (
    <main >
      <Hub data={result} isJoined={isJoined}/>
    </main>
  );
}
