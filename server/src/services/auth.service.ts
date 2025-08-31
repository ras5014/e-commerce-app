import User from "src/models/user.model.js";
import { RegisterUserInput } from "src/types/auth.types.js";

export const registerUser = async (input: RegisterUserInput) => {
  const { name, email, password, role } = input;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User with this email already exists");
  }

  const user = await User.create({ name, email, password, role });
  return user;
};
