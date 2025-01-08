export interface IAccount {
    clerkId: string;
    username: string;
    email: string;
    role?: string;
    avatar?: string;
    detail?: string;
    status?: string;
    followers?: Array<string>;
    following?: Array<string>;
}