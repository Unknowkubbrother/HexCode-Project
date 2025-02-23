import { getIsJoinedChallenge } from "@/actions/challengeAction";
import { redirect } from "next/navigation";
import LeaderBoard from "../_components/LeaderBoard";

export default async function Page({
    params,
}: {
    params: Promise<{ challengeId: string }>;
}) {
    const challengeId: string = (await params).challengeId;

    const {isJoined} = await getIsJoinedChallenge(challengeId);

    if (!isJoined) {
        return redirect(`/challenges/${challengeId}`);
    }

    return (
        <main className="w-full h-full">
          <LeaderBoard challengeId={challengeId} />
        </main>
    );
}
