import mongoose from "mongoose";

const itemSchema = mongoose.Schema([
  {
    ItemName: String,
    Details: String,
    Price: Number,
    AvlQuantities: [],
  },
]);

export const Item = mongoose.model("Item", itemSchema);
