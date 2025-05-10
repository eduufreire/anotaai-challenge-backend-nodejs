import { prismaClient } from "@/config/prisma";
import { Product, ProductRepository } from "@/interfaces/products";
import { date } from "zod";

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

	async update(id: string, fieldsUpdate: any): Promise<Product> {
		return await prismaClient.product.update({
			data: {
				...fieldsUpdate,
			},
			where: {
				id,
			},
		});
	}

	async findById(id: string): Promise<Product | null> {
		return await prismaClient.product.findFirst({
			where: { id },
		});
	}
}
