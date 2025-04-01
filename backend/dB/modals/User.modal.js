import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    contact: String,
    ip: String,
    location: String,
  },
  { timestamp: true }
);

export const User = mongoose.model("User", userSchema);
