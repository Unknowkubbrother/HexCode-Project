"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookCheck, BookKey, Cpu, Database, File, Minus, Plus, CircleAlert } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { updateProblem } from "@/actions/problemAction"
import { toast } from 'react-toastify';
import { updateTestCase, deleteTestCase } from "@/actions/TestCaseAction"
import Loader from "@/components/ui/Loader";
import { IProblem } from "@/interface/problems";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";

const SchemaDifficulty: {
    [key: number]: string[];
} = {
    1: ["Easy", "text-green-400"],
    2: ["Medium", "text-yellow-500"],
    3: ["Hard", "text-red-500"],
    4: ["Expert", "text-rose-500"],
};

const SolutionType: {
    [type: number]: string;
} = {
    1: "Array",
    2: "String",
    3: "Linked List",
    4: "Tree",
    5: "Dynamic Programming",
};

export default function EditProblem({ problemData }: { problemData: IProblem }) {
    const { user } = useUser();
    const [countTestCases, setCountTestCases] = useState<number>(problemData.testcase?.length || 1);
    const [countHint, setCountHint] = useState<number>(problemData.hint?.length || 1);

    // State for the form data
    const [title, setTitle] = useState<string>(problemData.title);
    const [difficulty, setDifficulty] = useState<number>(problemData.difficulty);
    const [type, setType] = useState<number[]>(problemData.type);
    const [description, setDescription] = useState<string>(problemData.description);
    const [viewer, setViewer] = useState<string>(problemData.viewer || "public");
    const [docs, setDocs] = useState<File>();
    const [cpuTimeLimit, setCpuTimeLimit] = useState<number>(Number(problemData.cpu_time_limit));
    const [memoryLimit, setMemoryLimit] = useState<number>(Number(problemData.memory_limit));
    const [stackLimit, setStackLimit] = useState<number>(Number(problemData.stack_limit));
    const [maxFileSize, setMaxFileSize] = useState<number>(Number(problemData.max_file_size));
    const [sourceCode, setSourceCode] = useState<File>();
    const [TestCase, setTestCase] = useState<{ input: string | undefined; output: string | undefined; points: number | 0 }[]>(problemData.testcase || []);
    const [hint, setHint] = useState<string[]>(problemData.hint || [""]);
    const [loading, setLoading] = useState<boolean>(false);
    const [viewerCode, setViewerCode] = useState<boolean>(false);

    const handlerTestCases = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: "input" | "output") => {

        const newTestCases = TestCase.slice();
        if (!newTestCases[index]) {
            newTestCases[index] = { input: undefined, output: undefined, points: 0 };
        }
        newTestCases[index][type as "input" | "output"] = e.target.value;
        setTestCase(newTestCases);

    };

    const handlerTestCasePoint = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newTestCases = TestCase.slice();
        if (!newTestCases[index]) {
            newTestCases[index] = { input: undefined, output: undefined, points: 0 };
        }
        const points = parseInt(e.target.value);
        newTestCases[index].points = !isNaN(points) && points > 0 ? points : 0;
        setTestCase(newTestCases);
    }

    const handlerHint = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newHint = hint.slice();
        newHint[index] = e.target.value;
        setHint(newHint);
    };

    const handlerCountTestCase = (count: number) => {
        if (count > countTestCases) {
            setTestCase([...TestCase, { input: undefined, output: undefined, points: 0 }]);
        } else {
            setTestCase(TestCase.slice(0, count));
        }
        setCountTestCases(count);
    }

    const handlerCountHint = (count: number) => {
        if (count > countHint) {
            setHint([...hint, ""]);
        } else {
            setHint(hint.slice(0, count));
        }
        setCountHint(count);
    }

    const handlerType = (value: number) => {
        if (type.includes(value)) {
            setType(type.filter((t) => t !== value));
        } else {
            setType([...type, value]);
        }
    }

    const DeleteTestCase = async (index: number) => {
        if (countTestCases < 2) return;
        const formTestcase = new FormData();
        const _id = problemData.testcase?.filter((_, i) => i === index)[0]?._id;
        if (!_id) return;
        formTestcase.append("_id", _id );
        formTestcase.append("problemId", problemData._id);
        const deletedTestcase = await deleteTestCase(formTestcase);

        if (!deletedTestcase) {
            toast.error(`Failed to delete TestCase ${index + 1}. Please try again.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        const newTestCases = TestCase.filter((_, i) => i !== index);
        setTestCase(newTestCases);
        setCountTestCases(newTestCases.length);

    }

    const SaveProblem = async () => {
        if (!title || !difficulty || !type.length || !viewer || cpuTimeLimit < 0 || memoryLimit < 0 || stackLimit < 0 || maxFileSize < 0 || !hint.length || !hint.every((h) => h) || !TestCase.length || !TestCase.every((t) => t.input && t.output)) {
            toast.error("Please fill in all the required fields.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        setLoading(true);
        const formProblem = new FormData();
        formProblem.append("id", problemData._id);
        formProblem.append("title", title);
        formProblem.append("difficulty", difficulty.toString());
        formProblem.append("type", JSON.stringify(type));
        if (description) {
            formProblem.append("description", description);
        }
        formProblem.append("viewer", viewer);
        if (docs) {
            formProblem.append("docs", docs as Blob);
        }
        formProblem.append("cpu_time_limit", cpuTimeLimit.toString());
        formProblem.append("memory_limit", memoryLimit.toString());
        formProblem.append("stack_limit", stackLimit.toString());
        formProblem.append("max_file_size", maxFileSize.toString());
        if (sourceCode) {
            formProblem.append("source_code", sourceCode as Blob);
        }
        formProblem.append(`hint`, JSON.stringify(hint));
        const updatedProblem = await updateProblem(formProblem);

        if (!updatedProblem) {
            toast.error("Failed to update problem. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        await TestCase.forEach(async (TestCase, index) => {
            const formTestcase = new FormData();
            const _id = problemData.testcase?.filter((value) => value.input == TestCase.input )[0]?._id;
            if (_id) {
                formTestcase.append("_id", _id);
            }
            formTestcase.append("id", (index + 1).toString());
            formTestcase.append("problemId", problemData._id);
            formTestcase.append("input", TestCase.input || "");
            formTestcase.append("output", TestCase.output || "");
            formTestcase.append("points", TestCase.points.toString());
            await updateTestCase(formTestcase);
        });

        setLoading(false);


        toast.success("Problem updated successfully.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setTimeout(() => {
            window.location.reload();
        }, 3500);
    }

    return (
        <div className="w-full h-full relative">
            {loading && <Loader />}

            {viewerCode &&
                <div className="fixed top-1/2 left-1/2 -mt-[20rem] -ml-[20rem] dark:bg-background bg-bgsecondary flex justify-center items-center rounded-xl z-50 border-2">
                    <div className="flex flex-col gap-3 p-5">
                        <span className="text-lg font-semibold">View Source Code</span>
                        <div className="w-[750px] h-[500px] flex justify-start items-center gap-2">
                            <CodeBlock
                                code={String(problemData.source_code)}
                                language="cpp"
                                filename={problemData.title}
                                className="w-full h-full overflow-auto"
                            />
                        </div>
                        <Button
                            onClick={() => setViewerCode(false)}
                        >Close</Button>
                    </div>
                </div>
            }


            <main className={`w-[70%] m-auto my-10 ${loading || viewerCode ? 'blur pointer-events-none select-none' : ''}`}>
                <h1 className="text-xl font-semibold pb-3 border-b-2">Edit Problem {`=>`} {problemData.title}</h1>
                <h2 className="text-sm mt-2">Required fields are marked with an asterisk (*).</h2>
                <div className="w-full flex gap-3 justify-start items-center">
                    <div className="flex flex-col gap-2 mt-3">
                        <label htmlFor="owner" className="text-sm">Owner <span className="text-primary">*</span></label>
                        <div className="flex gap-2 justify-start items-center border-2 px-1 py-[3px] rounded-md">
                            <Avatar className='w-7 h-7'>
                                <AvatarImage src={user?.imageUrl} alt="username" />
                                <AvatarFallback>Username</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{user?.username}</span>
                        </div>
                    </div>
                    <span className="mt-10 text-2xl">/</span>
                    <div className="flex flex-col gap-2 mt-3">
                        <label htmlFor="title" className="text-sm">Problem name <span className="text-primary">*</span></label>
                        <Input id="title" type="text" placeholder="Title of the problem" className="w-[250px]" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="flex flex-col gap-2 mt-3">
                        <label htmlFor="difficulty" className="text-sm">Difficulty <span className="text-primary">*</span></label>
                        <Select value={difficulty.toString()} onValueChange={(value) => setDifficulty(parseInt(value))} required>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select a Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.entries(SchemaDifficulty).map(([key, value]) => (
                                        <SelectItem key={key} value={key} className={value[1]}>
                                            {value[0]}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 mt-3">
                        <label htmlFor="solutiontype" className="text-sm">SolutionType <span className="text-primary">*</span></label>
                        <ToggleGroup type="multiple">
                            {Object.entries(SolutionType).map(([key, value]) => (
                                <ToggleGroupItem value={key} aria-label={value} key={key} onClick={() => handlerType(parseInt(key))} >
                                    <span className={`text-xs px-2 py-1 rounded-lg ${type.includes(parseInt(key)) ? 'bg-sky-500 text-white' : ''}`}>{value}</span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                </div>
                <div className="flex flex-col gap-3 mt-5 border-b-2 pb-5">
                    <label htmlFor="description" className="text-sm">Description <span className="text-primary">(optional)</span></label>
                    <Textarea placeholder="Description of the problem" className="h-[200px]" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="w-full mt-5 pb-5 border-b-2">
                    <RadioGroup defaultValue="public" value={viewer} onValueChange={(value) => setViewer(value)}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" />
                            <div className="flex gap-3 justify-start items-center">
                                <BookCheck size={30} />
                                <div className="flex flex-col mt-2">
                                    <Label htmlFor="public" className="text-primary">Public</Label>
                                    <span className="text-sm">Anyone can view this problem</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="private" />
                            <div className="flex gap-3 justify-start items-center">
                                <BookKey size={30} />
                                <div className="flex flex-col mt-2">
                                    <Label htmlFor="private" className="text-primary">Private</Label>
                                    <span className="text-sm">
                                        Only you and the people you invite can view this problem
                                    </span>
                                </div>
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                <div className="w-full mt-5 flex justify-start items-center pb-5 border-b-2">

                    <div className="flex flex-col">
                        <Label htmlFor="limit" className="text-sm ml-5"><span className="text-primary">LIMIT</span> LIST
                            <span className="text-rose-400 text-xs"> (If you enter 0, there will be no limit.)</span>
                        </Label>
                        <nav>
                            <ul className="flex gap-2 justify-start items-center mt-3">
                                <li className="px-5 py-2 text-xs rounded-lg flex flex-col justify-center items-center gap-1">
                                    <div className="flex justify-center items-center gap-1">
                                        <Cpu size={13} />
                                        <span>TIME_LIMIT <span className="text-primary">(s)</span></span>
                                    </div>
                                    <Input id="time_limit" type="number" className="w-[170px] h-5 text-center" min={0} step={0.01}
                                        value={cpuTimeLimit} onChange={(e) => setCpuTimeLimit(parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : 0)}
                                    />
                                </li>
                                <li className="px-5 py-2 text-xs rounded-lg flex flex-col justify-center items-center gap-1">
                                    <div className="flex justify-center items-center gap-1">
                                        <Database size={13} />
                                        <span>MEMORY_LIMIT <span className="text-primary">(MiB)</span></span>
                                    </div>
                                    <Input id="memory_limit" type="number" className="w-[170px] h-5 text-center" min={0}
                                        value={memoryLimit} onChange={(e) => setMemoryLimit(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0)}
                                    />
                                </li>
                                <li className="px-5 py-2 text-xs rounded-lg flex flex-col justify-center items-center gap-1">
                                    <div className="flex justify-center items-center gap-1">
                                        <Database size={13} />
                                        <span>STACK_LIMIT <span className="text-primary">(MiB)</span></span>
                                    </div>
                                    <Input id="stack_limit" type="number" className="w-[170px] h-5 text-center" min={0}
                                        value={stackLimit} onChange={(e) => setStackLimit(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0)}
                                    />
                                </li>
                                <li className="px-5 py-2 text-xs rounded-lg flex flex-col justify-center items-center gap-1">
                                    <div className="flex justify-center items-center gap-1">
                                        <File size={13} />
                                        <span>FILESIZE_LIMIT <span className="text-primary">(MiB)</span></span>
                                    </div>
                                    <Input id="filesize_limit" type="number" className="w-[170px] h-5 text-center" min={0}
                                        value={maxFileSize} onChange={(e) => setMaxFileSize(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0)}
                                    />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>


                <div className="w-full mt-5 flex flex-col justify-start items-start pb-5 border-b-2">
                    <Label htmlFor="docs">Docs <span className="text-primary">PDF</span> FILE <span className="text-primary">ONLY</span></Label>
                    <div className="w-full gap-1.5 flex justify-between items-center">
                        <Button size="sm" variant="outline" className="w-[200px] h-8 mt-3">
                            <Link href={`${process.env.NEXT_PUBLIC_API_END_POINT}/file/docs/${problemData._id}`} target="_blank" rel="noopener noreferrer">ดูไฟล์ PDF เก่า</Link>
                        </Button>
                        <div className="w-full flex justify-start items-center gap-2 ml-5">
                            <span className="text-sm">Upload Docs New</span>
                            <Input id="docs" type="file" accept=".pdf" className="mt-3" onChange={(e) => setDocs(e.target.files?.[0])} />
                        </div>
                    </div>
                </div>

                <div className="w-full mt-5 flex flex-col justify-start items-start pb-5 border-b-2">
                    <Label htmlFor="source_code">Source <span className="text-primary"> Code</span> FILE </Label>
                    <div className="w-full gap-1.5 flex justify-between items-center">
                        <Button size="sm" variant="outline" className="w-[200px] h-8 mt-3" onClick={() => setViewerCode(true)}>
                            ดูไฟล์ Source Code เก่า
                        </Button>
                        <div className="w-full flex justify-start items-center gap-2 ml-5 mt-3">
                            <span className="text-sm">Upload Soucre Code New</span>
                            <Input id="source_code" type="file"
                                onChange={(e) => setSourceCode(e.target.files?.[0])}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full mt-5 flex flex-col justify-start items-start gap-3 pb-5 border-b-2">
                    <div className="flex justify-start items-center gap-1.5">
                        <Label htmlFor="input_testcase">Test <span className="text-primary">Cases</span> FILE </Label>
                        <Button variant="ghost" size='sm'
                            onClick={() => { setCountTestCases(countTestCases > 1 ? countTestCases - 1 : 1); handlerCountTestCase(countTestCases > 1 ? countTestCases - 1 : 1); }}
                        ><Minus /></Button>
                        <span className="px-2 rounded-sm bg-bgsecondary">{countTestCases}</span>
                        <Button variant="ghost" size='sm'
                            onClick={() => { setCountTestCases(countTestCases + 1); handlerCountTestCase(countTestCases + 1); }}
                        ><Plus /></Button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[...Array(countTestCases)].map((_, index) => (
                            <div className="w-full flex items-start space-x-2" key={index}>
                                <div className="w-full flex gap-3 flex-col justify-start items-start">
                                    <Label htmlFor={`testcase_${index + 1}`} className="text-sm">Testcase {index + 1}</Label>
                                    <div className="w-full flex justify-between items-center gap-3">
                                        <div className="w-full flex justify-center items-center gap-3">
                                            <span>Input</span>
                                            <Textarea id={`testcase_${index + 1}`} placeholder="input"
                                                value={TestCase[index].input} onChange={(e) => handlerTestCases(e, index, "input")}
                                            />
                                        </div>
                                        <div className="w-full flex justify-center items-center gap-3">
                                            <span>Output</span>
                                            <Textarea id={`testcase_${index + 1}`} placeholder="output"
                                                value={TestCase[index].output} onChange={(e) => handlerTestCases(e, index, "output")}
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-3">
                                            <span>Points</span>
                                            <Input id={`points_${index + 1}`} type="number" min={0} value={Number(TestCase[index].points) || 0}
                                                onChange={(e) => handlerTestCasePoint(e, index)} className="w-[100px] h-8 text-center"
                                                placeholder="Points" step={1}
                                            />

                                        </div>
                                        <Button className="bg-rose-400"
                                            onClick={() => {
                                                DeleteTestCase(index);
                                            }}
                                        >Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="w-full mt-5 flex flex-col justify-start items-start gap-3 pb-5 border-b-2">
                    <div className="flex justify-start items-center gap-1.5">
                        <Label htmlFor="input_testcase"><span className="text-primary">Hint</span> </Label>
                        <Button variant="ghost" size='sm'
                            onClick={() => { setCountHint(countHint > 1 ? countHint - 1 : 1); handlerCountHint(countHint > 1 ? countHint - 1 : 1) }}
                        ><Minus /></Button>
                        <span className="px-2 rounded-sm bg-bgsecondary">{countHint}</span>
                        <Button variant="ghost" size='sm'
                            onClick={() => { setCountHint(countHint + 1); handlerCountHint(countHint + 1) }}
                        ><Plus /></Button>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        {[...Array(countHint)].map((_, index) => (
                            <div className="w-full flex items-center space-x-2 justify-between gap-3" key={index}>
                                <div className="w-full flex gap-3 flex-col justify-start items-start">
                                    <Label htmlFor={`hint_${index + 1}`} className="text-sm">Hint {index + 1}</Label>
                                    <Textarea id={`hint_${index + 1}`} placeholder="Hint for the problem" className="w-full"
                                        value={hint[index]} onChange={(e) => handlerHint(e, index)}
                                    />
                                </div>
                                <Button className="bg-rose-400 mt-6"
                                    onClick={() => {
                                        if (countHint < 2) return;

                                        const newHints = hint.filter((_, i) => i !== index);
                                        setHint(newHints);
                                        setCountHint(newHints.length);
                                    }}
                                >Delete</Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full mt-5 flex justify-between items-center pb-5 border-b-2">
                    <span className="flex gap-3 justify-start items-center">
                        <CircleAlert size={30} />
                        <p>
                            <span className="text-primary">Note:</span> You can only upload <span className="text-primary">PDF</span> files for the docs and <span className="text-primary">Source Code</span> files for the source code.
                        </p>
                    </span>
                </div>

                <div className="w-full mt-5 flex justify-end items-center gap-3">
                    <Button variant="default" onClick={SaveProblem} className="bg-rose-400">Delete Problem</Button>
                    <Button variant="default" onClick={SaveProblem}>Save Problem</Button>
                </div>
            </main>
        </div>
    )
}
