import { CreateProductDTO, ProductRepository, UpdateProductDTO } from "@/interfaces/products";
import CategoryService from "@/services/categoryService";
import ProductMapper from "@/utils/dtos/productDTO";
import { ConflictError, NotFoundError } from "@/utils/exceptions/customException";
import { MessagingService } from "./sqsService";
import "dotenv/config";
export default class ProductService {
	constructor(
		private repository: ProductRepository,
		private categoryService: CategoryService,
		private messagingService: MessagingService,
	) {}

	async create(rawData: CreateProductDTO) {
		const categoryExists = await this.categoryService.findById(rawData.categoryId);

		const productExists = await this.repository.finbByTitleAndCategoryId(
			rawData.title,
			categoryExists.id,
		);

		if (productExists) {
			throw new ConflictError("Product already exists");
		}
		const result = await this.repository.save(rawData);

		await this.messagingService.sendMessage(process.env.EMITTER_QUEUE_URL, {
			owner: rawData.ownerId,
		});
		return ProductMapper.parseToDTO(result);
	}

	async update(id: string, fieldsUpdate: UpdateProductDTO, ownerId: string) {
		const productExists = await this.repository.findById(id);

		if (!productExists) {
			throw new ConflictError("Product already exists");
		}

		if (fieldsUpdate.categoryId) {
			await this.categoryService.findById(fieldsUpdate.categoryId);
		}

		const result = await this.repository.update(id, fieldsUpdate);
		if (!result) throw new ConflictError("Product not exists");

		await this.messagingService.sendMessage(process.env.EMITTER_QUEUE_URL, {
			owner: ownerId,
		});

		return ProductMapper.parseToDTO(result);
	}

	async delete(id: string, ownerId: string) {
		const productExists = await this.repository.findById(id);
		if (!productExists) {
			throw new NotFoundError("Product not found");
		}
		await this.repository.delete(id);
		await this.messagingService.sendMessage(process.env.EMITTER_QUEUE_URL, {
			owner: ownerId,
		});
	}
}
