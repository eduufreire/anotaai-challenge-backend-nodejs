export interface Category {
	id: string;
	ownerId: string;
	title: string;
	description: string;
}

export interface CreateCategoryDTO {
	ownerId: string;
	title: string;
	description: string;
}

export interface UpdateCategoryDTO {
	title?: string;
	description?: string;
}

export interface ShowCategoryDTO {
	id: string;
	ownerId: string;
	title: string;
	description: string;
}

export interface CategoryRepository {
	save(rawData: Omit<Category, "id">): Promise<Category>;
	update(id: string, data: UpdateCategoryDTO): Promise<Category | null>;
	delete(id: string): Promise<Category>;
	findById(id: string): Promise<Category | null>;
	finbByTitleAndOwnerId(title: string, ownerId: string): Promise<Category | null>;
}
