import { getIsJoinedChallenge } from "@/actions/challengeAction";
import { redirect } from "next/navigation";
import LeaderBoard from "../_components/LeaderBoard";
import { getChallengesById} from "@/actions/challengeAction";
export default async function Page({
    params,
}: {
    params: Promise<{ challengeId: string }>;
}) {
    const challengeId: string = (await params).challengeId;
    const {result} = await getChallengesById(challengeId);

    const {isJoined} = await getIsJoinedChallenge(challengeId);

    if (!isJoined) {
        return redirect(`/challenges/${challengeId}`);
    }

    return (
        <main className="w-full h-full">
          <LeaderBoard challengeId={challengeId} challenge={result}/>
        </main>
    );
}
