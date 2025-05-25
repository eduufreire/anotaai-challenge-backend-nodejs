import { AuthService } from "../services/authService";
import { NextFunction, Request, Response } from "express";
import { InvalidTokenError } from "./exceptions/customException";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

export const authMiddleware = (request: Request, response: Response, next: NextFunction): any => {
	const token = request.headers.authorization?.split(" ")[1];

	if (!token) {
		throw new InvalidTokenError("Invalid token");
	}

	const decoded = AuthService.validToken(token);
	if (decoded) {
		const { ownerId } = decoded as JwtPayload;
		request.body.ownerId = ownerId
		next();
	}
};
