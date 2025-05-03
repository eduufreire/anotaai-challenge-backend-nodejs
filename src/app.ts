import express from "express";
import routesCategory from "./routes/categories";

const app = express();

app.use(express.json());

app.use("/categories", routesCategory)

export default app;
