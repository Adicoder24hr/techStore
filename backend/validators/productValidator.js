import { z } from "zod";


export const createProductSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters long"),

    description: z
    .string()
    .trim()
    .min(10, "Product description must be at least 10 characters long"),

    price: z
    .number()
    .positive("Price must be greater than 0"),

    category: z
    .string()
    .trim()
    .min(2, "category is required"),

    image: z
    .string()
    .trim()
    .min(2, "Image URL is required"),

    features: z
    .array(z.string().trim().min(1))
    .default([]),

    rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot be greater than 5")
    .default(0),

    stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .default(0)
});

export const updateProductSchema = createProductSchema.partial();