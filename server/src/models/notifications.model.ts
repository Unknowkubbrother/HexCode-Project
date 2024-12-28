import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    receiverClerkId:{
        type: String,
        required: true,
    },
    senderClerkId: {
      type: String,
      required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export const NotificationModel = model("notifications", NotificationSchema);
