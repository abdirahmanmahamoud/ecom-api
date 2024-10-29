import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/products.js";
import { middleware } from "../../lib/middlewares.js";

const router = express.Router();

router.get("/", getProducts as any);

router.post("/", middleware as any, createProduct as any);

router.put("/:id", middleware as any, updateProduct as any);

router.delete("/:id", middleware as any, deleteProduct as any);

router.get("/:id", getProductById as any);

export default router;
