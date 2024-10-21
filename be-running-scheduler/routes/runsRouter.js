import { Router } from "express";
import { getAllRuns, createRun, getRunByParams } from "../controllers/runsController.js";

const runsRouter = Router();

runsRouter.route("/").get(getAllRuns).post(createRun);
runsRouter.route("/:week/:day/:runId").get(getRunByParams);

export default runsRouter;