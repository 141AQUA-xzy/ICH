import express from "express";
import {
  CreateReview,
  CreateUser,
  GetMenu,
  GetMyOrders,
  GetReviews,
  UpdateUser,
} from "../controller/Client.controls.js";

const router = express.Router();

router.post("/create_user", CreateUser);

router.put("/update_user", UpdateUser);

router.post("/feedback", CreateReview);

router.get("/menu-list", GetMenu);

router.get("/reviews",GetReviews)

router.post("/myOrders",GetMyOrders)

export default router;
