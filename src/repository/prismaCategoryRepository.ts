import { prismaClient } from "../config/prisma";
import { Category, CategoryRepository } from "../interfaces/categories";

class PrismaCategoryRepository implements CategoryRepository {
    async save(rawDate: Omit<Category, "id">): Promise<Category> {
        return await prismaClient.category.create({
            data: {
                ...rawDate
            }
        })
    }

    async finbByTitleAndOwnerId(title: string, ownerId: string): Promise<Category | null> {
        return await prismaClient.category.findFirst({
            where: {
                title,
                ownerId
            }
        })
    }
}

export default new PrismaCategoryRepository();