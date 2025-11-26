import Profile from "./_components/Profile"
import Challengs from "./_components/Challengs"
import Problem from "./_components/Problem"
import { getProfileByUsername } from "@/actions/profileAction"

const page = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {

  const username = (await params).username;
  const data = await getProfileByUsername(username);
  const { account, problem, itself , myfollowed , challenge } = data;

  return (
    <main className="w-full flex flex-col gap-5">
      <Profile account={account} itself={itself} myfollowed={myfollowed}/>
      {account.role != 'member' && (
        <Challengs itself={itself} challenges={challenge}/>
      )}
      <Problem problem={problem} itself={itself} />
    </main>
  )
}


export default page