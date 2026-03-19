import dotenv from "dotenv"
import { createProxyMiddleware } from "http-proxy-middleware";
dotenv.config()

export const chatProxy = createProxyMiddleware({
  target: process.env.CHAT_SERVICE,
  changeOrigin: true,
  pathRewrite: {
    "^/api/chat": ""
  }
});