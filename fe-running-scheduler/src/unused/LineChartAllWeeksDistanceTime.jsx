import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
getAllWeeksXAxis,
getAllWeeklyDistance,
getAllWeeklyTime,
} from "../data/getOverviewData.js";

const LineChartAllWeeksDistanceTime = ({ overviewData }) => {

  const data = {
    labels: getAllWeeksXAxis(overviewData),
    datasets: [
      {
        label: "Weekly Distance (km)",
        data: getAllWeeklyDistance(overviewData),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        yAxisID: "y1",
      },
      {
        label: "Weekly Time (minutes)",
        data: getAllWeeklyTime(overviewData),
        fill: false,
        borderColor: "#742774",
        yAxisID: "y2",
      },
    ],
  };
  const options = {
    scales: {
      y1: {
        min: Math.round(Math.min.apply(null, getAllWeeklyDistance(overviewData))),
        max: Math.round(Math.max.apply(null, getAllWeeklyDistance(overviewData)) * 1.5),
        // stepSize: 10,
        ticks: {
          beginAtZero: true,
        },
      },
      y2: {
        min: Math.round(Math.min.apply(null, getAllWeeklyTime(overviewData))),
        max: Math.round(Math.max.apply(null, getAllWeeklyTime(overviewData)) * 2),
        // stepSize: 30,
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
      <Line id={overviewData.title} data={data} options={options} />{" "}
    </div>
  );
};

export default LineChartAllWeeksDistanceTime;
