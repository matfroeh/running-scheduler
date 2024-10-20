import Schedule from "../models/Schedule.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createSchedule = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  
    const schedule = await Schedule.create(req.body);
  res.status(201).json(schedule);
});

export const getAllSchedules = asyncHandler(async (req, res, next) => {
    const schedules = await Schedule.find();
    // const schedules = await Schedule.find({ "weeks": { $exists: true } });
    // const schedules = await Schedule.findOne({ _id: "6713ddbc87a72ae4f970f46b" })

    res.status(200).json(schedules);
    }
);