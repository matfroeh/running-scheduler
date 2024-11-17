import { Router } from "express";

const performedRouter = Router();

performedRouter.route("/").get();
performedRouter.route("/create").post();

export default performedRouter;