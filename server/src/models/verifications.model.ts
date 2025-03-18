
import { IVerify } from "@/interface/verifications.interface";
import { Schema, model } from "mongoose";

const ProblemSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    verifiyby: {
      type: String,
      required: true,
      default: "",
    },
    detail: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    verifiyDate: {
      type: Number,
      required: true,
      default: Date.now(),
    },
    success: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    result: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const VerifyModel = model("verify", ProblemSchema);

export const createProblem = (values: IVerify) =>
  new VerifyModel(values).save().then((verify) => verify.toObject());
