import { Request, Response } from "express";
import { createCategorySchema, updateCategorySchema } from "@/validators/categoryValidator";
import CategoryService from "@/services/categoryService";

export default class CategoryController {
	constructor(private categoryService: CategoryService) {}

	async post(request: Request, response: Response) {
		try {
			const schema = createCategorySchema.safeParse(request.body);

			if (!schema.success) {
				console.log(schema.error);
				throw new Error("Error no zod");
			}

			const result = await this.categoryService.create(schema.data);

			return response.status(201).send(result);
		} catch (error) {
			console.log(error);
			return response.status(500).send();
		}
	}

	async update(request: Request, response: Response) {
		try {
			const { id } = request.params;
			const schema = updateCategorySchema.safeParse(request.body);

			if (!schema.success) {
				console.log(schema.error);
				throw new Error("Error no zod");
			}

			const result = await this.categoryService.update(id, schema.data);
			return response.status(202).send(result);
		} catch (error) {
			console.log(error);
			return response.status(500).send();
		}
	}

	async delete(request: Request, response: Response) {
		try {
			const { id } = request.params;

			await this.categoryService.delete(id);

			return response.status(202).send();
		} catch (error) {
			console.log(error);
			return response.status(500).send();
		}
	}
}
