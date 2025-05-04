import { Category, ShowCategoryDTO } from "../interfaces/categories";

export class CategoryDTO {
	private constructor() {}

	static parse(category: Category): ShowCategoryDTO {
		return {
			id: category.id,
			title: category.title,
			description: category.description,
			ownerId: category.ownerId,
		};
	}

	static parseArray(categories: Array<Category>): Array<ShowCategoryDTO> {
		return categories.map((c) => CategoryDTO.parse(c));
	}
}
