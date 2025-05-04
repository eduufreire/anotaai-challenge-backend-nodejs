import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import routesCategory from "@/routes/categories";
import { errorHandler } from "./utils/exceptions/errorHandler";

const app = express();

app.use(express.json());

app.use("/categories", routesCategory);

app.use(errorHandler);

export default app;
