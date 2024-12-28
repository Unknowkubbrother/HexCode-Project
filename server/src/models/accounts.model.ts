import { Schema, model } from "mongoose";

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
