import { Category, CategoryRepository, UpdateCategoryDTO } from "../interfaces/categories";
import { DatabaseError } from "../utils/exceptions/customException";
import { CategoryModel } from "../config/mongoose";
import { logger } from "../config/logger";

export default class MongoCategoryRepository implements CategoryRepository {
	async save(rawDate: Omit<Category, "id">): Promise<Category> {
		try {
			return await CategoryModel.create({
				...rawDate,
			});
		} catch (error) {
			const e = error as Error;
			logger.error({
				label: "DatabaseException",
				message: e.message,
			});
			throw new DatabaseError("Internal Server Error");
		}
	}

	async findById(id: string): Promise<Category | null> {
		try {
			return await CategoryModel.findById(id).exec();
		} catch (error) {
			const e = error as Error;
			logger.error({
				label: "DatabaseException",
				message: e.message,
			});
			throw new DatabaseError("Internal Server Error");
		}
	}

	async finbByTitleAndOwnerId(title: string, ownerId: string): Promise<Category | null> {
		try {
			const result = await CategoryModel.find({ title, ownerId }).exec();
			if (result.length === 0) return null;
			const [first] = result;
			return {
				...first,
				id: first._id.toString(),
			};
		} catch (error) {
			const e = error as Error;
			logger.error({
				label: "DatabaseException",
				message: e.message,
			});
			throw new DatabaseError("Internal Server Error");
		}
	}

	async update(id: string, fieldsUpdate: UpdateCategoryDTO): Promise<Category | null> {
		try {
			await CategoryModel.findById(id).updateOne({ ...fieldsUpdate });
			return this.findById(id);
		} catch (error) {
			const e = error as Error;
			logger.error({
				label: "DatabaseException",
				message: e.message,
			});
			throw new DatabaseError("Internal Server Error");
		}
	}

	async delete(id: string): Promise<Category> {
		try {
			return await CategoryModel.findById(id).deleteOne();
		} catch (error) {
			const e = error as Error;
			logger.error({
				label: "DatabaseException",
				message: e.message,
			});
			throw new DatabaseError("Internal Server Error");
		}
	}
}
