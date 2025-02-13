import { Schema, model } from "mongoose";

const SubmissionSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    problemId: {
      type: String,
      required: true,
    },
    testcases: {
      type: Array,
      required: true,
      default: [],
    },
    points: {
      type: Number,
      required: true,
    },
    source_code: {
      type: String,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const SubmissionModel = model("submissions", SubmissionSchema);

export const createSubmissionDB = (values: {
  clerkId: string;
  problemId: string;
  testcases: Object[];
  points: number;
  source_code: string;
  success: boolean;
}) => new SubmissionModel(values).save().then((submission) => submission.toObject());

export const getSubmitbyClerkId = (clerkId: string) => SubmissionModel.find({ clerkId: clerkId });

export const getSubmitById = (problemId: string,clerkId:string) => SubmissionModel.find({problemId:problemId,clerkId:clerkId});
