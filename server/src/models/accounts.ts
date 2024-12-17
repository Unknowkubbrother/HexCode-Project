import {  Schema, model } from "mongoose";
import Roles from "../enum/roles";

export interface AccountInterface {
    username: string;
    email: string;
    role: Roles;
    authentication?: {
        password: string;
        salt?: string;
        sessionToken?: string;
    };
    DateCreated: Date;
    IsActive: boolean;
}

const AccountSchaema = new Schema({
    username: { type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true},
    role: { type: String, enum: Object.values(Roles), required: true, default: Roles.USER},
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    DateCreated: { type: Date, default: Date.now , required: true},
    IsActive : {type : Boolean, default : true}
});

export const AccountModel = model("Account", AccountSchaema);

export const getUsers = () => AccountModel.find();
export const getUserById = (id: string) => AccountModel.findById(id);
export const getUserByUsername = (username: string) => AccountModel.findOne({ username });
export const getUserByEmail = (email: string) => AccountModel.findOne({ email });
export const createUser = (values: Record<string, any>) => new AccountModel(values)
    .save().then((user : any) => user.toObject());
export const getUserBySessionToken = (sessionToken: string) => AccountModel.findOne({
    'authentication.sessionToken': sessionToken
});