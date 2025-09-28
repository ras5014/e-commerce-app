import { z } from "zod";

/*
In Zod, fields are required by default.
To make a field optional, use .optional().
*/
export const registerUserSchema = z.object({
  firstName: z.string().min(1, "first name is required"),
  lastName: z.string().min(1, "last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  cartItems: z.array(
    z
      .object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
      .optional()
  ), // optional field
  role: z.enum(["customer", "admin"]).default("customer"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UserType = z.infer<typeof registerUserSchema>;
