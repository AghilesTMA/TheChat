import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      uinque: true,
    },
    email: {
      type: String,
      required: true,
      uinque: true,
    },
    passWord: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: "avatar1",
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
