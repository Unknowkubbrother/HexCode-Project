import CountDownTimer from "@/components/ui/CountDownTimer";
import ItemProblem from "../_components/ItemProblem";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Marquee from "react-fast-marquee";

export default async function Page({
    params,
}: {
    params: Promise<{ challengeId: string }>;
}) {
    const challengeId: string = (await params).challengeId;

    return (
        <main className="w-full h-full">
            <header className="w-full flex justify-between px-10 mt-5">
                <span className="text-xl font-bold">Google Challenge</span>
                <span className="flex justify-center items-center gap-3 text-lg">
                    <span className="text-primary">TIME LEFT - </span>
                    <CountDownTimer date={Date.now() + 10000000} className="text-rose-400" />
                </span>
            </header>
            <div className="w-[95%] m-auto bg-bgsecondary h-[70px] mt-5 rounded-lg px-5 flex justify-start items-center">
                <span className="px-2 py-2 rounded-lg font-semibold mr-3 bg-sky-700">Announce</span>
                <Marquee>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum officiis nisi quod unde consequatur velit quis libero inventore maiores, itaque explicabo aperiam, ut deleniti enim aspernatur beatae voluptatum architecto.
                </Marquee>
            </div>
            <div className="w-full px-10 grid grid-cols-2 mt-10 gap-x-10">
                <div className="w-full h-fit overflow-y-auto">
                    <div className="w-full h-fit grid grid-cols-1 gap-3">
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <div key={idx}>
                                <ItemProblem />
                            </div>
                        ))}
                    </div>
                </div>

                {/*  */}
                <div className="w-full h-fit flex flex-col gap-5">
                    <div className="w-full h-[500px] bg-bgsecondary rounded-lg p-5 overflow-hidden">
                        <div className="w-full flex justify-center items-center"><h1 className="text-lg font-semibold">LeaderBoard</h1></div>
                        <div className="w-full h-[400px] overflow-y-auto">
                            <Table>
                                <TableCaption>A list of LeaderBoard.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">Order</TableHead>
                                        <TableHead className="text-center">Name</TableHead>
                                        <TableHead className="text-center">Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.from({ length: 10 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="text-center">#{idx + 1}</TableCell>
                                            <TableCell className="text-center flex justify-center items-center gap-2">
                                                <Avatar key={idx} className="w-5 h-5">
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                               <span>username{idx + 1}</span>
                                            </TableCell>
                                            <TableCell className="text-center">{100 + idx}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="w-full h-fit bg-bgsecondary rounded-lg p-5">
                        <div className="w-full flex justify-center items-center"><h1 className="text-lg font-semibold">Player</h1></div>
                        <div className="w-full grid grid-cols-6 mt-5 gap-y-5">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <span key={idx} className="flex flex-col justify-center items-center gap-1">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">UserName {idx + 1}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
                {/*  */}
            </div>
        </main>
    );
}
