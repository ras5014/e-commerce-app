import redis from "src/lib/redis.js";
import User from "src/models/user.model.js";
import { RegisterUserInput } from "src/types/auth.types.js";
import {
  generateToken,
  storeRefreshToken,
} from "src/utils/helpers/auth.helper.js";
import jwt from "jsonwebtoken";

export const registerUser = async (input: RegisterUserInput) => {
  const { name, email, password, role } = input;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User with this email already exists");
  }

  const user = await User.create({ name, email, password, role });

  const { accessToken, refreshToken } = generateToken(user._id);
  // You might want to store the refresh token in the database or send it as a cookie
  await storeRefreshToken(user._id, refreshToken);

  return { user, accessToken, refreshToken };
};

export const logoutUser = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );
  if (typeof decoded === "object" && "_id" in decoded) {
    redis.del(`refresh_token:${decoded._id}`);
  }
};
