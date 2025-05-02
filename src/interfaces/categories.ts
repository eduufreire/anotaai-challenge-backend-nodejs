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
	ownerId?: string;
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
	save(rawDate: Omit<Category, "id">): Promise<Category>;
	// update(id: string, data: CreateCategoryDTO): Promise<Category>;
	// delete(id: string): Promise<void>;
	// findById(id: string): Promise<Category>;
	// findByOwner(ownerId: number): Promise<Array<Category>>;
	finbByTitleAndOwnerId(title: string, ownerId: string): Promise<Category | null>;
	// findAll(): Promise<Array<Category>>;
}
