export interface IChallenge {
    clerkId: string;
    title: string;
    description: string;
    thumbnail: string;
    images: Array<String>;
    problem: Array<Object>;
    viewer: string;
    secret_code?: string;
    reward?: Array<String>;
    status?: string;
    startTime: number;
    endTime: number;
}