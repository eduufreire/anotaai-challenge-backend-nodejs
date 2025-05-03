import { CategoryDTO } from "@/dtos/categoryDTO";
import { CategoryRepository, CreateCategoryDTO, UpdateCategoryDTO } from "../interfaces/categories";

export default class CategoryService {
	constructor(private repository: CategoryRepository) {}

	async create(rawData: CreateCategoryDTO): Promise<any> {
		try {
			const categoryExists = await this.repository.finbByTitleAndOwnerId(
				rawData.title,
				rawData.ownerId,
			);

			if (categoryExists) {
				throw new Error("Categoria Já Existe");
			}

			const savedCategory = await this.repository.save(rawData);
			return CategoryDTO.parse(savedCategory);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async update(id: string, fieldsUpdate: UpdateCategoryDTO) {
		try {
			const categoryExists = await this.repository.findById(id);

			if (!categoryExists) {
				throw new Error("Categoria não encontrada");
			}

			const updatedCategory = await this.repository.update(id, fieldsUpdate);
			return CategoryDTO.parse(updatedCategory);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async delete(id: string) {
		try {
			const categoryExists = await this.repository.findById(id);

			if (!categoryExists) {
				throw new Error("Categoria não encontrada");
			}

			return await this.repository.delete(id);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
