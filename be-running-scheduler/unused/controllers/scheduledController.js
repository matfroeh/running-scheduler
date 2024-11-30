import { Scheduled } from "../models/subSchemas/index.js";
import { asyncHandler, ErrorResponse } from "../../utils/index.js";

// ToDo: all need to be adapted to tokenVerification

export const getAllScheduled = asyncHandler(async (req, res, next) => {
  const scheduled = await Scheduled.find();
  res.status(200).json(scheduled);
});

export const getScheduledById = asyncHandler(async (req, res, next) => {
  const { scheduledId } = req.params;
  const scheduled = await Scheduled.findOne({ _id: scheduledId });
  if (!scheduled)
    return next(
      new ErrorResponse(
        `Scheduled training not found with id of ${scheduledId}`,
        404
      )
    );
  res.status(200).json(scheduled);
});

export const createScheduled = asyncHandler(async (req, res, next) => {
  const scheduled = await Scheduled.create(req.body);
  if (!scheduled) {
    return next(new ErrorResponse("Error creating Scheduled training", 400));
  }
  res.status(201).json(scheduled);
});
