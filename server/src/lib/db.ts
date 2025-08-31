import mongoose from "mongoose";
import logger from "src/utils/logger.js";

// connect to mongo
export const db = async (mongoURI: string) => {
  try {
    await mongoose.connect(mongoURI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
  }
};
