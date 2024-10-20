import Runs from "../models/Runs.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createRun = asyncHandler(async (req, res, next) => {
  console.log(req.body);
    const run = await Runs.create(req.body);
  res.status(201).json(run);
});

export const getAllRuns = asyncHandler(async (req, res, next) => {
    const runs = await Runs.find();
    res.status(200).json(runs);
    }
);