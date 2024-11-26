import LineChart from "@/components/charts/LineChart";
import {
  getWeeksXAxis,
  getWeeklyDistance,
  getWeeklyPace,
  getWeeklyHeartRate,
  getWeeklyTime,
  getAllWeeksXAxis,
  getAllWeeklyDistance,
  getAllWeeklyPace,
  getAllWeeklyHeartRate,
  getAllWeeklyTime,
} from "@/utils/getOverviewData.js";

const ChartSection = ({ selectedMode, overviewData, selectedBlock }) => {
  // Chart configurations for "one" and "all" modes
  const chartConfigs = selectedMode === "one" ? [
    { yFunction: getWeeklyDistance(selectedBlock), yLabel: "Weekly Distance (km)", color: "#00CDB7" },
    { yFunction: getWeeklyPace(selectedBlock), yLabel: "Average Pace (minutes per km)", color: "#f59e0b", yAxisReversed: true },
    { yFunction: getWeeklyHeartRate(selectedBlock), yLabel: "Average Heart Rate (bpm)", color: "#FF52D9" },
    { yFunction: getWeeklyTime(selectedBlock), yLabel: "Weekly Time (minutes)" }
  ] : [
    { yFunction: getAllWeeklyDistance(overviewData), yLabel: "Weekly Distance (km)", color: "#00CDB7" },
    { yFunction: getAllWeeklyPace(overviewData), yLabel: "Average Pace (minutes per km)", color: "#f59e0b", yAxisReversed: true },
    { yFunction: getAllWeeklyHeartRate(overviewData), yLabel: "Weekly Heart Rate (bpm)", color: "#FF52D9" },
    { yFunction: getAllWeeklyTime(overviewData), yLabel: "Weekly Time (minutes)" }
  ];

  // Determine the appropriate x-axis labels based on the mode
  const xLabel = selectedMode === "one"
    ? getWeeksXAxis(selectedBlock)
    : getAllWeeksXAxis(overviewData);

  return (
    <>
      {chartConfigs.map(({ yFunction, yLabel, color, yAxisReversed }, index) => (
        <LineChart
          key={index}
          xLabel={xLabel}
          yFunction={yFunction}
          yLabel={yLabel}
          yAxisReversed={yAxisReversed || false}
          color={color}
        />
      ))}
    </>
  );
};

export default ChartSection;
