import { productController } from "../config/dependencies";
import { authMiddleware } from "../utils/authMiddleware";
import { NextFunction, Request, Response, Router } from "express";

const routesProducts = Router();

routesProducts.post(
	"/",
	authMiddleware,
	(request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(productController.create(request, response)).catch((e) => next(e));
	},
);

routesProducts.patch(
	"/:id",
	authMiddleware,
	(request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(productController.update(request, response)).catch((e) => next(e));
	},
);

routesProducts.delete(
	"/:id",
	authMiddleware,
	(request: Request, response: Response, next: NextFunction) => {
		console.log(request.params);
		Promise.resolve(productController.delete(request, response)).catch((e) => next(e));
	},
);

export default routesProducts;
