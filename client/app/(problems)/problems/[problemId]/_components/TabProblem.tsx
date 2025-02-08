"use client"
import { useState, useEffect } from "react";
import PDFViewer from "@/components/ui/pdf-viewer";
import CodeEditor from "@/components/ui/CodeEditor";
import customLanguages from "@/config/languages";
import { IProblem } from "@/interface/problems";
<<<<<<< HEAD
=======
import { Cpu, Database, File, Lightbulb, BookCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
>>>>>>> parent of 53865b9 (update textarea input code)

export default function TabProblem({ problemData }: { problemData: IProblem}) {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>(customLanguages[language].template);
<<<<<<< HEAD

=======
  // const []
>>>>>>> parent of 53865b9 (update textarea input code)

  useEffect(() => {
    setCode(customLanguages[language].template);
  }, [language]);

  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <div className="w-full h-full flex justify-between gap-3">
      <div className="w-1/2 h-[650px] bg-bgsecondary rounded-lg p-5 overflow-auto flex flex-col gap-5">
          <div className="w-full h-fit">
            <h1 className="text-2xl font-semibold">{problemData.title}</h1>
          </div>
        <div className="w-[90%] m-auto h-full rounded-xl overflow-hidden">
          <PDFViewer
            url={`${process.env.NEXT_PUBLIC_API_END_POINT}/file/docs/${problemData._id}`}
            className="rouned-lg overflow-hidden"
          />
        </div>
      </div>
<<<<<<< HEAD
      <div className="w-1/2 h-[650px] bg-bgsecondary rounded-lg">
        <CodeEditor
          code={code}
          setCode={setCode}
          className="rounded-lg"
          language={language}
          size="xs"
          setLanguage={setLanguage}
        />
=======
      <div className="w-full h-full flex flex-col gap-3">
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
          <div className="flex justify-center items-center gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="code" className="text-sm font-medium leading-none">Upload Code</label>
              <Input id="code" type="file" placeholder="Upload Code" className="w-[200px]" />
            </div>
          </div>

          <div className="flex justify-center items-center gap-3"> 
            <Button size='sm' variant='outline' className="duration-300 hover:bg-green-400">Runcode</Button>
            <Button size='sm' className="duration-300 hover:scale-105">Submit</Button>

          </div>

        </div>

        <div className="w-full h-[190px] bg-bgsecondary rounded-lg overflow-hidden">
          <header className="w-full p-2 gap-2 border-b-[1px] border-primary flex items-center justify-between px-5 sticky top-0 bg-bgsecondary  dark:text-white z-10">
            <div className="flex items-center gap-2">
              <span className="text-green-400">
                <BookCheck size={15} />
              </span>
              <h1 className="">TestCase</h1>
            </div>

          </header>

        </div>
>>>>>>> parent of 53865b9 (update textarea input code)
      </div>
    </div>
  );
}
