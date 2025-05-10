export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	categoryId: string;
}

export interface CreateProductDTO {
	title: string;
	description: string;
	price: number;
	categoryId: string;
}

export interface ShowProductDTO {
	id: string;
	title: string;
	description: string;
	price: number;
	categoryId: string;
}

export interface UpdateProductDTO {
	title?: string;
	description?: string;
	price?: number;
	categoryId?: string;
}

export interface ProductRepository {
	save(rawDate: any): Promise<Product>;
	update(id: string, fieldsUpdate: any): Promise<Product>;
	delete(id: string): Promise<Product>;
	findById(id: string): Promise<Product | null>;
	finbByTitleAndCategoryId(title: string, categoryId: string): Promise<Product | null>;
}
