import { prismaClient } from "../../prisma/client";
import { CategoryWithProducts } from "./interfaces";

export class PrismaCategoryRepository {
    async findByOwner(owner: string): Promise<CategoryWithProducts[]> {
        const result = await prismaClient.category.findMany({
            include: {
                products: true
            },
            where: {
                ownerId: owner
            },   
        })

        const categoryWithProducts: CategoryWithProducts[] = result.map((c: any) => ({
            id: c.id,
            title: c.title,
            description: c.description,
            products: c.products.map((p: any) => ({
                id: p.id,
                title: p.title,
                description: p.description,
                price: p.price
            }))
        }))

        return categoryWithProducts
    }
}