import { Router } from "express";
import {
  getAllRunningLogs,
  createRunningLog,
  getRunningLogById,
  updateRunningLog,
  deleteRunningLog,
  // findInComments,
} from "../controllers/runsController.js";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";

const runsRouter = Router();

runsRouter
  .route("/")
  .get(verifyTokenMiddleware, getAllRunningLogs)
  .post(verifyTokenMiddleware, createRunningLog);
runsRouter
  .route("/:calendarId/:week/:day/:runId")
  .get(verifyTokenMiddleware, getRunningLogById);
runsRouter
  .route("/:calendarId")
  .put(verifyTokenMiddleware, updateRunningLog)
  .delete(verifyTokenMiddleware, deleteRunningLog);
  // .get(findInComments);

export default runsRouter;
