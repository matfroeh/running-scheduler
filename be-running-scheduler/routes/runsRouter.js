import { Router } from "express";
import { getAllRuns, createRun, getRunByParams, updateRunCalendar } from "../controllers/runsController.js";

const runsRouter = Router();

runsRouter.route("/").get(getAllRuns).post(createRun);
runsRouter.route("/:calendarId/:week/:day/:runId").get(getRunByParams);
runsRouter.route("/:calendarId").put(updateRunCalendar);

export default runsRouter;