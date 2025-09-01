import { NextFunction, Request, Response } from "express";
import { errorResponse } from "src/utils/responses.util.js";
import { fromError } from "zod-validation-error";

// Define a custom error interface if you want to use custom properties
export interface CustomError extends Error {
  statusCode?: number;
  // Add other custom properties if needed
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred";

  // Handle Zod validation errors
  if (err.name === "ZodError") {
    const validationError = fromError(err);
    return errorResponse(
      res,
      400,
      validationError.toString() || "Validation failed"
    );
  }

  errorResponse(res, statusCode, message);
};
