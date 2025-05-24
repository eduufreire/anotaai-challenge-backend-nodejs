import CategoryController from "@/controllers/categoryController";
import ProductController from "@/controllers/productController";
import MongoCategoryRepository from "@/repository/mongoCategoryRepository";
import MongoProductRepository from "@/repository/mongoProductRepository";
import CategoryService from "@/services/categoryService";
import ProductService from "@/services/productService";
import SqsService from "@/services/sqsService";

const productRepository = new MongoProductRepository();
const categoryRepository = new MongoCategoryRepository();

const sqsService = new SqsService();

const categoryService = new CategoryService(categoryRepository, sqsService);
const productService = new ProductService(productRepository, categoryService, sqsService);

export const categoryController = new CategoryController(categoryService);
export const productController = new ProductController(productService);