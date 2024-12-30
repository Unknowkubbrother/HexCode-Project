"use client"
import { useState, useEffect } from "react";
import PDFViewer from "@/components/ui/pdf-viewer";
import CodeEditor from "@/components/ui/CodeEditor";
import customLanguages from "@/config/languages";

export default function TabProblem({ problemsId }: { problemsId: string }) {
  const [language, setLanguage] = useState<string>("javascript");

  const [code, setCode] = useState<string>(customLanguages[language].template);


  useEffect(() => {
    setCode(customLanguages[language].template);
  }, [language]);


  return (
    <div className="w-full h-full flex justify-between gap-3">
      <div className="w-1/2 h-[650px] bg-bgsecondary rounded-lg p-5">
        <div className="w-full h-full">
          <PDFViewer
            url={`${process.env.NEXT_PUBLIC_API_END_POINT}/file/docs/${problemsId}`}
            className="rouned-lg overflow-hidden"
          />
        </div>
      </div>
      <div className="w-1/2 h-[650px] bg-bgsecondary rounded-lg">
        <CodeEditor
          code={code}
          setCode={setCode}
          className="rounded-lg"
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
}
