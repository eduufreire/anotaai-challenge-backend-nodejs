import z from "zod"

export const createCategorySchema = z.object({
    title: z.string(),
    description: z.string(),
    ownerId: z.string()
})