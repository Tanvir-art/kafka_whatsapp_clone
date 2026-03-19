import dotenv from 'dotenv'
import { createProxyMiddleware } from "http-proxy-middleware"; 
dotenv.config()
export const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE,
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": ""
  }
});