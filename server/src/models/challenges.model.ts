import { Schema, model } from "mongoose";

const ChallengeSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    problem: {
        type: Array,
        required: true,
        default: [],
    },
    viewer: {
        type: String,
        required: true,
        default: "private",
    },
    secret_code: {
        type: String,
        required: false,
    },
    reward:{
        type: Array,
        required: false,
        default: [],
    },
    status: {
        type: String,
        required: true,
        default: "active",
    },
    starttime: {
        type: Number,
        required: true,
        default: "active",
    },
    endtime: {
        type: Number,
        required: true,
        default: "active",
    }
  },
  { timestamps: true }
);

export const ChallengeModel = model("challenges", ChallengeSchema);
