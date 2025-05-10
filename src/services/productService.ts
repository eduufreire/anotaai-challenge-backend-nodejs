import { CreateProductDTO, ProductRepository } from "@/interfaces/products";
import CategoryService from "./categoryService";
import { ConflictError } from "@/utils/exceptions/customException";
import { inject, injectable } from "inversify";

@injectable()
export default class ProductService {
	constructor(
		@inject("ProductRepository")
		private repository: ProductRepository,
		@inject("CategoryService")
		private categoryService: CategoryService,
	) {}

	async create(rawData: CreateProductDTO) {
		const categoryExists = await this.categoryService.findById(rawData.categoryId);

		const productExists = await this.repository.finbByTitleAndCategoryId(
			rawData.title,
			categoryExists.id,
		);

		if (productExists) {
			throw new ConflictError("Product already exists");
		}

		return await this.repository.save(rawData);
	}
}
