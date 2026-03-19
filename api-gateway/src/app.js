import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import { logger } from "./utils/logger.js";
import { limiter } from "./middleware/rateLimit.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(limiter);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app;