import { Schema, model } from "mongoose";

const TransactionHistorySchema = new Schema(
  {
    transRefId:{
        type: String,
        required: true,
        unique: true,
    },
    clerkId: {
      type: String,
      required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    dateSlip: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

export const TransactionHistoryModel = model("transactionhistories", TransactionHistorySchema);
