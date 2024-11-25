import { Router } from "express";
import {
  getAllTrainingSchedules,
  createTrainingSchedule,
  updateTrainingSchedule,
  deleteTrainingSchedule,
  getAllTrainingSchedulesMetaData,
  getTrainingScheduleById,
} from "../controllers/scheduleController.js";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";
import validateJOI from "../middleware/validateJOI.js";
import scheduleSchema from "../joi/schedulesSchema.js";

const scheduleRouter = Router();

scheduleRouter
  .route("/")
  .get(verifyTokenMiddleware, getAllTrainingSchedules)
  .post(
    validateJOI(scheduleSchema),
    verifyTokenMiddleware,
    createTrainingSchedule
  );
scheduleRouter
  .route("/meta")
  .get(verifyTokenMiddleware, getAllTrainingSchedulesMetaData);
scheduleRouter
  .route("/:calendarId")
  .get(verifyTokenMiddleware, getTrainingScheduleById)
  .put(
    validateJOI(scheduleSchema),
    verifyTokenMiddleware,
    updateTrainingSchedule
  )
  .delete(verifyTokenMiddleware, deleteTrainingSchedule);

export default scheduleRouter;

// scheduleRouter
//   .route("/:calendarId/:week/:day/:trainingId")
//   .get(verifyTokenMiddleware, getTrainingScheduleById);
