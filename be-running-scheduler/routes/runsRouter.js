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
import runsSchema from "../joi/runsSchema.js";
import validateJOI from "../middleware/validateJOI.js";

const runsRouter = Router();

runsRouter
  .route("/")
  .get(verifyTokenMiddleware, getAllRunningLogs)
  .post(validateJOI(runsSchema), verifyTokenMiddleware, createRunningLog);
runsRouter
  .route("/:calendarId")
  .get(verifyTokenMiddleware, getRunningLogById)
  .put(validateJOI(runsSchema), verifyTokenMiddleware, updateRunningLog)
  .delete(verifyTokenMiddleware, deleteRunningLog);
// .get(findInComments);

export default runsRouter;
