import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/products";
import { middleware } from "../../lib/middlewares";

const router = express.Router();

router.get("/", getProducts as any);

router.post("/", middleware as any, createProduct as any);

router.put("/:id", updateProduct as any);

router.delete("/:id", deleteProduct as any);

router.get("/:id", getProductById as any);

export default router;
