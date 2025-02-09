export interface IAccount {
    _id: string;
    clerkId: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
    detail?: string;
    status: string;
    followers?: Array<string> | number;
    following?: Array<string> | number;
    createdAt?: string;
    updatedAt?: string;
}