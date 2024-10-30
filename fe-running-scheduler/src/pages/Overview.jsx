import { useLoaderData } from "react-router-dom";
import { getOverviewData } from "../data/getOverviewData";
import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "../data/processRunningDataHelper.js";
import dayjs from "dayjs";
const Overview = () => {
  // Arrays of the schedule and the running part of the training blocks
  const { loadedRuns } = useLoaderData();

  const overviewData = getOverviewData(loadedRuns);
  console.log(overviewData);

  const getTotalDistance = (block) => {
    let totalDistance = 0;
    block.weeks.map((week) => {
      totalDistance += week.totalDistanceRun;
    });
    return parseFloat(totalDistance).toFixed(0);
  };

  const getAverageHeartBeat = (block) => {
    let totalHeartBeat = 0;
    let numberOfWeeksWithData = 0;
    block.weeks.map((week) => {
      if (week.avg_hr !== 0 && !isNaN(week.avg_hr)) {
        numberOfWeeksWithData += 1;
        totalHeartBeat += week.avg_hr;
      }
    });
    // console.log(totalHeartBeat, numberOfWeeksWithData);
    return numberOfWeeksWithData !== 0
      ? parseFloat(totalHeartBeat / numberOfWeeksWithData).toFixed(0)
      : "No data";
  };

  const getAveragePace = (block) => {
    let totalPace = 0;
    let numberOfWeeksWithData = 0;
    block.weeks.map((week) => {
      if (week.avgPace !== 0 && !isNaN(week.avgPace)) {
        // console.log(week.avgPace);
        numberOfWeeksWithData += 1;
        totalPace += parseFloat(week.avgPace);
      }
      // console.log(totalPace, numberOfWeeksWithData);
    });
    return numberOfWeeksWithData !== 0
      ? getTempoAsMinutesSecondsString(totalPace / numberOfWeeksWithData)
      : "No data";
  };

  const getAverageEffort = (block) => {
    let totalEffort = 0;
    let numberOfWeeksWithData = 0;
    block.weeks.map((week) => {
      if (week.avgEffort !== 0 && !isNaN(week.avgEffort)) {
        numberOfWeeksWithData += 1;
        totalEffort += week.avgEffort;
      }
    });
    return numberOfWeeksWithData !== 0
      ? parseFloat(totalEffort / numberOfWeeksWithData).toFixed(1)
      : "No data";
  };

  const getTotalTime = (block) => {
    let totalTime = 0;
    block.weeks.map((week) => {
      totalTime += parseFloat(week.totalTime);
    });
    console.log(totalTime);

    return getSecondsAsHoursMinutesSecondsString(totalTime);
  };

  const getWeeksXAxis = (block) => {
    const xAxis = [];
    let weekNumber = 1;
    block.weeks.map(() => {
      xAxis.push(weekNumber);
      weekNumber += 1;
    });
    // console.log(xAxis);

    return xAxis;
  };

  const getWeeklyDistance = (block) => {
    const weeklyDistance = [];
    block.weeks.map((week) => {
      weeklyDistance.push(week.totalDistanceRun);
    });
    // console.log(weeklyDistance);
    return weeklyDistance;
  };

  getWeeksXAxis(overviewData[2]);
  getWeeklyDistance(overviewData[2]);

  return (
    <div className="container mx-auto">
      <div className="navbar flex gap-2 justify-center">
        <button className="btn btn-sm">Select All</button>
        <button className="btn btn-sm">Select Individually</button>
      </div>
      <div className="grid grid-cols-2 mx-4 mb-8">
        <div className="flex flex-col gap-8 mt-8">
          {overviewData.map((block) => (
            <div
              key={block.title}
              className="card card-compact w-auto bg-primary text-primary-content cursor-pointer"
            >
              <div className="card-body">
                <h2 className="card-title">{block.title}</h2>
                <div className="stats shadow">
                  <div className="grid grid-cols-3 ">
                    <div className="stat place-items-center">
                      <div className="stat-title">Total distance</div>
                      <div className="stat-value">
                        {getTotalDistance(block)} km
                      </div>
                      <div className="stat-desc">
                        From {dayjs(block.startDate).format("DD. MMM")} to{" "}
                        {dayjs(block.endDate).format("DD. MMM YYYY")}
                      </div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Weekly distance</div>
                      <div className="stat-value">
                        {(getTotalDistance(block) / block.weeks.length).toFixed(
                          0
                        )}
                      </div>
                      <div className="stat-desc">
                        {" "}
                        km in {block.weeks.length} Weeks
                      </div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Total Time</div>
                      <div className="stat-value">{getTotalTime(block)}</div>
                      <div className="stat-desc">hh:mm:ss</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Average Pace</div>
                      <div className="stat-value">{getAveragePace(block)}</div>
                      <div className="stat-desc">minutes per km</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Average Heart Beat</div>
                      <div className="stat-value">
                        {getAverageHeartBeat(block)}
                      </div>
                      <div className="stat-desc">Beats per minute</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Average Effort</div>
                      <div className="stat-value">
                        {getAverageEffort(block)}
                      </div>
                      <div className="stat-desc">/ 10</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>Graphics</div>
      </div>
    </div>
  );
};

export default Overview;
