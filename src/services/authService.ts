import jwt, { TokenExpiredError } from "jsonwebtoken";
import "dotenv/config";
import { InvalidTokenError } from "@/utils/exceptions/customException";
import { logger } from "@/config/logger";

export class AuthService {
	private constructor() {}
	static generateToken(ownerId: string) {
		const secret = process.env.SECRET_KEY_TOKENS as string;
		try {
			const result = jwt.sign({ ownerId: ownerId }, secret, {
				expiresIn: "10m",
			});
			return result;
		} catch (error) {
			throw new Error("Could not generate token");
		}
	}

	static validToken(token: string) {
		const secret = process.env.SECRET_KEY_TOKENS as string;

		try {
			const result = jwt.verify(token, secret);
			return result;
		} catch (error) {
			const e = error as Error;
			logger.error({
				label: "AuthService",
				message: e.message,
			});
			throw new InvalidTokenError("Invalid token");
		}
	}
}
