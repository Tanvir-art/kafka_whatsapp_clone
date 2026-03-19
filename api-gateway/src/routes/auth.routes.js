import express from "express";
import { authProxy } from "../services/authProxy.js";

const router = express.Router();

router.use("/", authProxy);

export default router;