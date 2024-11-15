import { Router } from "express";
import {
  createScheduled,
  getAllScheduled,
  getScheduledById,
} from "../controllers/scheduledController.js";

const scheduledRouter = Router();

scheduledRouter.route("/").get(getAllScheduled);
scheduledRouter.route("/:scheduledId").get(getScheduledById);
scheduledRouter.route("/create").post(createScheduled);

export default scheduledRouter;
