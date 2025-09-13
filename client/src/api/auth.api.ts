import axiosInstance from "@/lib/axios";
import type {
  RegisterResponseType,
  RegisterUserInput,
} from "@/types/auth.type";

export const registerUser = async (data: RegisterUserInput) => {
  const res = await axiosInstance.post<RegisterResponseType>(
    "/v1/auth/register",
    data
  );
  if (res.data?.success === false) {
    throw new Error(res.data?.message || "Registration failed");
  }
  return res.data.data;
};
