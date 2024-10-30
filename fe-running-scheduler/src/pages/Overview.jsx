import { useLoaderData } from "react-router-dom";
import { getOverviewData } from "../data/getOverviewData";
import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "../data/processRunningDataHelper.js";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Overview = () => {
  // Arrays of the schedule and the running part of the training blocks
  const { loadedRuns } = useLoaderData();

  const overviewData = getOverviewData(loadedRuns);
  // console.log(overviewData);

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
      : "--";
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
      : "--";
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
      : "--";
  };

  const getTotalTime = (block) => {
    let totalTime = 0;
    block.weeks.map((week) => {
      totalTime += parseFloat(week.totalTime);
    });
    // console.log(totalTime);

    return getSecondsAsHoursMinutesSecondsString(totalTime);
  };

  const getWeeksXAxis = (block) => {
    const xAxis = [];
    let weekNumber = 1;
    block.weeks.map(() => {
      xAxis.push(weekNumber);
      weekNumber += 1;
    });
    console.log(xAxis);

    return xAxis;
  };

  const getWeeklyDistance = (block) => {
    const weeklyDistance = [];
    block.weeks.map((week) => {
      weeklyDistance.push(week.totalDistanceRun);
    });
    console.log(weeklyDistance);
    return weeklyDistance;
  };

  const getWeeklyTime = (block) => {
    const weeklyTime = [];
    block.weeks.map((week) => {
      weeklyTime.push(parseFloat(week.totalTime) / 60);
    });
    return weeklyTime;
  };

  const getIndividualChart = (block) => {
    const data = {
      labels: getWeeksXAxis(block),
      datasets: [
        {
          label: "Weekly Distance",
          data: getWeeklyDistance(block),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
        // {
        //   label: "Weekly Time",
        //   data: getWeeklyTime(overviewData[2]),
        //   fill: false,
        //   borderColor: "#742774"
        // }
      ],
    };
    return <div className="w-full"><Line id={block.title} data={data} /> </div>;
  };

  return (
    <div className="">
      <div className="navbar flex gap-2 justify-center">
        <button className="btn btn-sm">Select All</button>
        <button className="btn btn-sm">Select Individually</button>
      </div>
      <div className="grid grid-cols-2 gap-x-8 mb-8 w-full">
        <div className="flex flex-col gap-8 mt-8">
          {overviewData.map((block) => (
            <div
              key={block.title}
              className="card card-compact bg-primary text-primary-content cursor-pointer"
            >
              <div className="card-body">
                <h2 className="card-title">{block.title}</h2>
                <div className="stats shadow">
                  <div className="grid grid-cols-3 ">
                    <div className="stat place-items-center">
                      <div className="stat-title">Total distance</div>
                      <div className="stat-value text-2xl">
                        {getTotalDistance(block)} km
                      </div>
                      <div className="stat-desc">
                        {dayjs(block.startDate).format("DD. MMM")} to{" "}
                        {dayjs(block.endDate).format("DD. MMM YYYY")}
                      </div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Weekly distance</div>
                      <div className="stat-value text-2xl">
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
                      <div className="stat-value text-2xl">
                        {getTotalTime(block)}
                      </div>
                      <div className="stat-desc">hh:mm:ss</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Average Pace</div>
                      <div className="stat-value text-2xl">
                        {getAveragePace(block)}
                      </div>
                      <div className="stat-desc">minutes per km</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Average Heart Beat</div>
                      <div className="stat-value text-2xl">
                        {getAverageHeartBeat(block)}
                      </div>
                      <div className="stat-desc">Beats per minute</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Average Effort</div>
                      <div className="stat-value text-2xl">
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

        <div className="flex flex-col gap-8 mt-8 justify-center items-center w-full">
          {getIndividualChart(overviewData[2])}
        </div>
      </div>
    </div>
  );
};

export default Overview;
