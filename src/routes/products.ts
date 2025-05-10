import container from "@/config/dependencyContainer";
import { NextFunction, Request, Response, Router } from "express";

const routesProducts = Router();
const controller: any = container.get("ProductController");

routesProducts.post("/", (request: Request, response: Response, next: NextFunction) => {
	Promise.resolve(controller.create(request, response)).catch((e) => next(e));
});

routesProducts.patch("/:id", (request: Request, response: Response, next: NextFunction) => {
	Promise.resolve(controller.update(request, response)).catch((e) => next(e));
});

routesProducts.delete(":/id", (request: Request, response: Response) => {});

export default routesProducts;
