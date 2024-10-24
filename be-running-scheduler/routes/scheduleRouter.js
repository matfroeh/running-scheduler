import { Router } from "express";
import {
  getAllTrainingSchedules,
  createTrainingSchedule,
  getTrainingScheduleById,
  updateTrainingSchedule,
  deleteTrainingSchedule,
} from "../controllers/scheduleController.js";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";


const scheduleRouter = Router();

scheduleRouter
  .route("/")
  .get(verifyTokenMiddleware, getAllTrainingSchedules)
  .post(verifyTokenMiddleware, createTrainingSchedule);
scheduleRouter
  .route("/:calendarId/:week/:day/:trainingId")
  .get(verifyTokenMiddleware, getTrainingScheduleById);
scheduleRouter
  .route("/:calendarId")
  .put(verifyTokenMiddleware, updateTrainingSchedule)
  .delete(verifyTokenMiddleware, deleteTrainingSchedule);

export default scheduleRouter;
