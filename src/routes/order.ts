import express from "express";
import { middleware } from "../../lib/middlewares.js";
import {
  allOrders,
  CreateOrder,
  deleteOrder,
  getOrderByUser,
  orderById,
  updateOrder,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", middleware as any, CreateOrder as any);
router.get("/me", middleware as any, getOrderByUser as any);
router.put("/:id", middleware as any, updateOrder as any);
router.get("/", middleware as any, allOrders as any);
router.get("/:id", middleware as any, orderById as any);
router.delete("/:id", middleware as any, deleteOrder as any);

export default router;
