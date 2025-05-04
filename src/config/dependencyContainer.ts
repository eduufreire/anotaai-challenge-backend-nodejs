import "reflect-metadata";
import { Container } from "inversify";
import CategoryController from "@/controllers/categoryController";
import { CategoryRepository } from "@/interfaces/categories";
import PrismaCategoryRepository from "@/repository/prismaCategoryRepository";
import CategoryService from "@/services/categoryService";

const container: Container = new Container();

container.bind<CategoryRepository>("CategoryRepository").to(PrismaCategoryRepository);
container.bind("CategoryService").to(CategoryService);
container.bind("CategoryController").to(CategoryController);

export default container;
