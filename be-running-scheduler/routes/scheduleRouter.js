import { Router } from "express";
import { getAllSchedules, createSchedule } from "../controllers/scheduleController.js";
const scheduleRouter = Router();

scheduleRouter.route("/").get(getAllSchedules).post(createSchedule);
// scheduleRouter.route("/:id").get().put().delete();

export default scheduleRouter;