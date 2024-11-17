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
  getWeeklyPace,
  getWeeklyHeartRate,
  getAllWeeksXAxis,
  getAllWeeklyDistance,
  getAllWeeklyTime,
  getAllWeeklyPace,
  getAllWeeklyHeartRate,
} from "../utils/getOverviewData.js";
import dayjs from "dayjs";
import { useState } from "react";
import LineChart from "../components/charts/LineChart";

const Overview = () => {
  // Arrays of the schedule and the running part of the training blocks
  const { loadedRuns } = useLoaderData();

  const overviewData = getOverviewData(loadedRuns);
  const [selectedBlock, setSelectedBlock] = useState(
    overviewData ? overviewData[0] : null
  );
  const modes = ["one", "all", "multiple"];
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [listOfSelectedBlocks, setListOfSelectedBlocks] = useState([]);

  // console.log(overviewData);

  const handleSelectOne = () => {
    setSelectedMode("one");
  };

  const handleSelectMultiple = () => {
    setSelectedMode("multiple");
  };

  const handleSelectAll = () => {
    setSelectedMode("all");
  };

  const selectBlock = (block) => {
    setSelectedBlock(block);
    if (selectedMode === "multiple") {
      setListOfSelectedBlocks((prev) => {
        // console.log(prev.find((item) => item.startDate === block.startDate));

        if (prev.find((item) => item.startDate === block.startDate)) {
          return prev.filter((item) => item !== block);
        } else {
          return [...prev, block];
        }
      });
    }
  };

  // console.log(listOfSelectedBlocks);

  if (loadedRuns.length === 0) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="flex text-xl">
          Create your first Schedule and upload running data to create the
          Overview
        </div>
      </div>
    );
  }
  // if (navigation.state === "loading") {
  //   return (
  //     <div className="flex justify-center mt-32">
  //       <LoadingOverlay active={true} spinner text="Loading..." />
  //     </div>
  //   );
  // }

  // if (overviewData && selectedMode === "multiple") {
  //   return (
  //     <div className="">
  //       <div className="navbar flex gap-2 justify-center">
  //         <button
  //           className={
  //             selectedMode === "one"
  //               ? "btn-accent " + "btn btn-sm"
  //               : "btn btn-sm"
  //           }
  //           onClick={handleSelectOne}
  //         >
  //           Select One
  //         </button>
  //         {/* <button
  //           className={
  //             selectedMode === "multiple"
  //               ? "btn-primary " + "btn btn-sm"
  //               : "btn btn-sm"
  //           }
  //           onClick={handleSelectMultiple}
  //         >
  //           Select Multiple
  //         </button> */}
  //         <button
  //           className={
  //             selectedMode === "all"
  //               ? "btn-primary " + "btn btn-sm"
  //               : "btn btn-sm"
  //           }
  //           onClick={handleSelectAll}
  //         >
  //           Select All
  //         </button>
  //       </div>
  //       <div className="grid grid-cols-2 gap-x-8 mb-8 w-full">
  //         <div className="flex flex-col gap-8 mt-8">
  //           {overviewData.map((block) => (
  //             <div
  //               key={block.title}
  //               className={
  //                 selectedBlock.title === block.title &&
  //                 (selectedMode === "one" || selectedMode === "multiple")
  //                   ? "bg-accent card card-compact text-primary-content cursor-pointer"
  //                   : "bg-primary card card-compact text-primary-content cursor-pointer"
  //               }
  //               onClick={
  //                 selectedMode == "one" || selectedMode == "multiple"
  //                   ? () => selectBlock(block)
  //                   : null
  //               }
  //             >
  //               <div className="card-body">
  //                 <h2 className="card-title">{block.title}</h2>
  //                 <div className="stats shadow">
  //                   <div className="grid grid-cols-3 ">
  //                     <div className="stat place-items-center">
  //                       <div className="stat-title">Total distance</div>
  //                       <div className="stat-value text-2xl">
  //                         {getTotalDistance(block)} km
  //                       </div>
  //                       <div className="stat-desc">
  //                         {dayjs(block.startDate).format("DD. MMM")} to{" "}
  //                         {dayjs(block.endDate).format("DD. MMM YYYY")}
  //                       </div>
  //                     </div>
  //                     <div className="stat place-items-center">
  //                       <div className="stat-title">Weekly distance</div>
  //                       <div className="stat-value text-2xl">
  //                         {(
  //                           getTotalDistance(block) / block.weeks.length
  //                         ).toFixed(0)}{" "}
  //                         km
  //                       </div>
  //                       <div className="stat-desc">
  //                         {" "}
  //                         in {block.weeks.length} Weeks
  //                       </div>
  //                     </div>
  //                     <div className="stat place-items-center">
  //                       <div className="stat-title">Total Time</div>
  //                       <div className="stat-value text-2xl">
  //                         {getTotalTime(block)}
  //                       </div>
  //                       <div className="stat-desc">hh:mm:ss</div>
  //                     </div>
  //                     <div className="stat place-items-center">
  //                       <div className="stat-title">Average Pace</div>
  //                       <div className="stat-value text-2xl">
  //                         {getAveragePace(block)}
  //                       </div>
  //                       <div className="stat-desc">minutes per km</div>
  //                     </div>
  //                     <div className="stat place-items-center">
  //                       <div className="stat-title">Average Heart Rate</div>
  //                       <div className="stat-value text-2xl">
  //                         {getAverageHeartBeat(block)}
  //                       </div>
  //                       <div className="stat-desc">Beats per minute</div>
  //                     </div>
  //                     <div className="stat place-items-center">
  //                       <div className="stat-title">Average Effort</div>
  //                       <div className="stat-value text-2xl">
  //                         {getAverageEffort(block)}
  //                       </div>
  //                       <div className="stat-desc">/ 10</div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>

  //         <div className="flex flex-col gap-8 mt-8 justify-center items-center w-full">
  //           {overviewData && selectedMode === "one" && (
  //             <>
  //               <LineChart
  //                 xLabel={getWeeksXAxis(selectedBlock)}
  //                 yFunction={getWeeklyDistance(selectedBlock)}
  //                 yLabel="Weekly Distance (km)"
  //                 yAxisReversed={false}
  //                 color={"#00CDB7"}
  //               />
  //               <LineChart
  //                 xLabel={getWeeksXAxis(selectedBlock)}
  //                 yFunction={getWeeklyPace(selectedBlock)}
  //                 yLabel="Average Pace (minutes per km)"
  //                 yAxisReversed={true}
  //                 color={"#f59e0b"}
  //               />
  //               <LineChart
  //                 xLabel={getWeeksXAxis(selectedBlock)}
  //                 yFunction={getWeeklyHeartRate(selectedBlock)}
  //                 yLabel="Average Heart Rate (bpm)"
  //                 yAxisReversed={false}
  //                 color={"#FF52D9"}
  //               />
  //               <LineChart
  //                 xLabel={getWeeksXAxis(selectedBlock)}
  //                 yFunction={getWeeklyTime(selectedBlock)}
  //                 yLabel="Weekly Time (minutes)"
  //                 yAxisReversed={false}
  //               />
  //             </>
  //           )}
  //           {overviewData && selectedMode === "all" && (
  //             <>
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(overviewData)}
  //                 yFunction={getAllWeeklyDistance(overviewData)}
  //                 yLabel="Weekly Distance (km)"
  //                 yAxisReversed={false}
  //                 color={"#00CDB7"}
  //               />
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(overviewData)}
  //                 yFunction={getAllWeeklyPace(overviewData)}
  //                 yLabel="Weekly Pace (minutes per km)"
  //                 yAxisReversed={true}
  //                 color={"#f59e0b"}
  //               />
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(overviewData)}
  //                 yFunction={getAllWeeklyHeartRate(overviewData)}
  //                 yLabel="Weekly Heart Rate (bpm)"
  //                 yAxisReversed={false}
  //                 color={"#FF52D9"}
  //               />
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(overviewData)}
  //                 yFunction={getAllWeeklyTime(overviewData)}
  //                 yLabel="Weekly Time (minutes)"
  //                 yAxisReversed={false}
  //               />
  //             </>
  //           )}
  //           {overviewData && selectedMode === "multiple" && (
  //             <>
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
  //                 yFunction={getAllWeeklyDistance(listOfSelectedBlocks)}
  //                 yLabel="Weekly Distance (km)"
  //                 yAxisReversed={false}
  //                 color={"#00CDB7"}
  //               />
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
  //                 yFunction={getAllWeeklyPace(listOfSelectedBlocks)}
  //                 yLabel="Weekly Pace (minutes per km)"
  //                 yAxisReversed={true}
  //                 color={"#f59e0b"}
  //               />
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
  //                 yFunction={getAllWeeklyHeartRate(listOfSelectedBlocks)}
  //                 yLabel="Weekly Heart Rate (bpm)"
  //                 yAxisReversed={false}
  //                 color={"#FF52D9"}
  //               />
  //               <LineChart
  //                 xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
  //                 yFunction={getAllWeeklyTime(listOfSelectedBlocks)}
  //                 yLabel="Weekly Time (minutes)"
  //                 yAxisReversed={false}
  //               />
  //             </>
  //           )}
  //         </div>
  //       </div>
  //       <Outlet />
  //     </div>
  //   );
  // }

  return (
    <div className="">
      <div className="navbar flex gap-2 justify-center">
        <button
          className={
            selectedMode === "one" ? "btn-accent " + "btn btn-sm" : "btn btn-sm"
          }
          onClick={handleSelectOne}
        >
          Select One
        </button>
        {/* <button
          className={
            selectedMode === "multiple"
              ? "btn-primary " + "btn btn-sm"
              : "btn btn-sm"
          }
          onClick={handleSelectMultiple}
        >
          Select Multiple
        </button> */}
        <button
          className={
            selectedMode === "all"
              ? "btn-primary " + "btn btn-sm"
              : "btn btn-sm"
          }
          onClick={handleSelectAll}
        >
          Select All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-8 mb-8 w-full">
        <div className="flex flex-col gap-8 mt-8">
          {overviewData.map((block) => (
            <div
              key={block.title}
              className={
                selectedBlock.title === block.title &&
                (selectedMode === "one" || selectedMode === "multiple")
                  ? "bg-accent card card-compact text-primary-content cursor-pointer"
                  : "bg-primary card card-compact text-primary-content cursor-pointer"
              }
              onClick={
                selectedMode == "one" || selectedMode == "multiple"
                  ? () => selectBlock(block)
                  : null
              }
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
                      <div className="stat-title">Average Heart Rate</div>
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
          {overviewData && selectedMode === "one" && (
            <>
              <LineChart
                xLabel={getWeeksXAxis(selectedBlock)}
                yFunction={getWeeklyDistance(selectedBlock)}
                yLabel="Weekly Distance (km)"
                yAxisReversed={false}
                color={"#00CDB7"}
              />
              <LineChart
                xLabel={getWeeksXAxis(selectedBlock)}
                yFunction={getWeeklyPace(selectedBlock)}
                yLabel="Average Pace (minutes per km)"
                yAxisReversed={true}
                color={"#f59e0b"}
              />
              <LineChart
                xLabel={getWeeksXAxis(selectedBlock)}
                yFunction={getWeeklyHeartRate(selectedBlock)}
                yLabel="Average Heart Rate (bpm)"
                yAxisReversed={false}
                color={"#FF52D9"}
              />
              <LineChart
                xLabel={getWeeksXAxis(selectedBlock)}
                yFunction={getWeeklyTime(selectedBlock)}
                yLabel="Weekly Time (minutes)"
                yAxisReversed={false}
              />
            </>
          )}
          {overviewData && selectedMode === "all" && (
            <>
              <LineChart
                xLabel={getAllWeeksXAxis(overviewData)}
                yFunction={getAllWeeklyDistance(overviewData)}
                yLabel="Weekly Distance (km)"
                yAxisReversed={false}
                color={"#00CDB7"}
              />
              <LineChart
                xLabel={getAllWeeksXAxis(overviewData)}
                yFunction={getAllWeeklyPace(overviewData)}
                yLabel="Weekly Pace (minutes per km)"
                yAxisReversed={true}
                color={"#f59e0b"}
              />
              <LineChart
                xLabel={getAllWeeksXAxis(overviewData)}
                yFunction={getAllWeeklyHeartRate(overviewData)}
                yLabel="Weekly Heart Rate (bpm)"
                yAxisReversed={false}
                color={"#FF52D9"}
              />
              <LineChart
                xLabel={getAllWeeksXAxis(overviewData)}
                yFunction={getAllWeeklyTime(overviewData)}
                yLabel="Weekly Time (minutes)"
                yAxisReversed={false}
              />
            </>
          )}
          {/* {overviewData && selectedMode === "multiple" && (
            <>
              <LineChart
                xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
                yFunction={getAllWeeklyDistance(listOfSelectedBlocks)}
                yLabel="Weekly Distance (km)"
                yAxisReversed={false}
                color={"#00CDB7"}
              />
              <LineChart
                xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
                yFunction={getAllWeeklyPace(listOfSelectedBlocks)}
                yLabel="Weekly Pace (minutes per km)"
                yAxisReversed={true}
                color={"#f59e0b"}
              />
              <LineChart
                xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
                yFunction={getAllWeeklyHeartRate(listOfSelectedBlocks)}
                yLabel="Weekly Heart Rate (bpm)"
                yAxisReversed={false}
                color={"#FF52D9"}
              />
              <LineChart
                xLabel={getAllWeeksXAxis(listOfSelectedBlocks)}
                yFunction={getAllWeeklyTime(listOfSelectedBlocks)}
                yLabel="Weekly Time (minutes)"
                yAxisReversed={false}
              />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
