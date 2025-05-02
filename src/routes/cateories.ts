import { Request, Response, Router } from "express";
import CategoryController from "../controllers/categoryController";
import CategoryService from "../services/categoryService";
import prismaCategoryRepository from "../repository/prismaCategoryRepository";

const routesCategory = Router();
const categoryController = new CategoryController(
	new CategoryService(
		prismaCategoryRepository
	)
)

routesCategory.post("/", (request: Request, response: Response) => {
	categoryController.post(request, response);
});

routesCategory.patch("/", () => {
	console.log("Entrou no patch das categorias");
});

routesCategory.delete("/", () => {
	console.log("Entrou no delete das categorias");
});

export default routesCategory;
