import { Request, Response, NextFunction } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "src/services/auth.service.js";
import { setCookies } from "src/utils/helpers/auth.helper.js";
import { errorResponse, successResponse } from "src/utils/responses.util.js";
import jwt from "jsonwebtoken";
import redis from "src/lib/redis.js";

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

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { user, accessToken, refreshToken } = await loginUser(data);
    setCookies(res, accessToken, refreshToken);
    successResponse(res, user, 200, "User logged in successfully");
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

export const refreshAccessTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return errorResponse(res, 401, "Refresh token not found");
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const storedRefreshToken = await redis.get(
      `refresh_token:${(decodedRefreshToken as any)._id}`
    );

    if (storedRefreshToken !== refreshToken) {
      return errorResponse(res, 403, "Invalid refresh token");
    }

    const accessToken = jwt.sign(
      { userId: (decodedRefreshToken as any)._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    successResponse(res, null, 200, "Access token refreshed successfully");
  } catch (error) {
    next(error);
  }
};
