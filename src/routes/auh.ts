import express from "express";
import { login, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login as any);

router.post("/signup", signup as any);

export default router;
