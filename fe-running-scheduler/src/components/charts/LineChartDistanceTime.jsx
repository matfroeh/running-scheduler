import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  getWeeksXAxis,
  getWeeklyDistance,
  getWeeklyTime,
} from "../../data/getOverviewData.js";

const LineChartDistanceTime = ({ block }) => {

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

export default LineChartDistanceTime;
