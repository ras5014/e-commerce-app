import express from "express";
import logger from "src/utils/logger.util.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.middleware.js";
import { db } from "./lib/db.js";
import authRoute from "src/routes/auth.route.js";
import productRoute from "src/routes/product.router.js";
import cartRoute from "src/routes/cart.route.js";
import redis from "./lib/redis.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

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
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);

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
