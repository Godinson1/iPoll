import { Express } from "express";
import fileUpload from "express-fileupload";
import { router as PollRouter } from "../Polls/routes";

const defineRoutes = (app: Express) => {
  app.use("/polls", PollRouter);

  //Uploading file Configurations
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );
};

export default defineRoutes;
