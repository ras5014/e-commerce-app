import { z } from "zod";

/*
In Zod, fields are required by default.
To make a field optional, use .optional().
*/
export const registerUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
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

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
