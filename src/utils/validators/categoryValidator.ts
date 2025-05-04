import z from "zod";

export const createCategorySchema = z.object({
	title: z.string().max(40),
	description: z.string().max(60),
	ownerId: z.string(),
});

export const updateCategorySchema = z.object({
	title: z.optional(z.string().max(40)),
	description: z.optional(z.string().max(60)),
});
