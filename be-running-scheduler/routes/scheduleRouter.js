import { Router } from "express";
import {
  getAllTrainingSchedules,
  createTrainingSchedule,
  getTrainingScheduleById,
  updateTrainingSchedule,
  deleteTrainingSchedule,
} from "../controllers/scheduleController.js";

const scheduleRouter = Router();

scheduleRouter
  .route("/")
  .get(getAllTrainingSchedules)
  .post(createTrainingSchedule);
scheduleRouter
  .route("/:calendarId/:week/:day/:trainingId")
  .get(getTrainingScheduleById);
scheduleRouter
  .route("/:calendarId")
  .put(updateTrainingSchedule)
  .delete(deleteTrainingSchedule);

export default scheduleRouter;
