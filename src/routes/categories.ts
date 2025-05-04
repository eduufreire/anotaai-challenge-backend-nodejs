import { NextFunction, Request, Response, Router } from "express";
import container from "@/config/dependencyContainer";

const routesCategory = Router();
const controller: any = container.get("CategoryController");

routesCategory.post("/", (request: Request, response: Response, next: NextFunction) => {
	Promise.resolve(controller.post(request, response)).catch(e => next(e))
});

routesCategory.patch("/:id", (request: Request, response: Response, next: NextFunction) => {
	Promise.resolve(controller.update(request, response)).catch(e => next(e))
});

routesCategory.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
	Promise.resolve(controller.delete(request, response)).catch(e => next(e))
});

export default routesCategory;
