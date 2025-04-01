import express from "express";
import {
  AddItem,
  CreateOrder,
  DeleteItem,
  DeleteReview,
  MenuControl,
  OrderBook,
  OrderStatus,
  UpdateItem,
} from "../controller/Admin.controls.js";
import { GetMenu } from "../controller/Client.controls.js";

const routing = express.Router();

routing.post("/create_order", CreateOrder);
routing.get("/order-book", OrderBook);
routing.delete("/delete-review/:_id", DeleteReview);
routing.post("/add-item", AddItem);
routing.put("/update-item/:_id", UpdateItem);
routing.delete("/delete-item/:_id", DeleteItem);
routing.put("/set_order_status", OrderStatus);
routing.post("/menu-edit",MenuControl)
routing.get("/menu",GetMenu)

export default routing;
