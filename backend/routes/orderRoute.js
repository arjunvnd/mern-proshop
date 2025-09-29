import express from "express";

import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDeliver,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(protect, isAdmin, getOrders).post(protect, addOrderItems);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, isAdmin, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDeliver);

export default router;
