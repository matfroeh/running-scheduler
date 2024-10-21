import Runs from "../models/Runs.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createRun = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const run = await Runs.create(req.body);
  res.status(201).json(run);
});

export const getRunByParams = asyncHandler(async (req, res, next) => {
  const { week, day, runId } = req.params;
  console.log(week, day, runId);

  const conditions = [];

  for (let weekNum = 1; weekNum <= 4; weekNum++) {
    for (let dayNum = 0; dayNum <= 6; dayNum++) {
      const weekKey = `weeks.${week}.days.${day}._id`;
      conditions.push({ [weekKey]: runId });
    }
    const result  = await Runs.findOne({
      $or: conditions,
    });
    
    if (!result)
      return next(new ErrorResponse(`Run not found with id of ${runId}`, 404));
    console.log(result);
    console.log(result.get(`weeks.${week}.days.${day}`));

    const run = result.get(`weeks.${week}.days.${day}`);
    res.status(200).json(run);
  }
});

export const getAllRuns = asyncHandler(async (req, res, next) => {
  // const testQuery =  await Runs.weeks._id("6715807edd29f3a9ae9136f2");
  // console.log(testQuery);

  const runs = await Runs.find();

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

  res.status(200).json(runs);
});
