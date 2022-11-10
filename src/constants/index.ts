import { config } from "dotenv";

config();

export const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/blog-app";

export const NODE_CONFIGS = {
  PORT: process.env.NODE_PORT || 8000,
};
