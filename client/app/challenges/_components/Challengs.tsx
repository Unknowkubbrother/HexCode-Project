import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CardChallenge from "@/components/ui/CardChallenge"

export default function Challengs() {
    return (
        <main className='w-[90%] m-auto'>
            <header className='my-5 text-lg font-semibold'>Challengs</header>
            <div className="w-[95%] m-auto">
                <div className="flex justify-between items-center gap-3">
                    <div className="flex justify-center items-center gap-3">
                        <Input type="text" placeholder="Search" className="w-[400px]" ></Input>
                        <Button type="submit" size="sm">Search</Button>
                    </div>
                    <nav>
                        <ul className="flex justify-center items-center gap-3">
                            <li>
                                <Button size="sm">All</Button>
                            </li>
                            <li>
                                <Button size="sm">Active</Button>
                            </li>
                            <li>
                                <Button size="sm">Completed</Button>
                            </li>
                            <li>
                                <Button size="sm">Expired</Button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="w-full h-fit overflow-y-auto mt-10">
                    <div className="w-full h-fit grid grid-cols-5 gap-3">
                        {
                            Array.from({ length: 30 }).map((_, index) => (
                                <CardChallenge key={index} />
                            ))
                        }
                    </div>
                </div>

            </div>
        </main>
    )
}
