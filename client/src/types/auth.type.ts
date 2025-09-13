import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    firstName: z.string().min(1, "Name is required"),
    lastName: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

export const RegisterResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      role: z.enum(["customer", "admin"]),
      _id: z.string(),
    })
    .optional(),
});

export type LoginUserInput = z.infer<typeof LoginFormSchema>;
export type RegisterUserInput = z.infer<typeof RegisterFormSchema>;
export type RegisterResponseType = z.infer<typeof RegisterResponseSchema>;
