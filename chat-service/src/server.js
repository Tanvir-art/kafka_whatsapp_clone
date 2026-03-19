import express from "express";
import dotenv from "dotenv";

import  connectDB  from "./config/db.js";
import { producer } from "./config/kafka.js";

import messageRoutes from "./routes/message.routes.js";
import groupRoutes from "./routes/group.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/messages", messageRoutes);
app.use("/groups", groupRoutes);

const startServer = async () => {

  await connectDB();

  await producer.connect();

  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`Chat Service running on port ${PORT}`);
  });

};

startServer();
