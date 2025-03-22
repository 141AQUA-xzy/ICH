import express from "express";
import {
  AddItem,
  CreateOrder,
  DeleteItem,
  DeleteReview,
  OrderBook,
  OrderStatus,
  UpdateItem,
} from "../controller/Admin.controls.js";

const routing = express.Router();

routing.post("/create_order", CreateOrder);
routing.get("/order-book", OrderBook);
routing.delete("/delete-review/:_id", DeleteReview);
routing.post("/add-item", AddItem);
routing.put("/update-item/:_id", UpdateItem);
routing.delete("/delete-item/:_id", DeleteItem);
routing.put("/set_order_status", OrderStatus);

export default routing;
