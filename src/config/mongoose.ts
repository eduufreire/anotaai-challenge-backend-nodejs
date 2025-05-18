import { Category } from "@/interfaces/categories";
import { Product } from "@/interfaces/products";
import mongoose, { Schema } from "mongoose";
mongoose
	.connect("mongodb://root:urubu100@127.0.0.1:27017/catalogos?authSource=admin")
	.catch((error) => console.log(error));

const CategorySchema = new mongoose.Schema({
	title: String,
	description: String,
	ownerId: String,
});

const ProductSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Schema.Types.Double,
	category: { type: Schema.Types.ObjectId, ref: "category" },
});

export const CategoryModel = mongoose.model<Category>("category", CategorySchema);
export const ProductModel = mongoose.model<Product>("product", ProductSchema);
