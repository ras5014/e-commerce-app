import redis from "src/lib/redis.js";
import User from "src/models/user.model.js";
import { LoginUserInput, RegisterUserInput } from "src/types/auth.types.js";
import {
  generateToken,
  storeRefreshToken,
} from "src/utils/helpers/auth.helper.js";
import jwt from "jsonwebtoken";

export const registerUser = async (input: RegisterUserInput) => {
  const { firstName, lastName, email, password, role } = input;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User with this email already exists");
  }

  const userDoc = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
    cartItems: [],
  });

  const user = {
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    email: userDoc.email,
    role: userDoc.role,
    cartItems: userDoc.cartItems,
    _id: userDoc._id,
  };

  const { accessToken, refreshToken } = generateToken(user._id);
  // You might want to store the refresh token in the database or send it as a cookie
  await storeRefreshToken(user._id, refreshToken);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (input: LoginUserInput) => {
  const { email, password } = input;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);
    return { user, accessToken, refreshToken };
  } else {
    throw new Error("Invalid email or password");
  }
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
