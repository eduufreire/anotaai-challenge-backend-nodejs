import "reflect-metadata";
import express from "express";
import routesCategory from "@/routes/categories";
import routesProducts from "@/routes/products";
import { errorHandler } from "@/utils/exceptions/errorHandler";

const app = express();

app.use(express.json());

app.use("/categories", routesCategory);
app.use("/products", routesProducts);

app.use(errorHandler);

export default app;
