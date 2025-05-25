import { Request, Response } from "express";
import { createCategorySchema, updateCategorySchema } from "../utils/validators/categoryValidator";
import CategoryService from "../services/categoryService";
import { ZodError } from "../utils/exceptions/customException";

export default class CategoryController {
	constructor(
		private categoryService: CategoryService,
	) {}

	async post(request: Request, response: Response) {
		const schema = createCategorySchema.safeParse(request.body);
		if (!schema.success) {
			throw new ZodError("Invalid fields sending in the body", schema.error.issues);
		}

		const result = await this.categoryService.create(schema.data);

		return response.status(201).json(result);
	}

	async update(request: Request, response: Response) {
		const { id } = request.params;
		const schema = updateCategorySchema.safeParse(request.body);

		if (!schema.success) {
			throw new ZodError("Invalid fields sending in the body", schema.error.issues);
		}

		const result = await this.categoryService.update(id, schema.data);
		return response.status(202).json(result);
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;
		const { ownerId } = request.body;

		await this.categoryService.delete(id, ownerId);

		return response.status(202).json();
	}
}
