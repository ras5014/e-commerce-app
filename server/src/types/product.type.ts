import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  isFeatured: z.boolean().optional().default(false),
  category: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image URL is required"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = Partial<CreateProductInput>;
