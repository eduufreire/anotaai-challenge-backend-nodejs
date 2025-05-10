import { CreateProductDTO, ProductRepository, UpdateProductDTO } from "@/interfaces/products";
import CategoryService from "@/services/categoryService";
import ProductMapper from "@/utils/dtos/productDTO";
import { ConflictError, NotFoundError } from "@/utils/exceptions/customException";
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
		const result = await this.repository.save(rawData);
		return ProductMapper.parseToDTO(result);
	}

	async update(id: string, fieldsUpdate: UpdateProductDTO) {
		const productExists = await this.repository.findById(id);

		if (!productExists) {
			throw new ConflictError("Product already exists");
		}

		if (fieldsUpdate.categoryId) {
			await this.categoryService.findById(fieldsUpdate.categoryId);
		}

		const result = await this.repository.update(id, fieldsUpdate);
		return ProductMapper.parseToDTO(result);
	}

	async delete(id: string) {
		console.log(id)
		const productExists = this.repository.findById(id);
		if (!productExists) {
			throw new NotFoundError("Product not found");
		}
		return await this.repository.delete(id);
	}
}
