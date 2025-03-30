import { getMyFollowing } from "@/actions/profileAction";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Link from "next/link";

interface IFollowing {
    username: string;
    avatar: string;
}

const page = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {

  const username = (await params).username;
  const data = await getMyFollowing(username);
  const { followings } = data;

  return (
    <main className="w-[90%] m-auto">
        <header className="my-10">
            <h1 className="text-2xl font-bold">Following</h1>
            <p className="text-sm text-muted-foreground">List of your following</p>
        </header>
        <div className="w-full flex flex-col gap-5">
            {followings.length === 0 ? (
                <div className="w-full h-fit p-5 bg-bgsecondary rounded-md shadow-md">
                    <h1 className="text-lg font-semibold">No following</h1>
                    <p className="text-sm text-muted-foreground">You have no following yet</p>
                </div>
            ) : (
                followings.map((following: IFollowing) => (
                    <Link href={`/profile/${following.username}`} key={following.username}>
                        <div className="w-full h-fit p-3 bg-bgsecondary rounded-lg shadow-md flex justify-start items-center gap-5">
                            <Avatar>
                                <AvatarImage src={following.avatar} alt="@shadcn" />
                                <AvatarFallback>{following.username}</AvatarFallback>
                            </Avatar>
                            <h1 className="text-lg font-semibold">{following.username}</h1>
                        </div>
                    </Link>
                ))
            )}
        </div>
        
    </main>
  )
}


export default page