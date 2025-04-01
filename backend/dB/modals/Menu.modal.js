import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    menu: {
      type: Map, // ✅ Store menu as a key-value object
      of: new mongoose.Schema({
        "price-hf": { type: Number, required: false, default: null }, // ✅ Can be null
        "price-fl": { type: Number, required: true }, // ✅ Must be provided
        "AVL": { type: Boolean, required: true, default: true }, // ✅ Tracks availability
      }),
    },
  });

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;