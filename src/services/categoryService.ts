import { CategoryDTO } from "@/utils/dtos/categoryDTO";
import {
	Category,
	CategoryRepository,
	CreateCategoryDTO,
	UpdateCategoryDTO,
} from "../interfaces/categories";
import { ConflictError, NotFoundError } from "@/utils/exceptions/customException";
import { MessagingService } from "./sqsService";
import "dotenv/config";
export default class CategoryService {
	constructor(
		private repository: CategoryRepository,
		private messagingService: MessagingService,
	) {}

	async create(rawData: CreateCategoryDTO): Promise<any> {
		const categoryExists = await this.repository.finbByTitleAndOwnerId(
			rawData.title,
			rawData.ownerId,
		);

		if (categoryExists) {
			throw new ConflictError("Category already exists");
		}

		const savedCategory = await this.repository.save(rawData);

		await this.messagingService.sendMessage(process.env.EMITTER_QUEUE_URL, {
			owner: savedCategory.ownerId,
		});

		return CategoryDTO.parse(savedCategory);
	}

	async findById(id: string): Promise<Category> {
		const categoryExists = await this.repository.findById(id);
		if (!categoryExists) {
			throw new NotFoundError("Category not found");
		}

		return categoryExists;
	}

	async update(id: string, fieldsUpdate: UpdateCategoryDTO) {
		const categoryExists = await this.repository.findById(id);

		if (!categoryExists) {
			throw new NotFoundError("Category not found");
		}

		const result = await this.repository.update(id, fieldsUpdate);
		if (!result) throw new NotFoundError("Category not found");

		const updatedCategory = result;

		await this.messagingService.sendMessage(process.env.EMITTER_QUEUE_URL, {
			owner: updatedCategory.ownerId,
		});

		return CategoryDTO.parse(updatedCategory);
	}

	async delete(id: string, ownerId: string) {
		const categoryExists = await this.repository.findById(id);

		if (!categoryExists) {
			throw new NotFoundError("Category not found");
		}

		await this.repository.delete(id);

		await this.messagingService.sendMessage(process.env.EMITTER_QUEUE_URL, {
			owner: ownerId,
		});
	}
}
