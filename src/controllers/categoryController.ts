import { Request, Response } from "express";
import { createCategorySchema, updateCategorySchema } from "@/utils/validators/categoryValidator";
import CategoryService from "@/services/categoryService";
import { inject, injectable } from "inversify";
import { ZodError } from "@/utils/exceptions/customException";
import { logger } from "@/config/logger";

@injectable()
export default class CategoryController {
	constructor(
		@inject("CategoryService")
		private categoryService: CategoryService,
	) {}

	async post(request: Request, response: Response) {
		const schema = createCategorySchema.safeParse(request.body);
		if (!schema.success) {
			throw new ZodError("Invalid fields sending in the body", schema.error.issues);
		}

		const result = await this.categoryService.create(schema.data);

		return response.status(201).send(result);
	}

	async update(request: Request, response: Response) {
		const { id } = request.params;
		const schema = updateCategorySchema.safeParse(request.body);

		if (!schema.success) {
			throw new ZodError("Invalid fields sending in the body", schema.error.issues);
		}

		const result = await this.categoryService.update(id, schema.data);
		return response.status(202).send(result);
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;

		await this.categoryService.delete(id);

		return response.status(202).send();
	}
}
