import { AuthService } from "@/services/authService";
import { InvalidCredentialsError } from "@/utils/exceptions/customException";
import { NextFunction, Request, Response, Router } from "express";

const authRoute: Router = Router();

const users = [
	{ id: "e6315401-b7d4-49e0-9220-87cf316ecbfb", email: "user1@gmail", pass: "123" },
	{ id: "313bf110-7bc8-490f-8cc4-e1722e193f60", email: "user2@gmail", pass: "456" },
	{ id: "a7dc083e-b0ed-42ed-87aa-754ce0a23f10", email: "user3@gmail", pass: "789" },
];
authRoute.post("/", (request: Request, response: Response, next: NextFunction): any => {
	try {
		const { email, password } = request.body;

		for (const user of users) {
			if (email === user.email && password === user.pass) {
				const token = AuthService.generateToken(user.id);
				return response.status(200).json({
					token,
					type: "bearer",
				});
			}
		}
		throw new InvalidCredentialsError("Credentials not valid")
	} catch (error) {
		next(error);
	}
});

export default authRoute;
