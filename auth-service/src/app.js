import express from "express";
import authRoutes from "./app/module/auth.route.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Auth Service!");
});

app.use("/api/auth", authRoutes);


export default app;