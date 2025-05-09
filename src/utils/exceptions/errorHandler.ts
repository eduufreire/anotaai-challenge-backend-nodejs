import { NextFunction, Request, Response } from "express";
import { CustomException } from "./customException";
import { logger } from "@/config/logger";

export const errorHandler = (
	error: Error & CustomException,
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.message ?? "Internal Server Error";
	const details = error.details ?? [];
	logger.error({
		label: "ErrorHandler",
		message: {
			statusCode,
			name: error.name,
			message,
			details,
		},
	});
	response.status(statusCode).json({
		statusCode,
		name: error.name,
		message,
		details,
	});
};
