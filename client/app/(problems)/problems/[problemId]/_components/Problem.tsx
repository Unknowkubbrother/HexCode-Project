"use client";
import Header from "./Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabProblem from "./TabProblem";
import TabSubmissions from "./TabSubmissions";
import { IProblem } from "@/interface/problems";
import { useState } from "react";

export default function Problem({ result , problemId }: {result : IProblem , problemId : string}) {
  const [myMaxPoints, setMyMaxPoints] = useState(result.myMaxPoints);

  return (
    <div className="w-full h-full flex flex-col">
      <Header title={result?.title ?? ""} points={myMaxPoints ?? 0} maxPoints={result?.maxPoints ?? 0} submissions={result?.submissions ?? 0} difficulty={result?.difficulty ?? 1} accpeted={result?.accepted ?? 0}/>
      <div className="w-full h-fit p-2">
        <Tabs defaultValue="problem" className="w-full">
          <header className="w-full flex">
            <TabsList className="rounded-lg p-1">
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
          </header>
          <div className="w-full h-fit rounded-b-lg rounded-lg mt-2">
            <TabsContent value="problem">
              <TabProblem problemData={result} setMyPoints={setMyMaxPoints}/>
            </TabsContent>
            <TabsContent value="submissions">
              <TabSubmissions problemId={problemId}/>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
