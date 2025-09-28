import axiosInstance from "@/lib/axios";
import type {
  UserResponseType,
  RegisterUserInput,
  LoginUserInput,
} from "@/types/auth.type";

export const registerUser = async (data: RegisterUserInput) => {
  const res = await axiosInstance.post<UserResponseType>(
    "/v1/auth/register",
    data
  );
  if (res.data?.success === false) {
    throw new Error(res.data?.message || "Registration failed");
  }
  return res.data.data;
};

export const loginUser = async (data: LoginUserInput) => {
  const res = await axiosInstance.post<UserResponseType>(
    "/v1/auth/login",
    data
  );
  if (res.data?.success === false) {
    throw new Error(res.data?.message || "Login failed");
  }
  return res.data.data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get<UserResponseType>("/v1/auth/profile");
  if (res.data?.success === false) {
    throw new Error(res.data?.message || "Fetching profile failed");
  }
  return res.data.data;
};
