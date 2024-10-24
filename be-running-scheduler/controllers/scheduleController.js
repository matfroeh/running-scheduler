import Schedule from "../models/Schedule.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllTrainingSchedules = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const schedules = await Schedule.find( { user: userId });
  res.status(200).json(schedules);
});

export const createTrainingSchedule = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const schedule = await Schedule.create({ ...req.body, user: userId });
  res.status(201).json(schedule);
});

export const getTrainingScheduleById = asyncHandler(async (req, res, next) => {
  const { week, day, calendarId } = req.params;
  const userId = req.userId; 

  const findSchedule = await Schedule.findOne({$and: [{ _id: calendarId }, { user: userId }]});

  if (!findSchedule)
    return next(
      new ErrorResponse(
        `Training Schedule not found with id of ${calendarId}`,
        404
      )
    );
  const schedule = findSchedule.get(`weeks.${week}.days.${day}`);

  res.status(200).json(schedule);
});

export const updateTrainingSchedule = asyncHandler(async (req, res, next) => {
  const { calendarId } = req.params;
  const { meta, weeks } = req.body;
  const userId = req.userId;

  const findCalendar = await Schedule.findOne({$and: [{ _id: calendarId }, { user: userId }]});
  if (!findCalendar)
    return next(
      new ErrorResponse(
        `Training Schedule not found with id of ${calendarId}`,
        404
      )
    );
    
  const result = await Schedule.updateOne(
    { _id: calendarId }, // Match the document by its _id
    // update the whole document
    { $set: { meta, weeks } } 
  );
  res.status(201).json(result);
});

export const deleteTrainingSchedule = asyncHandler(async (req, res, next) => {
  const { calendarId } = req.params;
  const userId = req.userId;

  const findCalendar = await Schedule.findOne({$and: [{ _id: calendarId }, { user: userId }]});
  if (!findCalendar)
    return next(
      new ErrorResponse(
        `Training Schedule not found with id of ${calendarId}`,
        404
      )
    );
  await Schedule.deleteOne({$and: [{ _id: calendarId }, { user: userId }]});
  res.status(200).json({ success: true });
});