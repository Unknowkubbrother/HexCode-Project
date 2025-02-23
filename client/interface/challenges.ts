export interface IPlayer{
    clerkId : string;
    username : string;
    avatar : string;
}

export interface IChallenge {
    _id: string;
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
    player?: Array<String | IPlayer[]>;
    createdAt?: string;
    updatedAt?: string;
}

export interface IListChallenge {
    _id: string;
    avatar: string;
    username: string;
    title: string;
    thumbnail: string;
    countPlayer: number;
    createdAt?: string;
    updatedAt?: string;
}
