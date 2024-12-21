export interface ProblemInterface {
    id: string;
    title: string;
    difficulty: string;
    successRate: number;
    accepted: number;
    submissions: number;
    author: {
        name: string;
        avatar: string;
    };
    point: number;
  }