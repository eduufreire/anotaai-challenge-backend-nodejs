import { Category, CategoryWithProducts, DefaultRepository } from "../repository/interfaces"
import BucketService from "./bucketService"
import { PrismaCategoryRepository } from "../repository/prismaCategoryRepository"

export interface Catalog {
    owner: string;
    catalog: {
        category_title: string;
        category_description: string;
        itens: {
            title: string;
            description: string;
            price: number;
        }[]
    }[]
}

export default class CatalogService {
    constructor(
        private repository: PrismaCategoryRepository,
        private bucketService: BucketService
    ) {}

    async emit(ownerId: string) {
        const result = await this.repository.findByOwner(ownerId)
        if(!result) {
            throw new Error("Not found")
        }

        const catalogFormatted = this.formatCatalog(ownerId, result)

        const objectKey = `catalog_${ownerId}_${Date.now().toString()}`
    
        await this.bucketService.uploadArchive(
            catalogFormatted,
            "catalog-owner-anotaai-challenge",
            objectKey
        )

        console.log(objectKey)
    }

    formatCatalog(ownerId: string, data: CategoryWithProducts[]): Catalog {
        return {
            owner: ownerId,
            catalog: data.map(category => ({
                category_title: category.title,
                category_description: category.description,
                itens: category.products.map(item => ({
                    title: item.title,
                    description: item.description,
                    price: item.price
                }))
            }))
        }
    }
}