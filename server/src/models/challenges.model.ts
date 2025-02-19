import { Schema, model } from "mongoose";
import { IChallenge } from "@/interface/challenges.interface";

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
    thumbnail: {
        type: String,
        require: true
    },
    images: {
        type: Array,
        require: true,
        default: [],
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
    startTime: {
        type: Number,
        required: true,
        default: "active",
    },
    endTime: {
        type: Number,
        required: true,
        default: "active",
    }
  },
  { timestamps: true }
);

export const ChallengeModel = model("challenges", ChallengeSchema);

export const createChallenge = async (value: IChallenge) => 
    new ChallengeModel(value).save().then((challenge) => challenge.toObject());