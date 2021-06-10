import { Express } from "express";

import { router as PollRouter } from "../Polls/routes";
import { router as ContactRouter } from "../Contact/routes";

const defineRoutes = (app: Express) => {
  app.use("/polls", PollRouter);
  app.use("/contacts", ContactRouter);
};

export default defineRoutes;
