export interface IChallenge {
    clerkId: string;
    title: string;
    description: string;
    thumbnail: string;
    images: Array<String>;
    problem: Array<String>;
    viewer: string;
    secret_code?: string;
    reward?: Array<Number>;
    status?: string;
    startTime: number;
    endTime: number;
}