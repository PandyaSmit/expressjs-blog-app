import mongoose from "mongoose";
import { MONGO_URL } from "../constants";

export class InitService {
  static async connectMongo() {
    try {
      await mongoose.connect(MONGO_URL);
      console.error(`db connected`);
    } catch (error) {
      throw error;
    }
  }
}
