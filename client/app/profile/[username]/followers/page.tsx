import { getMyFollower } from "@/actions/profileAction";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Link from "next/link";

interface IFollower {
    username: string;
    avatar: string;
}

const page = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {

  const username = (await params).username;
  const data = await getMyFollower(username);
  const { followers } = data;

  return (
    <main className="w-[90%] m-auto">
        <header className="my-10">
            <h1 className="text-2xl font-bold">Followers</h1>
            <p className="text-sm text-muted-foreground">List of your followers</p>
        </header>
        <div className="w-full flex flex-col gap-5">
            {followers.length === 0 ? (
                <div className="w-full h-fit p-5 bg-bgsecondary rounded-md shadow-md">
                    <h1 className="text-lg font-semibold">No followers</h1>
                    <p className="text-sm text-muted-foreground">You have no followers yet</p>
                </div>
            ) : (
                followers.map((follower: IFollower) => (
                    <Link href={`/profile/${follower.username}`} key={follower.username}>
                        <div className="w-full h-fit p-3 bg-bgsecondary rounded-lg shadow-md flex justify-start items-center gap-5">
                            <Avatar>
                                <AvatarImage src={follower.avatar} alt="@shadcn" />
                                <AvatarFallback>{follower.username}</AvatarFallback>
                            </Avatar>
                            <h1 className="text-lg font-semibold">{follower.username}</h1>
                        </div>
                    </Link>
                ))
            )}
        </div>
        
    </main>
  )
}


export default page