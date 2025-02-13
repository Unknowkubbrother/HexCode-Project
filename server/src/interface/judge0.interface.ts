export interface IJudge0Submission {
    stdout: string | null;
    time: string | null;
    memory: number | null;
    stderr: string | null;
    token: string;
    compile_output: string | null;
    message: string | null;
    status: {
        id: number;
        description:
            | 'Processing'
            | 'In Queue'
            | 'Accepted'
            | 'Compilation Error'
            | 'Runtime Error (NZEC)'
            | 'Time Limit Exceeded';
    };
    testcaseId?: number;
}