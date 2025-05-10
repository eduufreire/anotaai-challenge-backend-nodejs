import { prismaClient } from "@/config/prisma";
import { Product, ProductRepository } from "@/interfaces/products";

export default class PrismaProductRepository implements ProductRepository {
	async save(rawDate: any): Promise<Product> {
		return await prismaClient.product.create({
			data: {
				...rawDate,
			},
		});
	}

	async finbByTitleAndCategoryId(title: string, categoryId: string): Promise<Product | null> {
		return await prismaClient.product.findFirst({
			where: {
				title,
				categoryId,
			},
		});
	}
}
