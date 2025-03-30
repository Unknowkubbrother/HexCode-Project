
import { IVerify } from "@/interface/verifications.interface";
import { Schema, model } from "mongoose";

const VerifySchema = new Schema(
  {
    problemId: {
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
    success: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

export const VerifyModel = model("verification", VerifySchema);

export const createVerify = (values: IVerify) =>
  new VerifyModel(values).save().then((verify) => verify.toObject());


export const getVerifies = () =>
  VerifyModel.find()
    .then((verifies) => verifies.map((verify) => verify.toObject()))
    .catch((err) => {
      console.error(err);
      return [];
    });
  