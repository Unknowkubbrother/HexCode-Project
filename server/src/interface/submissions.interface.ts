export interface ISubmission {
    clerkId: string;
    problemId: string;
    testcases: Array<object>;
    points: Number;
    source_code: string;
    success: boolean;
  }