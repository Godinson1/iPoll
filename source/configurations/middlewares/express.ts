import { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const defineExpressMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(helmet());
  app.use(compression());
};

export default defineExpressMiddlewares;
