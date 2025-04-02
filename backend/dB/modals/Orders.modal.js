import mongoose, { Schema } from "mongoose";

// Define Cart Item Schema (Matches Your TypeScript Type)
const cartItemSchema = new Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, enum: ["LT", "ULT", "HF", "FL", "SL"], required: true }, // Enforcing category type
  quantity: { type: Number, required: true },
});

// Define Order Schema
const orderSchema = new Schema(
  {
    customer: {
      username: { type: String, required: true },
      contact: { type: String, required: true },
      location: { type: String, required: true },
      _id: { type: String, required: true },
    },
    cart: [cartItemSchema], // ✅ Store cart items as an array of objects
    total: { type: Number, required: true }, // ✅ Add total amount field
    payment_status: { type: String, enum: ["PAID", "POD"], required: true }, // ✅ Proper enum usage
    order_status: {
      type: String,
      enum: ["DECLINED", "APPROVED", "DELIVERED", "PENDING",'CROSS-CHECK'], // ✅ Proper enum usage
      required: true,
    },
  },
  { timestamps: true }
); // ✅ Automatically add createdAt & updatedAt timestamps

export const Order = mongoose.model("Order", orderSchema);
