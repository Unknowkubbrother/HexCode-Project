export interface IChallenge {
    clerkId: string;
    title: string;
    description: string;
    problem: Array<Object>;
    viewer: string;
    secret_code?: string;
    reward?: Array<String>;
    status: string;
}