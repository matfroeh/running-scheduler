import { Router } from "express";
import {
  createJournal,
  getAllJournals,
  getJournalById,
  addScheduledEntryToJournal,
} from "../controllers/journalController.js";

const journalRouter = Router();

journalRouter.route("/").get(getAllJournals);
journalRouter.route("/create").post(createJournal);
journalRouter.route("/:journalId").get(getJournalById);
journalRouter.route("/:journalId/scheduled/:date/:scheduledId").post(addScheduledEntryToJournal);

export default journalRouter;
