
export default async function Page({
    params,
}: {
    params: Promise<{ challengeId: string }>;
}) {
    const challengeId: string = (await params).challengeId;


    return (
        <main className="w-full h-full">
            {challengeId}
        </main>
    );
}
