interface IPlayer{
    clerkId : string;
    username : string;
    avatar : string;
}

export interface IChallengeProblem{
    problemId : string;
    title : string;
    difficulty: number;
    points: number;
}

export interface IChallenge {
    clerkId: string;
    title: string;
    description: string;
    thumbnail: string;
    images: Array<String>;
    problem: Array<String | IChallengeProblem>;
    viewer: string;
    secret_code?: string;
    reward?: Array<String>;
    status?: string;
    startTime: number;
    endTime: number;
    player?: Array<String | IPlayer>;
}