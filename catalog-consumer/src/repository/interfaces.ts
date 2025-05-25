export interface DefaultRepository {
    findByOwner(owner: string): Promise<any[]>;
}

export interface Category {
	id: string;
	ownerId: string;
	title: string;
	description: string;
}

export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	categoryId: string;
}

export interface CategoryWithProducts {
    id: string;
    title: string;
    description: string;
    products: {
        id: string;
        title: string;
        description: string;
        price: number;
    }[]
}
