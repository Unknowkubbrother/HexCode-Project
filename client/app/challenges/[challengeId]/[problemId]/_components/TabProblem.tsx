"use client"
import { useState, useEffect } from "react";
import PDFViewer from "@/components/ui/pdf-viewer";
import CodeEditor from "@/components/ui/CodeEditor";
import customLanguages from "@/config/languages";
import { IProblem } from "@/interface/problems";
import { Cpu, Database, File, Lightbulb, BookCheck, Terminal, CircleCheckBig, CircleX } from 'lucide-react';
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
import { runCodeTest, submitCode } from "@/actions/submissionAction";
import { IJudge0Submission } from "@/interface/judge0";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import logo from "@/assets/logo.svg";

import MarkDown from "@/components/ui/MarkDown";

interface ISubmission {
  problemId: string,
  testcases: IJudge0Submission[]
  points: number
  success: boolean
}

export default function TabProblem({ problemData }: { problemData: IProblem }) {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>(customLanguages[language].template);
  const [InputCode, setInputCode] = useState<string>("");
  const [InputCodeActive, setInputCodeActive] = useState<string>("inactive");
  const [testResult, setTestResult] = useState<IJudge0Submission | null>(null);
  const [submissionResult, setSubmissionResult] = useState<ISubmission | null>(null);
  const [FileCode, setFileCode] = useState<string>("");

  useEffect(() => {
    setCode(customLanguages[language].template);
  }, [language]);

  const handleRunCodeTest = async () => {
    const submisCode: string = FileCode || code;

    if (!submisCode) {
      return;
    }

    setTestResult(null);

    const response = await runCodeTest({
      source_code: submisCode,
      ...((InputCodeActive == "active" && InputCode) && { stdin: InputCode }),
      language_id: customLanguages[language].language_id,
    });

    setTestResult(response);

  };

  const handleSubmission = async () => {

    const submisCode: string = FileCode || code;

    if (!submisCode) {
      return;
    }

    setSubmissionResult(null);
    const response = await submitCode({
      problemId: problemData._id,
      source_code: submisCode,
      language_id: customLanguages[language].language_id,
    });

    setSubmissionResult(response);
  }

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
                <span className="text-primary">{(Number(problemData?.cpu_time_limit) > 0) ? problemData?.cpu_time_limit : "N/A"} s</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>MEMORY_LIMIT</span>
                </div>
                <span className="text-primary">{(Number(problemData?.memory_limit) > 0) ? problemData?.memory_limit : "N/A"} MiB</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <Database size={13} />
                  <span>STACK_LIMIT</span>
                </div>
                <span className="text-primary">{(Number(problemData?.stack_limit) > 0) ? problemData?.stack_limit : "N/A"} MiB</span>
              </li>
              <li className="px-5 py-2 text-xs bg-background rounded-lg flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center gap-1">
                  <File size={13} />
                  <span>FILESIZE_LIMIT</span>
                </div>
                <span className="text-primary">{(Number(problemData?.max_file_size) > 0) ? problemData?.max_file_size : "N/A"} MiB</span>
              </li>
            </ul>
          </nav>

          <div className="w-full h-fit mt-5 flex flex-col">
            <h1 className="text-lg font-semibold">Description</h1>
            <div className="mt-5 ml-5">
              <MarkDown data={problemData.description}/>
            </div>
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
              <Input id="code" type="file" placeholder="Upload Code" className="w-[300px]"
                onChange={(e) => {
                  setFileCode("");
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setFileCode(reader.result as string);
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </div>
            <div className="flex gap-2 w-full mt-5">
              <Checkbox id="InputCodeActive" value={InputCodeActive} onClick={() => setInputCodeActive(InputCodeActive === "inactive" ? "active" : "inactive")} />
              <label className="text-xs">Custom Input Test</label>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 px-3">
            <Button size='sm' variant='outline' className="duration-300 hover:bg-green-400"
              onClick={handleRunCodeTest}
            >Run code Test</Button>
            <Button size='sm' className="duration-300 hover:scale-105"
              onClick={handleSubmission}
            >Submit</Button>
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
            <div className="w-full h-fit p-3">
              {submissionResult ?
                <div className="w-full flex flex-col gap-5">
                  <div className="w-[90%] m-auto flex justify-between items-center gap-3">
                    <Image src={logo} width={50} height={50} alt="logo"></Image>
                    <div className="w-full flex flex-col gap-3">
                      <span>
                        <span className="font-semibold">Points : </span>
                        <span className="mx-1">{submissionResult.points}</span>
                        /
                        <span className="mx-1">{problemData?.maxPoints}</span></span>
                      <Progress value={(submissionResult.points / Number(problemData.maxPoints)) * 100} max={100} />
                    </div>
                  </div>
                  <Tabs defaultValue="testcase_1" className="w-full flex justify-start items-start">
                    <TabsList className="flex flex-col gap-3 mr-5">
                      {
                        submissionResult.testcases.map((testcase, index) => (
                          <TabsTrigger key={index} value={`testcase_${index + 1}`} className={`flex justify-start items-center gap-2 border-b-2 border-background ${testcase.status.description === "Accepted" ? "text-green-400" : "text-red-400"}`}>
                            {(testcase.status.description === "Accepted") ? <CircleCheckBig size={15} />
                              : <CircleX size={15} />
                            }
                            <span>Test Case {index + 1}</span>
                          </TabsTrigger>
                        ))
                      }
                    </TabsList>
                    {
                      submissionResult.testcases.map((testcase, index) => (
                        <TabsContent key={index} value={`testcase_${index + 1}`} className="w-full px-5 pb-5">

                          <div className="w-full flex flex-col gap-5">

                            <div className="w-full flex flex-col gap-3">
                              <span>Points</span>
                              <p className="text-sm p-3 bg-background">{testcase.points}</p>
                            </div>

                            <div className="w-full flex flex-col gap-3">
                              <span>Compiler Message</span>
                              <p className="text-sm p-3 bg-background">{testcase.status.description}</p>
                            </div>

                            <div className="w-full flex flex-col gap-3">
                              <h1>Execution time</h1>
                              <p className="text-sm p-3 bg-background">{testcase.time || 0} sec</p>
                            </div>

                            <div className="w-full flex flex-col gap-3">
                              <h1>Memory used</h1>
                              <p className="text-sm p-3 bg-background">{(Number(testcase.memory) / 1024).toFixed(3) || 0} MiB</p>
                            </div>

                          </div>
                        </TabsContent>
                      ))
                    }
                  </Tabs>
                </div>
                : (
                  <div className="w-full h-[300px] flex justify-center items-center gap-3">
                    <h1 className="text-sm font-semibold">No Submission</h1>
                  </div>
                )}
            </div>
          </TabsContent>
          <TabsContent value="testresult">
            <div className="w-full h-[300px] px-3 pb-5 mt-5 overflow-auto">
              {testResult ? (
                <>
                  {atob(testResult.stdout || "").split("\n").map((line: string, index: number) => (
                    <p key={index}>{line}</p>
                  ))}
                  {atob(testResult.stderr || testResult.compile_output || "").split("\n").map((line: string, index: number) => (
                    <p key={index} className="text-rose-400">{line}</p>
                  ))}
                </>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h1 className="text-sm font-semibold">No Test Result</h1>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
