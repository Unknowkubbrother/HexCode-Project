"use client"
import { useState, useEffect } from "react";
import PDFViewer from "@/components/ui/pdf-viewer";
import CodeEditor from "@/components/ui/CodeEditor";
import customLanguages from "@/config/languages";
import { IProblem } from "@/interface/problems";
import { Cpu, Database, File, Lightbulb, BookCheck, Terminal } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function TabProblem({ problemData }: { problemData: IProblem }) {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>(customLanguages[language].template);
  const [InputCode, setInputCode] = useState<string>("");
  const [InputCodeActive, setInputCodeActive] = useState<string>("inactive");

  useEffect(() => {
    setCode(customLanguages[language].template);
  }, [language]);

  return (
    <div className="w-full h-full flex justify-between gap-3">
      <div className="w-full h-fit bg-bgsecondary rounded-lg p-5 overflow-auto flex flex-col gap-5">
        <div className="w-full h-fit">
          <h1 className="text-2xl font-semibold">{problemData.title}</h1>
        </div>
        <div className="w-full m-auto h-full rounded-xl">
          <nav>
            <ul className="flex gap-2 justify-start items-center">
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Cpu size={13} />
                  <span>TIME_LIMIT</span>
                </div>
                <span className="text-primary">{problemData?.cpu_time_limit || 0} s</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>MEMORY_LIMIT</span>
                </div>
                <span className="text-primary">{problemData?.memory_limit || 0} MiB</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>STACK_LIMIT</span>
                </div>
                <span className="text-primary">{problemData?.stack_limit || 0} MiB</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <File size={13} />
                  <span>FILESIZE_LIMIT</span>
                </div>
                <span className="text-primary">{problemData?.max_file_size || 0} MiB</span>
              </li>
            </ul>
          </nav>

          <div className="w-full h-fit mt-5 flex flex-col">
            <h1 className="text-lg font-semibold">Description</h1>
            <p className="text-sm mt-5 ml-5">
              {problemData.description}
            </p>
          </div>

          <PDFViewer
            url={`${process.env.NEXT_PUBLIC_API_END_POINT}/file/docs/${problemData._id}`}
            className="rouned-xl overflow-hidden mt-10 h-[700px]"
          />

          <div>
            <h1 className="text-lg font-semibold mt-5 flex items-center gap-2">
              <Lightbulb size={20} />
              <span>Hints</span>
            </h1>
            <Accordion type="single" collapsible className="w-full">
              {problemData.hint?.map((hint, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="ml-5">
                  <AccordionTrigger>{`Hint ${index + 1}`}</AccordionTrigger>
                  <AccordionContent>{hint}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-3">
        <div className="w-full h-[600px] bg-bgsecondary rounded-lg">
          <CodeEditor
            code={code}
            setCode={setCode}
            className="rounded-lg"
            language={language}
            size="xs"
            setLanguage={setLanguage}
          />
        </div>


        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex justify-start items-center gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="code" className="text-sm font-medium leading-none">Upload Code</label>
              <Input id="code" type="file" placeholder="Upload Code" className="w-[200px]" />
            </div>
            <div className="flex gap-2 w-full mt-5">
              <Checkbox id="InputCodeActive" value={InputCodeActive} onClick={() => setInputCodeActive(InputCodeActive === "inactive" ? "active" : "inactive")} />
              <label className="text-xs">Custom Input</label>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 px-3">
            <Button size='sm' variant='outline' className="duration-300 hover:bg-green-400">Runcode</Button>
            <Button size='sm' className="duration-300 hover:scale-105">Submit</Button>
          </div>

        </div>


        {(InputCodeActive === "active") && (
          <Textarea placeholder="Input Code here .." value={InputCode} onChange={(e) => setInputCode(e.target.value)} />
        )}

        <Tabs defaultValue="testcase" className="w-full h-fit max:h-[485px] bg-bgsecondary rounded-lg overflow-hidden">
          <TabsList className="w-full border-b-[1px] border-primary flex justify-start items-center py-1">
            <TabsTrigger value="testcase">
              <div className="flex items-center gap-2">
                <span className="text-green-400">
                  <BookCheck size={15} />
                </span>
                <h1>Submission Details</h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="testresult">
              <div className="flex items-center gap-2">
                <span className="text-green-400">
                  <Terminal size={15} />
                </span>
                <h1>Test Result</h1>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="testcase">
            <div className="w-full h-[600px] flex flex-col p-5">
              <h1 className="font-semibold text-[15px]"> TestCase </h1>
              <Table>
                <TableHeader className="sticky top-0 bg-bgsecondary">
                  <TableRow>
                    <TableHead className="w-[100px] text-center">#</TableHead>
                    <TableHead className="text-center">Outcome</TableHead>
                    <TableHead className="text-center">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                    <TableCell className="text-center">{index+1}</TableCell>
                    <TableCell className="text-center">Correct</TableCell>
                    <TableCell className="text-center">Output is correct</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            
              <div className="w-full h-fit mt-5">
                <h1 className="font-semibold text-[15px]"> Compilation output </h1>
                <div className="grid grid-cols-1 grid-rows-3 gap-3 mt-2 text-[14px]">
                  <div className="w-full justify-between items-center flex gap-3 px-5">
                    <span>Compilation outcome</span>
                    <span>Compilation succeeded</span>
                  </div>
                  <div className="w-full justify-between items-center flex gap-3 px-5">
                    <span>Compilation time</span>
                    <span>1.067 sec</span>
                  </div>
                  <div className="w-full justify-between items-center flex gap-3 px-5">
                    <span>Memory used</span>
                    <span>45.1 MiB</span>
                  </div>
                </div>
              </div>


              <div className="w-full h-fit mt-5">
                <h1 className="font-semibold text-[15px]"> Standard output </h1>
                <div className="w-full bg-background p-3 h-fit rounded-lg mt-2">
                  No Output
                </div>
              </div>

              <div className="w-full h-fit mt-5">
                <h1 className="font-semibold text-[15px]"> Standard error </h1>
                <div className="w-full bg-background p-3 h-fit rounded-lg mt-2">
                  No Error
                </div>
              </div>

            </div>
          </TabsContent>
          <TabsContent value="testresult">
            <div className="w-full h-[300px] px-3 mt-5">
              <p className="text-sm">
                1
                2
                3
              </p>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
