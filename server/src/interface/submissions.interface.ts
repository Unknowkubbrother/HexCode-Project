export interface ISubmission {
    clerkId: string;
    problemId: string;
    testcases: Array<object>;
    points: Number;
    source_code: string;
    language_id: number;
    success: boolean;
  }