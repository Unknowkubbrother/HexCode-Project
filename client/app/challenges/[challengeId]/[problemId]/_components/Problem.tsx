"use client";
import Header from "./Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabProblem from "./TabProblem";
import Submissions from "./Submissions";
import {IChallenge} from "@/interface/challenges";
import { IProblem } from "@/interface/problems";
import { useState } from "react";

export default function Problem({ problemData , challengeData, problemId}: {problemData : IProblem , challengeData : IChallenge , problemId : string}) {
const [myMaxPoints, setMyMaxPoints] = useState(problemData.myMaxPoints);

  return (
    <div className="w-full h-full flex flex-col">
      <Header title={problemData?.title ?? ""} points={myMaxPoints ?? 0} maxPoints={problemData?.maxPoints ?? 0} difficulty={problemData?.difficulty ?? 1} challengeData={challengeData}/>
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
              <TabProblem problemData={problemData} setMyPoints={setMyMaxPoints}/>
            </TabsContent>
            <TabsContent value="submissions">
              <Submissions problemId={problemId}/>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
