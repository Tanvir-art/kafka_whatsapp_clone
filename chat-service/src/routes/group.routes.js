import express from "express";
import { createGroup } from "../module/controllers/group.controller.js";

const router = express.Router();

router.post("/create", createGroup);

export default router;