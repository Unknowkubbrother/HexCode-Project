export interface ListProblemInterface {
    id: string;
    title: string;
    difficulty: number;
    successRate: number;
    accepted: number;
    submissions: number;
    author: {
        name: string;
        avatar: string;
    };
    points: number;
}

export interface IProblem {
    _id: string;
    clerkId: string;
    title: string;
    description: string;
    difficulty: number;
    type: Array<number>;
    submissions?: number;
    accepted?: number;
    docs?: string;
    hint?: Array<string>;
    status?: string;
    viewer?: string;
    sercet_code?: string;
    source_code?: string;
    cpu_time_limit?: number;
    memory_limit?: number;
    stack_limit?: number;
    max_file_size?: number;
}