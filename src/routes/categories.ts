import { Request, Response, Router } from "express";
import CategoryController from "@/controllers/categoryController";
import CategoryService from "@/services/categoryService";
import prismaCategoryRepository from "@/repository/prismaCategoryRepository";

const routesCategory = Router();
const categoryController = new CategoryController(new CategoryService(prismaCategoryRepository));

routesCategory.post("/", (request: Request, response: Response) => {
	categoryController.post(request, response);
});

routesCategory.patch("/:id", (request: Request, response: Response) => {
	categoryController.update(request, response);
});

routesCategory.delete("/:id", (request: Request, response: Response) => {
	categoryController.delete(request, response);
});

export default routesCategory;
