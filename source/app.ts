import express from "express";
import path from "path";
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

app.use(express.static(path.join(__dirname, "../client/build")));

console.log(path.join(__dirname, "../client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Error handler
handleRouteError(app);

export default app;
