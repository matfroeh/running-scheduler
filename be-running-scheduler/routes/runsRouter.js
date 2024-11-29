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
import demoProtectionMiddleware from "../middleware/demoProtectionMiddleware.js";


const runsRouter = Router();

// Apply verifyToken and demoProtection middlewares to all routes.
// Only GET requests are allowed for demo users.
runsRouter.use([verifyTokenMiddleware, demoProtectionMiddleware]);

runsRouter
  .route("/")
  .get(getAllRunningLogs)
  .post(validateJOI(runsSchema), createRunningLog);
runsRouter
  .route("/:calendarId")
  .get(getRunningLogById)
  .put(validateJOI(runsSchema), updateRunningLog)
  .delete(deleteRunningLog);
// .get(findInComments);

export default runsRouter;
