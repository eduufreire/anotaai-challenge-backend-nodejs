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
	update(id: string, data: UpdateCategoryDTO): Promise<Category>;
	delete(id: string): Promise<Category>;
	findById(id: string): Promise<Category | null>;
	// findByOwner(ownerId: number): Promise<Array<Category>>;
	finbByTitleAndOwnerId(title: string, ownerId: string): Promise<Category | null>;
	// findAll(): Promise<Array<Category>>;
}
