import express from "express";
import { chatProxy } from "../services/chatProxy.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// protected route
router.use("/", verifyToken, chatProxy);

export default router;