import { Schema, model } from "mongoose";
import {IAccount} from "@/interface/accounts.interface";
const AccountSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "member",
    },
    avatar: {
        type: String,
        required: false,
    },
    detail: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: "active",
    },
    followers: {
        type: Array,
        required: false,
        default: [],
    },
    following: {
        type: Array,
        required: false,
        default: [],
    },
  },
  { timestamps: true }
);

export const AccountModel = model("accounts", AccountSchema);


export const createAccount = async (value: IAccount) => 
    new AccountModel(value).save().then((account) => account.toObject());


export const getAccountbyClerkId = async (clerkId: string) => 
    AccountModel.findOne({ clerkId }).then((account) => account?.toObject());

export const getAccountbyUsername = async (username: string) => 
    AccountModel.findOne({ username }).then((account) => account?.toObject());

export const updateAccount = async (clerkId: string, value: IAccount) => 
    AccountModel.findOneAndUpdate({ clerkId }, value, { new: true }).then((account) => account?.toObject());


export const deleteAccount = async (clerkId: string) => 
    AccountModel.findOneAndDelete({ clerkId }).then((account) => account?.toObject());