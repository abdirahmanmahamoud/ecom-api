import express from "express";
import { middleware } from "../../lib/middlewares.js";
import { getAllUsers, getUserById, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", middleware as any, getAllUsers as any);
router.get("/:id", middleware as any, getUserById as any);

router.put("/:id", middleware as any, updateUser as any);

export default router;
