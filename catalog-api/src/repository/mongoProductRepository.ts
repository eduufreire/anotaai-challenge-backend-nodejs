import { logger } from "../config/logger";
import { ProductModel } from "../config/mongoose";
import { Product, ProductRepository } from "../interfaces/products";
import { DatabaseError } from "../utils/exceptions/customException";

export default class MongoProductRepository implements ProductRepository {
	async save(rawDate: any): Promise<Product> {
		try {
			return await ProductModel.create({
				price: rawDate.price,
				title: rawDate.title,
				description: rawDate.description,
				category: rawDate.categoryId,
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

	async finbByTitleAndCategoryId(title: string, category: string): Promise<Product | null> {
		try {
			const result = await ProductModel.find({ title, category }).exec();
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

	async update(id: string, fieldsUpdate: any): Promise<Product | null> {
		try {
			await ProductModel.findById(id).updateOne({ ...fieldsUpdate });
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

	async findById(id: string): Promise<Product | null> {
		try {
			return await ProductModel.findById(id).exec();
		} catch (error) {
			const e = error as Error;
			logger.error({
				label: "DatabaseException",
				message: e.message,
			});
			throw new DatabaseError("Internal Server Error");
		}
	}

	async delete(id: string): Promise<Product> {
		try {
			return await ProductModel.findById(id).deleteOne();
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
