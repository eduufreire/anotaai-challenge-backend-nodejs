import { Request, Response } from "express";
import { createCategorySchema } from "@/validators/categoryValidator";
import CategoryService from "../services/categoryService";
import prismaCategoryRepository from "../repository/prismaCategoryRepository";

export default class CategoryController {
    constructor(
        private categoryService = new CategoryService(prismaCategoryRepository)
    ) {}

    async post(request: Request, response: Response) {
        try {
            const schema = createCategorySchema.safeParse(request.body)

            if(!schema.success) {
                console.log(schema.error)
                throw new Error("Error no zod")
            }

            const result = await this.categoryService.create(schema.data) 

            console.log(schema.data)
            return response.send(result)
        } catch (error) {
            console.log(error)
        }
    }
} 