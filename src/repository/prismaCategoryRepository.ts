import { prismaClient } from "../config/prisma";
import { Category, CategoryRepository, UpdateCategoryDTO } from "../interfaces/categories";

class PrismaCategoryRepository implements CategoryRepository {
	async save(rawDate: Omit<Category, "id">): Promise<Category> {
		return await prismaClient.category.create({
			data: {
				...rawDate,
			},
		});
	}

	async findById(id: string): Promise<Category | null> {
		return await prismaClient.category.findFirst({
			where: {
				id,
			},
		});
	}

	async finbByTitleAndOwnerId(title: string, ownerId: string): Promise<Category | null> {
		return await prismaClient.category.findFirst({
			where: {
				title,
				ownerId,
			},
		});
	}

	async update(id: string, fieldsUpdate: UpdateCategoryDTO): Promise<Category> {
		return await prismaClient.category.update({
			data: {
				...fieldsUpdate,
			},
			where: {
				id,
			},
		});
	}

	async delete(id: string): Promise<Category> {
		return await prismaClient.category.delete({
			where: {
				id,
			},
		});
	}
}

export default new PrismaCategoryRepository();
