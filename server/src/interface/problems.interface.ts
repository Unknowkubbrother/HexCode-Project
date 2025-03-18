export interface IProblem {
    clerkId: string;
    title: string;
    description?: string;
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