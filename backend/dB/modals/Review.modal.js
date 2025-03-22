import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  author: {
    username:String,
    contact:String,
    ip:String,
    location:String,
  },
  description: String,
});

export const Review = mongoose.model("Review", reviewSchema);
