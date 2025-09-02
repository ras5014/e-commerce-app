import { Request, Response, NextFunction } from "express";
import { logoutUser, registerUser } from "src/services/auth.service.js";
import { setCookies } from "src/utils/helpers/auth.helper.js";
import { errorResponse, successResponse } from "src/utils/responses.util.js";

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

export const logoutUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      errorResponse(res, 400, "Refresh token not found");
      return;
    }
    await logoutUser(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    successResponse(res, null, 204, "User logged out successfully");
  } catch (error) {
    next(error);
  }
};
