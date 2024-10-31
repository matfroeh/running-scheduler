import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  getWeeksXAxis,
getWeeklyPace,
getWeeklyHeartRate
} from "../../data/getOverviewData.js";

const LineChartPaceHeartRate = ({ block }) => {

  const data = {
    labels: getWeeksXAxis(block),
    datasets: [
      {
        label: "Weekly Pace (min/km)",
        data: getWeeklyPace(block),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        yAxisID: "y1",
      },
      {
        label: "Weekly Heart Beat (bpm)",
        data: getWeeklyHeartRate(block),
        fill: false,
        borderColor: "#742774",
        yAxisID: "y2",
      },
    ],
  };
  const options = {
    scales: {
      y1: {
        min: Math.round(Math.min.apply(null, getWeeklyPace(block))),
        max: Math.round(Math.max.apply(null, getWeeklyPace(block)) * 1.05),
        stepSize: 10,
        ticks: {
          beginAtZero: true,
        },
      },
      y2: {
        min: Math.round(Math.min.apply(null, getWeeklyHeartRate(block))),
        max: Math.round(Math.max.apply(null, getWeeklyHeartRate(block))*1.1),
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

export default LineChartPaceHeartRate;
