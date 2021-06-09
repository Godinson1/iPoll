import express from "express";
import {
  defineRoutes,
  defineExpressMiddlewares,
  handleRouteError,
} from "./configurations";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//Define middlewares
app.use(express.json());
defineExpressMiddlewares(app);

//Define Routes and file configuration
defineRoutes(app);

// Error handler
handleRouteError(app);

export default app;
