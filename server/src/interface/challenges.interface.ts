interface IPlayer{
    clerkId : string;
    username : string;
    avatar : string;
}

export interface IChallenge {
    clerkId: string;
    title: string;
    description: string;
    thumbnail: string;
    images: Array<String>;
    problem: Array<String>;
    viewer: string;
    secret_code?: string;
    reward?: Array<String>;
    status?: string;
    startTime: number;
    endTime: number;
    player?: Array<String | IPlayer>;
}