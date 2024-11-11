import { Router } from "express";
import {
  getAllTrainingSchedules,
  createTrainingSchedule,
  getTrainingScheduleById,
  updateTrainingSchedule,
  deleteTrainingSchedule,
} from "../controllers/scheduleController.js";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";
import validateJOI from "../middleware/validateJOI.js";
import scheduleSchema from "../joi/schedulesSchema.js";


const scheduleRouter = Router();

scheduleRouter
  .route("/")
  .get(verifyTokenMiddleware, getAllTrainingSchedules)
  .post(validateJOI(scheduleSchema), verifyTokenMiddleware, createTrainingSchedule);
scheduleRouter
  .route("/:calendarId/:week/:day/:trainingId")
  .get(verifyTokenMiddleware, getTrainingScheduleById);
scheduleRouter
  .route("/:calendarId")
  .put(validateJOI(scheduleSchema), verifyTokenMiddleware, updateTrainingSchedule)
  .delete(verifyTokenMiddleware, deleteTrainingSchedule);

export default scheduleRouter;
