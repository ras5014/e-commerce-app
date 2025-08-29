import express from "express";
import logger from "src/utils/logger.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.middleware.js";

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

// Error Handling Middleware
app.use(errorHandler);

// Not Found Middleware
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;
app
  .listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    logger.error("Error starting server:", err);
  });
