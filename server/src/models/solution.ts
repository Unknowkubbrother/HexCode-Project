import Status from "@/enum/status";
import { file } from "bun";
import { Schema, model } from "mongoose";

const SubmissionSchema = new Schema(
  {
    problemId: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
    },success: {
      type: Boolean,
      required: true,
    },score: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

interface ISubmission {
  title: string;
  clerkId: string;
  success: boolean;
  score: Number;
}

export const SubmissionModel = model("submissions", SubmissionSchema);

export const getSubmitById = (problemId: string,clerkId:string) => SubmissionModel.find({problemId:problemId,clerkId:clerkId});
