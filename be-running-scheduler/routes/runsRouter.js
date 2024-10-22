import { Router } from "express";
import {
  getAllRunningLogs,
  createRunningLog,
  getRunningLogById,
  updateRunningLog,
  deleteRunningLog,
} from "../controllers/runsController.js";

const runsRouter = Router();

runsRouter.route("/").get(getAllRunningLogs).post(createRunningLog);
runsRouter.route("/:calendarId/:week/:day/:runId").get(getRunningLogById);
runsRouter.route("/:calendarId").put(updateRunningLog).delete(deleteRunningLog);

export default runsRouter;
