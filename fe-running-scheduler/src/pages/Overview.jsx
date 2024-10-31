import { useLoaderData, Outlet } from "react-router-dom";
import {
  getOverviewData,
  getTotalDistance,
  getAverageHeartBeat,
  getAveragePace,
  getAverageEffort,
  getTotalTime,
  getAllWeeksXAxis,
} from "../data/getOverviewData.js";
import dayjs from "dayjs";
import { useState } from "react";
import LineChartDistanceTime from "../components/charts/LineChartDistanceTime.jsx";
import LineChartPaceHeartRate from "../components/charts/LineChartPaceHeartRate.jsx";
import LineChartAllWeeksDistanceTime from "../components/charts/LineChartAllWeeksDistanceTime.jsx";
import LineChartAllWeeksPaceHeartRate from "../components/charts/LineChartAllWeeksPaceHeartRate.jsx";

const Overview = () => {
  // Arrays of the schedule and the running part of the training blocks
  const { loadedRuns } = useLoaderData();
  const overviewData = getOverviewData(loadedRuns);
  const [selectedBlock, setSelectedBlock] = useState(
    overviewData ? overviewData[0] : null
  );
  const modes = ["one", "all"];
  const [selectedMode, setSelectedMode] = useState(modes[0]);

  console.log(overviewData);
  console.log(selectedMode);
  console.log(modes[0]);
  
  console.log(getAllWeeksXAxis(overviewData));
  

  const handleSelectMode = () => {
    setSelectedMode(selectedMode === "one" ? "all" : "one");
  };

  const selectBlock = (block) => {
    setSelectedBlock(block);
  };

  return (
    <div className="">
      <div className="navbar flex gap-2 justify-center">
        <button className={selectedMode === "one" ? "btn-accent " + "btn btn-sm" : "btn btn-sm"} onClick={handleSelectMode} >Select One</button>
        <button className={selectedMode === "all" ? "btn-primary " + "btn btn-sm" : "btn btn-sm"} onClick={handleSelectMode} >Select All</button>
      </div>
      <div className="grid grid-cols-2 gap-x-8 mb-8 w-full">
        <div className="flex flex-col gap-8 mt-8">
          {overviewData.map((block) => (
            <div
              key={block.title}
              className={
                selectedBlock.title === block.title && selectedMode === "one"
                  ? "bg-accent card card-compact text-primary-content cursor-pointer"
                  : "bg-primary card card-compact text-primary-content cursor-pointer"
              }
              onClick={selectedMode == "one" ? () => selectBlock(block) : null}
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
                        )}{" "}
                        km
                      </div>
                      <div className="stat-desc">
                        {" "}
                        in {block.weeks.length} Weeks
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
          {overviewData && selectedMode === "one" && <LineChartDistanceTime block={selectedBlock} />}
          {overviewData && selectedMode === "one" && <LineChartPaceHeartRate block={selectedBlock} />}
          {overviewData && selectedMode === "all" && <LineChartAllWeeksDistanceTime overviewData={overviewData} />}
          {overviewData && selectedMode === "all" && <LineChartAllWeeksPaceHeartRate overviewData={overviewData} />}
        </div>
      </div>
      <Outlet />
    </div>

  );
};

export default Overview;
