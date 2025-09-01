import { Request, Response, NextFunction } from "express";
import { registerUser } from "src/services/auth.service.js";
import { setCookies } from "src/utils/helpers/auth.helper.js";
import { successResponse } from "src/utils/responses.util.js";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { user, accessToken, refreshToken } = await registerUser(data);
    setCookies(res, accessToken, refreshToken);
    successResponse(res, user, 201, "User registered successfully");
  } catch (error) {
    next(error);
  }
};
