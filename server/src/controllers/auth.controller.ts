import { Request, Response, NextFunction } from "express";
import { registerUser } from "src/services/auth.service.js";
import { successResponse } from "src/utils/responses.js";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = await registerUser(data);
    successResponse(res, user, 201, "User registered successfully");
  } catch (error) {
    next(error);
  }
};
