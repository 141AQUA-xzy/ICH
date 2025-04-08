import express from "express";
import {
  CreateReview,
  CreateUser,
  DeletePending,
  GetMenu,
  GetMyOrders,
  GetReviews,
  LogoutUser,
  UpdateUser,
} from "../controller/Client.controls.js";

const router = express.Router();

router.post("/create_user", CreateUser);

router.put("/update_user", UpdateUser);

router.post("/feedback", CreateReview);

router.get("/menu-list", GetMenu);

router.get("/reviews",GetReviews)

router.post("/myOrders",GetMyOrders)

router.delete("/:id/logout",LogoutUser)

router.delete("/deleteOrder",DeletePending)

export default router;
