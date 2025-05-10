import ProductService from "@/services/productService";
import { ZodError } from "@/utils/exceptions/customException";
import { createProductSchema, updateProductSchema } from "@/utils/validators/productValidator";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export default class ProductController {
	constructor(
		@inject("ProductService")
		private service: ProductService,
	) {}

	async create(request: Request, response: Response) {
		const schema = createProductSchema.safeParse(request.body);

		if (!schema.success) {
			throw new ZodError("Invalid fields sending in the body", schema.error.issues);
		}

		const result = await this.service.create(schema.data);

		return response.status(201).json(result);
	}

	async update(request: Request, response: Response) {
		const { id } = request.params;
		const schema = updateProductSchema.safeParse(request.body);

		if (!schema.success) {
			throw new ZodError("Invalid fields sending in the body", schema.error.issues);
		}

		const result = await this.service.update(id, schema.data);
		return response.status(202).json(result);
	}
}
