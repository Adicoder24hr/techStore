import mongoose from "mongoose";
import { z }from "zod";


const objectIdSchema = z
    .string()
    .trim()
    .refine(
        value => mongoose.Types.ObjectId.isValid(value),
        "Invalid product ID"
    );

export const addToCartSchema = z.object({
    productId: objectIdSchema,

    quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
});

export const removeFromCartSchema = z.object({
    productId: z
    .string()
    .trim()
    .min(1, "Product ID is required")
});

