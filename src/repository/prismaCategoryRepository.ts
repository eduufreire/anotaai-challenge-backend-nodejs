import { Prisma } from "@prisma/client";
import { prismaClient } from "../config/prisma";
import { Category, CategoryRepository, UpdateCategoryDTO } from "../interfaces/categories";
import { DatabaseError } from "@/utils/exceptions/customException";

export default class PrismaCategoryRepository implements CategoryRepository {
	async save(rawDate: Omit<Category, "id">): Promise<Category> {
		try {
			return await prismaClient.category.create({
				data: {
					...rawDate,
				},
			});
		} catch (error) {
			throw new DatabaseError("Internal Server Error");
		}
	}

	async findById(id: string): Promise<Category | null> {
		try {
			return await prismaClient.category.findFirst({
				where: {
					id,
				},
			});
		} catch (error) {
			throw new DatabaseError("Internal Server Error");
		}
	}

	async finbByTitleAndOwnerId(title: string, ownerId: string): Promise<Category | null> {
		try {
			return await prismaClient.category.findFirst({
				where: {
					title,
					ownerId,
				},
			});
		} catch (error) {
			throw new DatabaseError("Internal Server Error");
		}
	}

	async update(id: string, fieldsUpdate: UpdateCategoryDTO): Promise<Category> {
		try {
			return await prismaClient.category.update({
				data: {
					...fieldsUpdate,
				},
				where: {
					id,
				},
			});
		} catch (error) {
			throw new DatabaseError("Internal Server Error");
		}
	}

	async delete(id: string): Promise<Category> {
		try {
			return await prismaClient.category.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw new DatabaseError("Internal Server Error");
		}
	}
}
