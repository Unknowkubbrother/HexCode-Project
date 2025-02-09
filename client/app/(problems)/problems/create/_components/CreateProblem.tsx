"use client";
import { useState, useEffect } from "react";
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

export default function CreateProblem() {
  const { user } = useUser();
  const [countTestCases, setCountTestCases] = useState<number>(1);
  const [countHint, setCountHint] = useState<number>(1);

  // State for the form data
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(1);
  const [type, setType] = useState<number[]>([]);
  const [description, setDescription] = useState<string>("");
  const [viewer, setViewer] = useState<string>("public");
  const [docs, setDocs] = useState<File>();
  const [cpuTimeLimit, setCpuTimeLimit] = useState<number>(60.00);
  const [memoryLimit, setMemoryLimit] = useState<number>(64);
  const [stackLimit, setStackLimit] = useState<number>(64);
  const [maxFileSize, setMaxFileSize] = useState<number>(64);
  const [sourceCode, setSourceCode] = useState<File>();
  const [TestCase, setTestCase] = useState<{ input: File | undefined; output: File | undefined }[]>([]);
  const [hint, setHint] = useState<string[]>([]);

  const handlerTestCases = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: "input" | "output") => {
    const file = e.target.files?.[0];
    if (file) {
      const newTestCases = TestCase.slice();
      if (!newTestCases[index]) {
        newTestCases[index] = { input: undefined, output: undefined };
      }
      newTestCases[index][type] = file;
      setTestCase(newTestCases);
    }
  };

  const handlerHint = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newHint = hint.slice();
    newHint[index] = e.target.value;
    setHint(newHint);
  };

  const handlerCountTestCase = (count: number) => {
    if (count > countTestCases) {
      setTestCase([...TestCase, { input: undefined, output: undefined }]);
    } else {
      setTestCase(TestCase.slice(0, count));
    }
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


  useEffect(() => {
    console.log({
      title,
      difficulty,
      type,
      description,
      viewer,
      docs,
      cpuTimeLimit,
      memoryLimit,
      stackLimit,
      maxFileSize,
      sourceCode,
      TestCase,
      hint,
    });
  }, [
    title,
    difficulty,
    type,
    description,
    viewer,
    docs,
    cpuTimeLimit,
    memoryLimit,
    stackLimit,
    maxFileSize,
    sourceCode,
    TestCase,
    hint,
  ]);

  return (
    <main className="w-[60%] m-auto my-10">
      <h1 className="text-xl font-semibold pb-3 border-b-2">Create a new Problem</h1>
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
                <span className={`text-xs px-2 py-1 rounded-lg ${type.includes(parseInt(key)) ? 'bg-sky-500' : ''}`}>{value}</span>
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

      <div className="w-full mt-5 flex justify-between items-center pb-5 border-b-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="docs">Docs <span className="text-primary">PDF</span> FILE <span className="text-primary">ONLY</span></Label>
          <Input id="docs" type="file" accept=".pdf" className="mt-3" onChange={(e) => setDocs(e.target.files?.[0])} />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="limit" className="text-sm ml-5"><span className="text-primary">LIMIT</span> LIST
            <span className="text-rose-400 text-xs"> (If you enter 0, there will be no limit.)</span>
          </Label>
          <nav>
            <ul className="flex gap-2 justify-start items-center">
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Cpu size={13} />
                  <span>TIME_LIMIT <span className="text-primary">(s)</span></span>
                </div>
                <Input id="time_limit" type="number" className="w-[100px] h-5 text-center" min={0} step={0.01}
                  value={cpuTimeLimit} onChange={(e) => setCpuTimeLimit(parseFloat(e.target.value))}
                />
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>MEMORY_LIMIT <span className="text-primary">(MiB)</span></span>
                </div>
                <Input id="memory_limit" type="number" className="w-[100px] h-5 text-center" min={0}
                  value={memoryLimit} onChange={(e) => setMemoryLimit(parseInt(e.target.value))}
                />
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>STACK_LIMIT <span className="text-primary">(MiB)</span></span>
                </div>
                <Input id="stack_limit" type="number" className="w-[100px] h-5 text-center" min={0}
                  value={stackLimit} onChange={(e) => setStackLimit(parseInt(e.target.value))}
                />
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <File size={13} />
                  <span>FILESIZE_LIMIT <span className="text-primary">(MiB)</span></span>
                </div>
                <Input id="filesize_limit" type="number" className="w-[100px] h-5 text-center" min={0}
                  value={maxFileSize} onChange={(e) => setMaxFileSize(parseInt(e.target.value))}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="w-full mt-5 flex justify-between items-center pb-5 border-b-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="source_code">Source <span className="text-primary"> Code</span> FILE </Label>
          <Input id="source_code" type="file" className="mt-3"
            onChange={(e) => setSourceCode(e.target.files?.[0])}
          />
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
            <div className="flex items-center space-x-2" key={index}>
              <div className="w-full flex justify-between items-center gap-3">
                <div className="flex gap-3 justify-start items-center">
                  <Label htmlFor={`input_testcase_${index + 1}`} className="text-sm">Input</Label>
                  <Input id={`input_testcase_${index + 1}`} type="file" accept=".in"
                    onChange={(e) => handlerTestCases(e, index, "input")}
                  />
                </div>
                <div className="flex gap-3 justify-start items-center">
                  <Label htmlFor={`output_testcase_${index + 1}`} className="text-sm">Output</Label>
                  <Input id={`output_testcase_${index + 1}`} type="file" accept=".sol"
                    onChange={(e) => handlerTestCases(e, index, "output")}
                  />
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
            <div className="w-full flex items-start space-x-2" key={index}>
              <div className="w-full flex gap-3 flex-col justify-start items-start">
                <Label htmlFor={`hint_${index + 1}`} className="text-sm">Hint {index + 1}</Label>
                <Textarea id={`hint_${index + 1}`} placeholder="Hint for the problem" className="w-full"
                  value={hint[index]} onChange={(e) => handlerHint(e, index)}
                />
              </div>
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
        <Button variant="default">Create Problem</Button>
        <Button variant="default" className="bg-rose-400">Cancel</Button>
      </div>

    </main>
  )
}
