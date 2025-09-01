import jwt from "jsonwebtoken";
import redis from "src/lib/redis.js";
import { Response } from "express";
import mongoose, { type ObjectId } from "mongoose";

export const generateToken = (userId: mongoose.Types.ObjectId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (
  userId: mongoose.Types.ObjectId,
  refreshToken: string
) => {
  // Store the refresh token in the database or in-memory store
  // associated with the userId

  await redis.set(`refresh_token:${userId}`, refreshToken);
};

// Storing inside http cookie so that no one can access it via JavaScript
export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
