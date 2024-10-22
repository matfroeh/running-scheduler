import Runs from "../models/Runs.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createRun = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const run = await Runs.create(req.body);
  res.status(201).json(run);
});

export const getRunByParams = asyncHandler(async (req, res, next) => {
  const { week, day, runId, calendarId } = req.params;
  console.log(req.params);
  
  // console.log(week, day, runId, calendarId);

  const conditions = [];
  let result = null;

  const findCalendar = await Runs.findOne(
    { _id: calendarId });
  console.log(findCalendar);

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

  if (!findCalendar)
    return next(new ErrorResponse(`Running Calendar not found with id of ${calendarId}`, 404));

  const run = findCalendar.get(`weeks.${week}.days.${day}`);

  res.status(200).json(run);
});

export const getAllRuns = asyncHandler(async (req, res, next) => {
  const runs = await Runs.find();
  res.status(200).json(runs);
});

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

// runOne.save(); // it works!

export async function updateDayDate(
  documentId,
  weekNumber,
  dayNumber,
  newDate
) {
  try {
    // Construct the path for the specific day (e.g., "weeks.week1.days.day1.date")
    const dayPath = `weeks.week${weekNumber}.days.day${dayNumber}.date`;

    // Update the specified day's date
    const result = await YourModel.updateOne(
      { _id: documentId }, // Match the document by its _id
      { $set: { [dayPath]: newDate } } // Set the new date value using dynamic path
    );

    if (result.modifiedCount > 0) {
      console.log("Day date updated successfully");
    } else {
      console.log("No matching document found or no changes made");
    }
  } catch (error) {
    console.error("Error updating day date:", error);
  }
}
