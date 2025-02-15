import {IJudge0Submission} from './judge0';

export interface ISubmission {
    _id: string;
    clerkId?: string;
    problemId: string;
    testcases: Array<IJudge0Submission>;
    points: Number;
    source_code: string;
    language_id: number;
    success: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    language_name?: string;
  }