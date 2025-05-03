import z from "zod";

export const createCategorySchema = z.object({
	title: z.string(),
	description: z.string(),
	ownerId: z.string(),
});

export const updateCategorySchema = z.object({
	title: z.optional(z.string()),
	description: z.optional(z.string()),
});
