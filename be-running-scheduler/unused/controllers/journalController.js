import { Journal } from "../models/index.js";
import { asyncHandler, ErrorResponse } from "../utils/index.js";

export const getAllJournals = asyncHandler(async (req, res, next) => {
  const journals = await Journal.find().populate({
    path: "weeks.days.scheduled", // it works as expected
  });
  res.status(200).json(journals);
});

export const getJournalById = asyncHandler(async (req, res, next) => {
  const { journalId } = req.params;
  const journal = await Journal.findOne({ _id: journalId });
  if (!journal)
    return next(
      new ErrorResponse(`Journal not found with id of ${journalId}`, 404)
    );
  res.status(200).json(journal);
});

export const getJournalByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const journal = await Journal.findOne({ user: userId });
  if (!journal)
    return next(
      new ErrorResponse(`Journal not found with owner of ${userId}`, 404)
    );
  res.status(200).json(journal);
});

export const createJournal = asyncHandler(async (req, res, next) => {
  const journal = await Journal.create(req.body);
  if (!journal) {
    return next(new ErrorResponse("Error creating Journal", 400));
  }
  res.status(201).json(journal);
});

export const addScheduledEntryToJournal = asyncHandler(
  async (req, res, next) => {
    const { journalId, date, scheduledId } = req.params;
    console.log(journalId, date, scheduledId);

    const result = await Journal.findOneAndUpdate(
      {
        _id: journalId, // Match the journal by id
        // user: userId, // Match the journal by user
        "weeks.days.date": date, // Find the day with the exact date
      },
      {
        $push: { "weeks.$[].days.$[day].scheduled": scheduledId }, // Push the new scheduled entry
      },
      {
        arrayFilters: [
          { "day.date": date }, // Filter to find the correct day
        ],
        new: true, // Return the updated document
      }
    );

    if (!result)
      return next(
        new ErrorResponse(
          `Error adding scheduled entry to journal with id of ${journalId}`,
          404
        )
      );

    res.status(200).json(result);
  }
);
