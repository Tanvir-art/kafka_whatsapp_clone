import express from "express";
import { sendMessage } from "../module/controllers/message.controller.js";

const router = express.Router();

router.post("/send", sendMessage);

export default router;