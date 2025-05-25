import { map, string, ZodFormattedError, ZodIssue } from "zod";

export interface CustomException {
	readonly statusCode: number;
	readonly name: string;
	readonly details: any;
}

export class ZodError extends Error {
	public readonly statusCode: number;
	public readonly name: string;
	public readonly details: any;
	constructor(message: string, errors: ZodIssue[]) {
		super(message);
		this.name = "ZodError";
		this.statusCode = 400;

		const mapErrors = errors.map((e) => ({
			field: e.path[e.path.length - 1],
			message: e.message,
		}));
		this.details = mapErrors;
	}
}

export class ConflictError extends Error {
	public readonly statusCode: number;
	public readonly name: string;
	public readonly details: any;
	constructor(message: string) {
		super(message);
		this.name = "ConflictError";
		this.statusCode = 409;
		this.details = [];
	}
}

export class NotFoundError extends Error {
	public readonly statusCode: number;
	public readonly name: string;
	public readonly details: any;
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
		this.statusCode = 404;
		this.details = [];
	}
}

export class DatabaseError extends Error {
	public readonly statusCode: number;
	public readonly name: string;
	public readonly details: any;
	constructor(message: string) {
		super(message);
		this.name = "DatabaseError";
		this.statusCode = 500;
		this.details = [];
	}
}

export class InvalidTokenError extends Error {
	public readonly statusCode: number;
	public readonly name: string;
	public readonly details: any;
	constructor(message: string) {
		super(message);
		this.name = "AuthenticationError";
		this.statusCode = 403;
		this.details = [];
	}
}

export class InvalidCredentialsError extends Error {
	public readonly statusCode: number;
	public readonly name: string;
	public readonly details: any;
	constructor(message: string) {
		super(message);
		this.name = "AuthenticationError";
		this.statusCode = 401;
		this.details = [];
	}
}
