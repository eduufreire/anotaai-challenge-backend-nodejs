import { CategoryDTO } from "../dtos/categoryDTO";
import { CategoryRepository, CreateCategoryDTO } from "../interfaces/categories";

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
}
