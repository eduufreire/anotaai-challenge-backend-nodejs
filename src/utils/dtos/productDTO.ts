import { Product, ShowProductDTO } from "@/interfaces/products";

export default class ProductMapper {
	private constructor() {}
	static parseToDTO(data: Product): ShowProductDTO {
		return {
			id: data.id,
			title: data.title,
			description: data.description,
			price: data.price,
			categoryId: data.categoryId,
		};
	}

	static parseArrayToDTO(data: Array<Product>): Array<ShowProductDTO> {
		return data.map((p) => ProductMapper.parseToDTO(p));
	}
}
