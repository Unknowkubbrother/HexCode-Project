import React from "react";
import { ArrowRight } from "lucide-react";
import ItemProblem , {ItemProblemProps} from "./ItemProblem";
import Link from "next/link";

const example = [
  {
    id: "1",
    title: "Sum and Product",
    difficulty: "Easy",
    successRate: 80,
    accpted: 1000,
    submissions: 2000,
    author: "Shadab",
    point: 10,
  },
  {
    id: "2",
    title: "Binary Search",
    difficulty: "Medium",
    successRate: 60,
    accpted: 800,
    submissions: 1000,
    author: "Shadab",
    point: 20,
  },
  {
    id: "3",
    title: "Dynamic Programming",
    difficulty: "Hard",
    successRate: 40,
    accpted: 60,
    submissions: 100,
    author: "unknowkubbrother",
    point: 30,
  },
  {
    id: "4",
    title: "Graph Traversal",
    difficulty: "Medium",
    successRate: 55,
    accpted: 500,
    submissions: 900,
    author: "Alice",
    point: 20,
  },
  {
    id: "5",
    title: "Sorting Algorithms",
    difficulty: "Easy",
    successRate: 75,
    accpted: 1200,
    submissions: 1600,
    author: "Bob",
    point: 10,
  },
  {
    id: "6",
    title: "Linked List",
    difficulty: "Easy",
    successRate: 85,
    accpted: 1500,
    submissions: 1800,
    author: "Charlie",
    point: 10,
  },
  {
    id: "7",
    title: "Tree Traversal",
    difficulty: "Medium",
    successRate: 65,
    accpted: 700,
    submissions: 1100,
    author: "David",
    point: 20,
  },
  {
    id: "8",
    title: "Hash Map",
    difficulty: "Easy",
    successRate: 90,
    accpted: 2000,
    submissions: 2200,
    author: "Eve",
    point: 10,
  },
  {
    id: "9",
    title: "Recursion",
    difficulty: "Hard",
    successRate: 35,
    accpted: 300,
    submissions: 800,
    author: "Frank",
    point: 30,
  },
  {
    id: "10",
    title: "Backtracking",
    difficulty: "Hard",
    successRate: 45,
    accpted: 400,
    submissions: 900,
    author: "Grace",
    point: 30,
  },
  {
    id: "11",
    title: "Greedy Algorithms",
    difficulty: "Medium",
    successRate: 50,
    accpted: 600,
    submissions: 1200,
    author: "Heidi",
    point: 20,
  },
  {
    id: "12",
    title: "Divide and Conquer",
    difficulty: "Medium",
    successRate: 58,
    accpted: 650,
    submissions: 1300,
    author: "Ivan",
    point: 20,
  },
  {
    id: "13",
    title: "Bit Manipulation",
    difficulty: "Hard",
    successRate: 30,
    accpted: 250,
    submissions: 700,
    author: "Judy",
    point: 30,
  },
  {
    id: "14",
    title: "String Matching",
    difficulty: "Easy",
    successRate: 78,
    accpted: 1100,
    submissions: 1400,
    author: "Mallory",
    point: 10,
  },
  {
    id: "15",
    title: "Matrix Operations",
    difficulty: "Medium",
    successRate: 60,
    accpted: 800,
    submissions: 1500,
    author: "Niaj",
    point: 20,
  },
  {
    id: "16",
    title: "Number Theory",
    difficulty: "Hard",
    successRate: 40,
    accpted: 350,
    submissions: 900,
    author: "Olivia",
    point: 30,
  },
  {
    id: "17",
    title: "Game Theory",
    difficulty: "Medium",
    successRate: 55,
    accpted: 500,
    submissions: 1000,
    author: "Peggy",
    point: 20,
  },
  {
    id: "18",
    title: "Computational Geometry",
    difficulty: "Hard",
    successRate: 38,
    accpted: 280,
    submissions: 800,
    author: "Sybil",
    point: 30,
  },
  {
    id: "19",
    title: "Network Flow",
    difficulty: "Hard",
    successRate: 42,
    accpted: 320,
    submissions: 850,
    author: "Trent",
    point: 30,
  },
  {
    id: "20",
    title: "Dynamic Connectivity",
    difficulty: "Medium",
    successRate: 57,
    accpted: 600,
    submissions: 1100,
    author: "Victor",
    point: 20,
  },
];

const Problems = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Problems</h1>
        <span>
        <Link href="/problems" className="hover:text-primary duration-300">
          <ArrowRight size={20}/>
        </Link>
        </span>
      </header>
      <section className="w-full gap-5 mt-5 flex">
        <div className="w-[75%] overflow-y-auto">
          <div className="w-full h-fit rounded-lg grid grid-cols-1 gap-3">
            {example.map((value : ItemProblemProps ) => (
              <ItemProblem value={value} key={value.id} />
            ))}
          </div>
        </div>

        <div className="w-[25%] h-[500px] bg-bgsecondary rounded-2xl p-3">
          
        </div>
      </section>
    </main>
  );
};

export default Problems;
