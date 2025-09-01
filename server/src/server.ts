import express from "express";
import logger from "src/utils/logger.util.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.middleware.js";
import { db } from "./lib/db.js";
import authRoute from "src/routes/auth.route.js";
import redis from "./lib/redis.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes
app.use("/api/v1/auth", authRoute);

// Error Handling Middleware
app.use(errorHandler);

// Not Found Middleware
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

const server = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    logger.error("MONGO_URI environment variable is not set.");
    process.exit(1);
  }
  await db(mongoURI);
  // Ensure Redis is connected
  try {
    await redis.ping();
    logger.info("Connected to Redis");
  } catch (error) {
    logger.error("Error connecting to Redis:", error);
  }
  app
    .listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    })
    .on("error", (err) => {
      logger.error("Error starting server:", err);
    });
};

server();
