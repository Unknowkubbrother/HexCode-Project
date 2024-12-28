export interface ProblemInterface {
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