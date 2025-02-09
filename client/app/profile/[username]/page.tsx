import Profile from "./_components/Profile"
import Challengs from "./_components/Challengs"
import Problem from "./_components/Problem"
import { getProblemByUsername } from "@/actions/profileAction"

const page = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {

  const username = (await params).username;
  const data = await getProblemByUsername(username);
  const { account, problem, itself } = data;

  return (
    <main className="w-full flex flex-col gap-5">
      <Profile account={account} itself={itself} />
      {account.role == 'premium' && (
        <Challengs />
      )}
      <Problem problem={problem} itself={itself} />
    </main>
  )
}


export default page