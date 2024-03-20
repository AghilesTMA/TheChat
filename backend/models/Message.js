import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    msg: {
      text: {
        type: String,
        required: true,
      },
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    users: Array,
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
