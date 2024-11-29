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
import demoProtectionMiddleware from "../middleware/demoProtectionMiddleware.js";

const scheduleRouter = Router();

// Apply verifyToken and demoProtection middlewares to all routes.
// Only GET requests are allowed for demo users.
scheduleRouter.use([verifyTokenMiddleware, demoProtectionMiddleware]);

scheduleRouter
  .route("/")
  .get(getAllTrainingSchedules)
  .post(validateJOI(scheduleSchema), createTrainingSchedule);
scheduleRouter.route("/meta").get(getAllTrainingSchedulesMetaData);
scheduleRouter
  .route("/:calendarId")
  .get(getTrainingScheduleById)
  .put(validateJOI(scheduleSchema), updateTrainingSchedule)
  .delete(deleteTrainingSchedule);

export default scheduleRouter;

// scheduleRouter
//   .route("/:calendarId/:week/:day/:trainingId")
//   .get(verifyTokenMiddleware, getTrainingScheduleById);
