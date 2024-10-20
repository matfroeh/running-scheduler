import { Router } from "express";
import { getAllRuns, createRun } from "../controllers/runsController.js";

const runsRouter = Router();

runsRouter.route("/").get(getAllRuns).post(createRun);

export default runsRouter;