import { useLoaderData } from "react-router-dom";
import {
  getOverviewData,
  getTotalDistance,
  getAverageHeartBeat,
  getAveragePace,
  getAverageEffort,
  getTotalTime,
  getWeeksXAxis,
  getWeeklyDistance,
  getWeeklyTime,
} from "../data/getOverviewData.js";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useState } from "react";

const Overview = () => {
  // Arrays of the schedule and the running part of the training blocks
  const { loadedRuns } = useLoaderData();
  const overviewData = getOverviewData(loadedRuns);
  const [selectedBlock, setSelectedBlock] = useState(
    overviewData ? overviewData[0] : null
  );
  const modes = ["individual", "all"];
  const [selectedMode, setSelectedMode] = useState(modes[0]);


  // console.log(selectedBlock);

  const getIndividualChart = (block) => {
    const data = {
      labels: getWeeksXAxis(block),
      datasets: [
        {
          label: "Weekly Distance (km)",
          data: getWeeklyDistance(block),
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          yAxisID: "y1",
        },
        {
          label: "Weekly Time (minutes)",
          data: getWeeklyTime(block),
          fill: false,
          borderColor: "#742774",
          yAxisID: "y2",
        },
      ],
    };
    const options = {
      scales: {
        y1: {
          min: Math.round(Math.min.apply(null, getWeeklyDistance(block))),
          max: Math.round(Math.max.apply(null, getWeeklyDistance(block)) * 1.5),
          stepSize: 10,
          ticks: {
            beginAtZero: true,
          },
        },
        y2: {
          min: Math.round(Math.min.apply(null, getWeeklyTime(block))),
          max: Math.round(Math.max.apply(null, getWeeklyTime(block)) * 2),
          stepSize: 30,
          position: "right",
          ticks: {
            beginAtZero: true,
          },
        },
        x: {},
      },
    };
    return (
      <div className="w-full">
        <Line id={block.title} data={data} options={options} />{" "}
      </div>
    );
  };

  const selectBlock = (block) => {
    setSelectedBlock(block);
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
              className={
                selectedBlock.title === block.title
                  ? "bg-accent card card-compact text-primary-content cursor-pointer"
                  : "bg-primary card card-compact text-primary-content cursor-pointer"
              }
              onClick={() => selectBlock(block)}
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
          {overviewData && getIndividualChart(selectedBlock)}
        </div>
      </div>
    </div>
  );
};

export default Overview;
