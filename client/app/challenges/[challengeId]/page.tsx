import Hub from "./_components/Hub";

export default async function Page({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const challengeId: string = (await params).challengeId;

  return (
    <main >
      <Hub />
    </main>
  );
}
