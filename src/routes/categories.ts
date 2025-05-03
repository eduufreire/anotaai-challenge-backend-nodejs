import { Request, Response, Router } from "express";
import "reflect-metadata";
import container from "@/config/container-dependencies";

const routesCategory = Router();
const controller: any = container.get("CategoryController");

routesCategory.post("/", (request: Request, response: Response) => {
	controller.post(request, response);
});

routesCategory.patch("/:id", (request: Request, response: Response) => {
	controller.update(request, response);
});

routesCategory.delete("/:id", (request: Request, response: Response) => {
	controller.delete(request, response);
});

export default routesCategory;
