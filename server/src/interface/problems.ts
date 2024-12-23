export interface IProblem {
    clerkId: string;
    title: string;
    description: string;
    difficulty: number;
    type: Array<number>;
    submissions?: number;
    accepted?: number;
    filedocs?: string;
    hint?: Array<string>;
}

export interface IProblemTestCase {
    problemId: string;
    id: number;
    input: string;
    output: string;
    point: Number;
}