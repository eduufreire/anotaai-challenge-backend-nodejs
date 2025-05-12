import "reflect-metadata";
import { Container } from "inversify";
import CategoryController from "@/controllers/categoryController";
import { CategoryRepository } from "@/interfaces/categories";
import PrismaCategoryRepository from "@/repository/prismaCategoryRepository";
import CategoryService from "@/services/categoryService";
import { ProductRepository } from "@/interfaces/products";
import PrismaProductRepository from "@/repository/prismaProductRepository";
import ProductService from "@/services/productService";
import ProductController from "@/controllers/productController";
import SqsService, { MessagingService } from "@/services/sqsService";

const container: Container = new Container();

container.bind<MessagingService>("MessagingService").to(SqsService);

container.bind<CategoryRepository>("CategoryRepository").to(PrismaCategoryRepository);
container.bind("CategoryService").to(CategoryService);
container.bind("CategoryController").to(CategoryController);

container.bind<ProductRepository>("ProductRepository").to(PrismaProductRepository);
container.bind("ProductService").to(ProductService);
container.bind("ProductController").to(ProductController);

export default container;
