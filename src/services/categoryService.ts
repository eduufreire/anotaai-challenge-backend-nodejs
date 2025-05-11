import { CategoryDTO } from "@/utils/dtos/categoryDTO";
import {
	Category,
	CategoryRepository,
	CreateCategoryDTO,
	UpdateCategoryDTO,
} from "../interfaces/categories";
import { injectable, inject } from "inversify";
import { ConflictError, NotFoundError } from "@/utils/exceptions/customException";

@injectable()
export default class CategoryService {
	constructor(
		@inject("CategoryRepository")
		private repository: CategoryRepository,
	) {}

	async create(rawData: CreateCategoryDTO): Promise<any> {
		const categoryExists = await this.repository.finbByTitleAndOwnerId(
			rawData.title,
			rawData.ownerId,
		);

		if (categoryExists) {
			throw new ConflictError("Category already exists");
		}

		const savedCategory = await this.repository.save(rawData);
		return CategoryDTO.parse(savedCategory);
	}

	async findById(id: string): Promise<Category> {
		const categoryExists = await this.repository.findById(id);
		if (!categoryExists) {
			throw new NotFoundError("Category not found");
		}

		return categoryExists;
	}

	async update(id: string, fieldsUpdate: UpdateCategoryDTO) {
		const categoryExists = await this.repository.findById(id);

		if (!categoryExists) {
			throw new NotFoundError("Category not found");
		}

		const updatedCategory = await this.repository.update(id, fieldsUpdate);
		return CategoryDTO.parse(updatedCategory);
	}

	async delete(id: string) {
		const categoryExists = await this.repository.findById(id);

		if (!categoryExists) {
			throw new NotFoundError("Category not found");
		}

		return await this.repository.delete(id);
	}
}
