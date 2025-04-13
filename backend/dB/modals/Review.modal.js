import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  author: {
    username:String,
    contact:String,
    _id:String,
    location:String,
  },
  description: String,
},{
  timestamps: true // ✅ Moved here
});

export const Review = mongoose.model("Review", reviewSchema);
