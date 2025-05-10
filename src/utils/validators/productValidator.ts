import { z } from "zod";

export const createProductSchema = z.object({
	title: z.string().max(40),
	description: z.string().max(100),
	price: z.number().positive(),
	categoryId: z.string(),
});

export const updateProductSchema = z.object({
	title: z.optional(z.string().max(40)),
	description: z.optional(z.string().max(100)),
	price: z.optional(z.number().positive()),
	categoryId: z.optional(z.string()),
});
