import { categoryController } from "@/config/dependencies";
import { authMiddleware } from "@/utils/authMiddleware";
import { NextFunction, Request, Response, Router } from "express";

const routesCategory = Router();

routesCategory.post(
	"/",
	authMiddleware,
	(request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(categoryController.post(request, response)).catch((e) => next(e));
	},
);

routesCategory.patch(
	"/:id",
	authMiddleware,
	(request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(categoryController.update(request, response)).catch((e) => next(e));
	},
);

routesCategory.delete(
	"/:id",
	authMiddleware,
	(request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(categoryController.delete(request, response)).catch((e) => next(e));
	},
);

export default routesCategory;
