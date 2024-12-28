import { Schema, model } from "mongoose";

const LogSchema = new Schema(
  {
    clerkId: {
        type: String,
        required: true,
    },
    action : {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    }
  },
  { timestamps: true }
);

export const LogModel = model("logs", LogSchema);
