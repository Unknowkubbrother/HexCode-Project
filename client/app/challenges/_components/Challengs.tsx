"use client";
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CardChallenge from "@/components/ui/CardChallenge"
import { IListChallenge } from '@/interface/challenges'
import { getChallenges } from "@/actions/challengeAction";
import Loader from '@/components/ui/Loader';
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Challengs() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [data, setData] = useState<IListChallenge[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const createQueryParams = () => {
        const params = new URLSearchParams();
        if (search) {
            params.set("search", search);
        }
        return params.toString();
      };

    const fetchApi = async () => {
        const searchTemp = searchParams.get("search");
        const fetchData = async () => {
            const { result } = await getChallenges(searchTemp || search || "");
            setData(result);
            setLoading(false);
            return true;
        }
        setLoading(true);
        return await fetchData();
    }

    useEffect(() => {
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    useEffect(() => {
        const search = searchParams.get("search");
        if (search) {
            setSearch(search);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleSearch = async () => {
        const search = createQueryParams();
        router.push(pathname + "?" + search);

        await fetchApi();
    }


    if (loading) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <Loader />
            </div>
        )
    }

    return (
        <main className='w-full h-full'>
            <div className='w-[90%] m-auto'>
                <header className='my-5 text-lg font-semibold'>Challengs</header>
                <div className="w-[95%] m-auto">
                    <div className="flex justify-start items-center gap-3">
                        <div className="flex justify-center items-center gap-3">
                            <Input type="text" placeholder="Search" className="w-[400px]" value={search} onChange={(e)=>setSearch(e.target.value)}></Input>
                            <Button type="submit" size="sm" onClick={handleSearch}>Search</Button>
                        </div>
                    </div>

                    {data && data.length > 0 ? <div className="w-full h-fit overflow-y-auto mt-10">
                        <div className="w-full h-fit grid grid-cols-5 gap-3">
                            {
                                data.map((item, index) => (
                                    <CardChallenge key={index} data={item} />
                                ))
                            }
                        </div>
                    </div> :

                        <div className="w-full h-[700px] overflow-y-auto mt-10">
                            <div className="w-full h-fit grid grid-cols-5 gap-3">
                                <div className="col-span-5 flex justify-center items-center">
                                    <span className="text-lg font-semibold">No challenges found</span>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </main>
    )
}
