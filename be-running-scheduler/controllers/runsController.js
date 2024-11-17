import Runs from "../models/Runs.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllRunningLogs = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const runs = await Runs.find({ user: userId });
  res.status(200).json(runs);
});

export const createRunningLog = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const run = await Runs.create({ ...req.body, user: userId });
  res.status(201).json(run);
});

export const getRunningLogById = asyncHandler(async (req, res, next) => {
  const { week, day, calendarId } = req.params;
  const userId = req.userId;
  const findCalendar = await Runs.findOne({
    $and: [{ _id: calendarId }, { user: userId }],
  });

  if (!findCalendar)
    return next(
      new ErrorResponse(`Running Log not found with id of ${calendarId}`, 404)
    );
  const run = findCalendar.get(`weeks.${week}.days.${day}`);

  res.status(200).json(run);
});

export const updateRunningLog = asyncHandler(async (req, res, next) => {
  const { calendarId } = req.params;
  const { meta, weeks } = req.body;
  // console.log("meta:", meta);
  // console.log("weeks:", weeks);
  
  const userId = req.userId;

  const findCalendar = await Runs.findOne({
    $and: [{ _id: calendarId }, { user: userId }],
  });
  if (!findCalendar)
    return next(
      new ErrorResponse(`Running Log not found with id of ${calendarId}`, 404)
    );

  const result = await Runs.updateOne(
    { _id: calendarId },
    // update all
    { $set: { meta, weeks } }
  );
  res.status(201).json(result);
});

export const deleteRunningLog = asyncHandler(async (req, res, next) => {
  const { calendarId } = req.params;
  const userId = req.userId;

  const findCalendar = await Runs.findOne({
    $and: [{ _id: calendarId }, { user: userId }],
  });
  if (!findCalendar)
    return next(
      new ErrorResponse(`Running Log not found with id of ${calendarId}`, 404)
    );
  await Runs.deleteOne({ $and: [{ _id: calendarId }, { user: userId }] });
  res.status(200).json({ success: true });
});


// The output will be just the document in which the searchParam is found, so that is not very helpful
// export const findInComments = asyncHandler(async (req, res, next) => {
//   // const { calendarId } = req.params;
//   // const userId = req.userId;
//   const { searchParam } = req.body;
//   console.log("searchParam:", searchParam);
  

//   const find = await Runs.find({ $text: { $search: searchParam } });
//   if (!find) return next(new ErrorResponse("Search query not found", 404));
//   res.status(200).json(find);
// });

// const conditions = [];
// let result = null;
// for (let weekNum = 1; weekNum <= 4; weekNum++) {
//   for (let dayNum = 0; dayNum <= 6; dayNum++) {
//     const weekKey = `weeks.${week}.days.${day}._id`;
//     conditions.push({ [weekKey]: runId });
//   }
//   result = await Runs.findOne({
//     $or: conditions,
//   });
// }
// console.log(result);
// console.log(result.get(`weeks.${week}.days.${day}`));
// if (!result)
//   return next(new ErrorResponse(`Run not found with id of ${runId}`, 404));

//   const runOne = await Runs.findOne({
//     "weeks.week2._id": "6715807edd29f3a9ae91371c",
//   });

//   // console.log("RUN ONE:", runOne);

//   console.log("result get:", runOne.get("weeks").get("week2").get("days").get("day0"));
//   runOne.get("weeks").get("week2").get("days").get("day0").set("date", "2024-08-18");
//   runOne.get("weeks").get("week2").get("days").get("day0").set("distance", "7");
//   runOne.get("weeks").get("week2").get("days").get("day0").set("name", "Easy Run");
//   runOne.get("weeks").get("week2").get("days").get("day0").set("tempo", "5");
//   runOne.get("weeks").get("week2").get("days").get("day0").set("duration", "45");

//   console.log("after set:", runOne.get("weeks").get("week2").get("days").get("day0"));
// // works
// // adding properties works too

// runOne.save(); // it works !
